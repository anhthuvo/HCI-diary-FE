import React, { useEffect, useRef, useState } from 'react';
import { BACKEND, BG_COLORS, DIARY_DURATION, DIARY_STORAGE_KEY, QUESTIONS_STORAGE_KEY, prompt_rules } from '../constant'
import TextArea from 'antd/es/input/TextArea';
import { DeleteOutlined, EditOutlined, ForwardOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { formatDate } from './Landing';
import { Link } from 'react-router-dom';
import { Popconfirm, Skeleton, message } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Mute from '../components/Mute';
import ExpandCard from '../components/ExpandCard';

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
    const topicNum = useRef(0)
    const turn = useRef(0)
    const [isMuted, setIsMuted] = useState<boolean>(false)

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
            if (isMuted) {
                lastDiary.content += `\n ${inputText}`
            } else {
                lastDiary.content += `\n <small>${question.q}</small>\n ${inputText}`
            }
            turn.current += 1
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

    const getPrompt = async (inputText: string = "") => {
        if (isMuted) return
        console.log(topicNum.current, turn.current, inputText)
        let prompts = ""
        if (turn.current === 0 && topicNum.current === 0) {
            prompts = `${prompt_rules.general_rules}
            Give a positive comment on what I told you and give a question to find out my situation lead to their emotion.
            This is what I tell you "${inputText}"`
        }
        else if (turn.current < 2) {
            prompts = `${prompt_rules.general_rules}
            Give a positive comment on what I told you and give a question to ask about my situation based on their emotion or the experience that I told you.
            This is what I tell you "${inputText}"`
        } else if (topicNum.current < 3) {
            turn.current = 0
            topicNum.current += 1
            prompts = `${prompt_rules.general_rules}
            Select one of these topics that did not mentioned in the dialog and ask if I want to share about it. You can start the question with something like "Do you want to share". Don't repeat the last question.
            Topic: friends, coursework, labworks, what make my happy today, family, project progress.
            This is the dialog "${diaries[0].content}"
            Last question: ${question.q}`
            
        } else if (topicNum.current === 3) {
            topicNum.current += 1
            turn.current = 3
            prompts = `${prompt_rules.general_rules}
            Give a positive comment only if I told you something otherwise, do not comment.
            Then you ask me what they plan to do tomorrow because it is useful for their reflection.
            This is what I tell you "${inputText}"`
            setInput(`My tomorrow plan:\n•\n•\n•`)
        } else if (topicNum.current === 4) {
            topicNum.current += 1
            turn.current = 3
            setQuestion({
                q: `If you still have something to write down, feel free to express it or click "End Diary".`
            })
            return;
        } else {
            prompts = `${prompt_rules.general_rules}
            give a positive comment and give a question to figure out my situation based on their emotion or the exprience that I told you.
            This is what I tell you "${inputText}"`
        }

        try {
            setLoading(true)
            const res = await axios.post(`${BACKEND.DOMAIN}/api/chat`, {
                prompts
            })
            setQuestion({
                q: res.data.data
            })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

const handleMute = () => {
    setIsMuted(!isMuted)
}

const skipQuestion = () => {
    turn.current = 3
    getPrompt()
    try {
        const _skip_question = localStorage.getItem(QUESTIONS_STORAGE_KEY)
        let skip_question: string[] = []
        if (_skip_question) {
            skip_question = JSON.parse(_skip_question)
            skip_question.push(question?.q || "")
        } else {
            skip_question = [question?.q || ""]
        }
        localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(skip_question))
    } catch(err) {
        console.log(err)
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
                    <div className="flex-1 bg-indigo-500 rounded-xl pt-3 pb-4 pl-4 pr-6 rounded-tl-none text-white relative">
                        <Skeleton loading={loading || isMuted} active={!isMuted}
                            paragraph={{
                                rows: 2
                            }}
                            title={false}>
                            {question?.q}
                        </Skeleton>
                    </div>
                    <div className='ml-2 w-10'>
                        <div className="bg-slate-200 rounded-lg h-10 flex justify-center items-center mb-2" onClick={handleMute}>
                            <Mute isMuted={isMuted} />
                        </div>
                        <div className="bg-slate-200 rounded-lg h-10 flex justify-center items-center mb-2" onClick={skipQuestion}>
                            <ForwardOutlined className='text-slate-400'/>
                        </div>
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
                            className='py-2 px-4 rounded-full border border-indigo-500 text-indigo-500 absolute right-24 bottom-3'
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
                                <div className={`rounded-2xl p-4 shadow-lg mb-4 relative ${BG_COLORS[e.emotion] || ""}`} key={i}>
                                    <EditOutlined className='right-4 top-4 absolute opacity-50' onClick={() => onEdit(i)} />
                                    <p className="text-slate-400 mb-2">{formatDate(e.time)}</p>
                                    <ExpandCard initialExpand={i === 0} disabled={i === 0}>
                                        <div className="font-light diary-content"
                                            dangerouslySetInnerHTML={{ __html: addBreakLine(e?.content) }}>
                                        </div>
                                    </ExpandCard>
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
                    <div className="ml-auto mb-2 mr-2 rounded-full bg-indigo-500 text-white flex items-center justify-center h-10 w-max px-4">
                        End diary
                    </div>
                </div>
            </Link>
        </div>
        <div className="bg-lime-100 bg-lime-200 bg-lime-300 bg-slate-100 bg-purple-200 bg-purple-300 bg-amber-50"></div>
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