import React, { useEffect, useState } from 'react';
import { BACKEND, DIARY_DURATION, DIARY_STORAGE_KEY, prompt_rules } from '../constant'
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
    const [state, setState] = useState<number>(0)

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
            // const lastDiaryTime = lastDiary?.time
            // const currentTime = new Date()
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

    const getPrompt = async (inputText: string) => {
        // console.log(state, inputText)
        let prompts
        if (state === 0) {
            prompts = `
            ${prompt_rules.general_rules}
            You give a prompt which aim to figure out user situation based on user emotion that user told you.
            This is what user tell you "${inputText}"            
            `
        } else if (state === 1) {
            prompts = `
            ${prompt_rules.general_rules}
            You give a prompt which aim to figure out user feeling during experience that user told you.
            This is what user tell you "${inputText}"
            `
        } else if (state === 2) {
            prompts = `
            ${prompt_rules.general_rules}
            If user shows negative motion, show your sympathy and encourage them to move on and then you ask user what they plan to do tomorrow because it is useful for their reflection.
            This is what user tell you "${inputText}"
            `
        } else if (state === 3) {
            prompts = `
                You are a friend who want to listen to user's feeling and situation that user went throught.
                Ask user if they want to share more about their life.
            `
        } else {
            prompts = `
                You are a friend who want to listen to user's feeling and situation that user went throught.
                give a question to figure out user's situation based on their emotion or the exprience that user told you.
                This is what user tell you "${inputText}"
            `
        }

        try {
            setLoading(true)
            const res = await axios.post(`${BACKEND.DOMAIN}/api/chat`, {
                prompts
            })
            setQuestion({
                q: res.data.data
            })
            setState(state + 1)
            if (state === 2) {
                setInput(`My tomorrow plan:\n•\n•\n•`)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
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
            <div className="max-w-md bg-white min-h-screen mx-auto relative">
                <div className="container py-10">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-4xl">My Diary</p>
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
                            className='w-full rounded-2xl hover:bg-indigo-50 bg-indigo-50 border-none p-4 pb-14'
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
                        <PlusCircleOutlined 
                            className='text-indigo-500 rotate-45 absolute right-2 top-2' 
                            onClick={() => setInput("")}
                        />
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
                <Link to="/">
                    <div className="fixed bottom-0 max-w-md mx-auto w-full">
                        <div className="ml-auto mb-2 mr-2 rounded-full bg-indigo-500 text-white flex items-center justify-center h-10 w-10 px-2">
                            <PlusOutlined />
                        </div>
                    </div>
                </Link>
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