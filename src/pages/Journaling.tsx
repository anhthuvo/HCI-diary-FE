import React, { useEffect, useRef, useState } from 'react';
import { BACKEND, DIARY_DURATION, DIARY_STORAGE_KEY, initialQuestion } from '../constant'
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { formatDate } from './Landing';
import { Link } from 'react-router-dom';
import { Popconfirm, Skeleton, message } from 'antd';
import type { PopconfirmProps } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export interface IDiary {
    time: Date,
    content: string,
    emotion?: string,
}

interface IQuestion {
    q: string
}

const Landing: React.FC = () => {
    const [question, setQuestion] = useState<IQuestion>(null)
    const [diaries, setDiaries] = useState<IDiary[]>([])
    const [input, setInput] = useState('');
    const [editDiaryIndex, setEditDiaryIndex] = useState<number>(-1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const save = () => {
        if (input === "") return
        const inputText = input.trim()

        const newDiaries = [...diaries]
        // user edit diary
        if (editDiaryIndex > -1) {
            const newDiaries = [...diaries]
            newDiaries[editDiaryIndex].content = inputText
            setEditDiaryIndex(-1)
        }
        // user write new
        else {
            const lastDiary = newDiaries[0]
            const lastDiaryTime = lastDiary?.time
            const currentTime = new Date()
            // const duration = currentTime.getTime() - lastDiaryTime?.getTime()

            // if (duration > DIARY_DURATION || !lastDiary) {
            //     newDiaries.unshift({
            //         time: new Date,
            //         content: inputText,
            //     })
            // } else {
            lastDiary.content += "\n\n" + inputText
            // }
            getPrompt(inputText)
        }

        setDiaries(newDiaries)
        localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(newDiaries))
        setInput('')
    }

    const onEdit = (i: number) => {
        setEditDiaryIndex(i)
        setInput(diaries[i].content)
    }

    const cancelEdit = () => {
        setEditDiaryIndex(-1)
        setInput("")
    }

    const confirmDetele = (index: number) => {
        const newDiaries = diaries.filter((e, i) => i !== index)
        setDiaries(newDiaries)
        localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(newDiaries))
        message.success("Deleted");
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
    };

    const getPrompt = (inputText: string) => {
        setLoading(true)
        console.log(inputText)
        axios.post(`${BACKEND.DOMAIN}/api/chat`, {
            prompts: `
            You are an assistant that is helping create responses for a self-journaling application. The intended user are graduate students at a top institution.
            You give a prompt which aim to figure out user situation based on user emotion or the experience that user told you. The prompt should have a greater sense of personality, relationality, to solicit rich narratives. Should be less than 250 characters. The prompt should not use over-the-top words. Only conversational language. Do not include any "tip: " "question: " etc and do not use hashtags. You do not give any prefix such as "prompt" and do not use double quotes at the start and end of the response. You should ask only one question at a time.
            This is what user tell you "${inputText}"            
            `
        }).then(res => {
            setQuestion({
                q: res.data.data
            })
        })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        const _diaries = localStorage.getItem(DIARY_STORAGE_KEY)
        if (_diaries && _diaries.length > 0) {
            const convertTime = JSON.parse(_diaries).map(e => ({
                ...e,
                time: new Date(e.time)
            }))

            const lastDiary = convertTime[0]
            const lastDiaryTime = lastDiary?.time
            const currentTime = new Date()
            const duration = currentTime.getTime() - lastDiaryTime?.getTime()

            console.log(lastDiary)
            console.log(currentTime)
            console.log(duration)

            if (duration > DIARY_DURATION) {
                navigate("/");
            }

            setDiaries(convertTime)
            getPrompt(lastDiary.content)
        } else {
            navigate("/")
        }
    }, [])

    return (
        <div className="bg-black">
            <div className="max-w-md bg-white min-h-screen mx-auto">
                <div className="container py-10">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-4xl">My Diary</p>
                        <Link to="/">
                            <div className="rounded-full border border-indigo-500 flex items-center justify-center text-indigo-500 h-10 w-10">
                                <ArrowLeftOutlined />
                            </div>
                        </Link>
                    </div>
                    <div className="pt-6 flex mt-2">
                        <div className="rounded-full h-6 w-6 overflow-hidden mr-2">
                            <img src="/assets/avatar.jpg" alt="" className="" />
                        </div>
                        <div className="flex-1 bg-indigo-500 rounded-xl pt-3 pb-4 px-4 rounded-tl-none text-white">
                            <Skeleton loading={loading} active
                                paragraph={{
                                    rows: 2
                                }}
                                title={false}>
                                {question?.q}
                            </Skeleton>
                        </div>
                    </div>

                    <div className="mt-4 relative">
                        <TextArea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoSize={{ minRows: 4 }}
                            className='w-full rounded-2xl hover:bg-indigo-50 bg-indigo-50 border-none p-4 pb-10'
                        />
                        <div className="flex space-x-4">
                            {editDiaryIndex > -1 ? <button
                                onClick={cancelEdit}
                                className='py-2 px-6 rounded-full border border-indigo-500 text-indigo-500 absolute right-24 bottom-3'
                            >
                                Cancel
                            </button> : null
                            }
                            <button
                                onClick={save}
                                className='text-sm py-2 px-4 rounded-full border border-indigo-500 bg-indigo-500 text-white absolute right-2 bottom-3'>Save
                            </button>
                        </div>
                    </div>

                    <div className="mt-10">
                        {
                            diaries?.map((e, i) => (
                                i === editDiaryIndex ? null : (
                                    <div className={`rounded-2xl p-4 border-2 border-slate-50 shadow-lg mb-4 relative`} key={i}>
                                        <EditOutlined className='right-4 top-4 absolute opacity-50' onClick={() => onEdit(i)} />
                                        <p className="text-slate-400 mb-2">{formatDate(e.time)}</p>
                                        <p className="font-light"
                                            dangerouslySetInnerHTML={{ __html: addBreakLine(e?.content) }}>
                                        </p>
                                        <Popconfirm
                                            title="Delete the task"
                                            description="Are you sure to delete this task?"
                                            onConfirm={() => confirmDetele(i)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteOutlined className='right-4 bottom-4 absolute opacity-50' />
                                        </Popconfirm>
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;

const addBreakLine = (txt: string) => {
    if (!txt) return ""
    const regex = /\n/g;
    const inputText = txt.replace(regex, "<br/>")
    return inputText
}