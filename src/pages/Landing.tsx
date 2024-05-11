import React, { useEffect, useRef, useState } from 'react';
import { BOX_COLORS, DIARY_STORAGE_KEY, MONTHS, QUESTIONS_STORAGE_KEY, WEEKDAYS, initialQuestion } from '../constant'
import TextArea from 'antd/es/input/TextArea';
import { EditOutlined } from '@ant-design/icons';

interface IDiary {
  time: Date,
  content: string,
  color: string
}

interface IQuestion {
  q: string
  prompts: string[]
}

const Landing: React.FC = () => {
  const [question, setQuestion] = useState<IQuestion>(null)
  const [diaries, setDiaries] = useState<IDiary[]>([])
  const [input, setInput] = useState('');
  const [editDiaryIndex, setEditDiaryIndex] = useState<number>(-1)
  
  const save = () => {
    if(input === "") return
    const inputText = input.trim()

    const newDiaries = [...diaries]
    if (editDiaryIndex > -1) {
      const newDiaries = [...diaries]
      newDiaries[editDiaryIndex].content = inputText
      setEditDiaryIndex(-1)
    } else {
      const lastDiary = newDiaries[newDiaries.length-1]
      const lastDiaryTime = lastDiary?.time
      const currentTime = new Date()
      const duration = currentTime.getTime()-lastDiaryTime?.getTime()
  
      if ( duration > 10800000 || !lastDiary) {
        newDiaries.unshift({
          time: new Date,
          content: inputText,
          color: BOX_COLORS[(newDiaries.length) % 3]
      })
      } else {
        lastDiary.content += "\n\n" + inputText
      }    
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

  useEffect(() => {
    const _diaries = localStorage.getItem(DIARY_STORAGE_KEY)
    if (_diaries) { 
      const convertTime = JSON.parse(_diaries).map(e => ({
        ...e,
        time: new Date(e.time)
      }))
      setDiaries(convertTime) 
    }

    const _q = localStorage.getItem(QUESTIONS_STORAGE_KEY)
    setQuestion(_q? JSON.parse(_q) : initialQuestion)
      // localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(diaries))
  }, [])

  return (
    <div className="min-h-screen">
      <div className="container py-10">
        <p className="font-semibold text-4xl">My Diary</p>
        <div className="pt-6 flex mt-2">
          <div className="rounded-full h-10 w-10 overflow-hidden mr-2">
            <img src="/assets/avatar.jpg" alt="" className="" />
          </div>
          <div className="bg-indigo-500 rounded-xl pt-3 pb-4 px-4 rounded-tl-none text-white">
            {question?.q}
          </div>
        </div>

        <div className="mt-4 relative">
        <TextArea 
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          autoSize={{ minRows: 4 }} 
          placeholder={
            question?.prompts?.toString()
          }
          className='w-full rounded-2xl hover:bg-indigo-50 bg-indigo-50 border-none p-4 pb-10'
        />
        <div className="flex space-x-4">
        {editDiaryIndex > -1 ? <button 
          onClick={cancelEdit}
          className='pb-2 pt-1 px-6 rounded-full border border-indigo-500 text-indigo-500 absolute right-24 bottom-3'>
            Cancel
          </button>: null
        }
          <button 
          onClick={save}
          className='pb-2 pt-1 px-6 rounded-full bg-indigo-500 text-white absolute right-2 bottom-3'>Save
          </button>
          </div>
        </div>

        <div className="mt-10">
          {
            diaries?.map((e, i) => (
              i === editDiaryIndex? null : <div className={`rounded-2xl p-4 ${e.color} mb-4 relative`} key={i}>
                <EditOutlined className='right-4 top-4 absolute opacity-50' onClick={() => onEdit(i)}/>
                <p className="text-slate-400 mb-2">{formatDate(e.time)}</p>
                <p className="" dangerouslySetInnerHTML={{__html: addBreakLine(e?.content)}}>
                </p>
              </div>
            ))
          }
        </div>
      </div>
      <div className="bg-purple-100 bg-green-100 bg-blue-100 "></div>
    </div>
  );
};

export default Landing;

const formatDate = (d: Date) => {
  if (!d) return ""
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`
}

const addBreakLine = (txt: string) => {
  if (!txt) return ""
  const regex = /\n/g;
  const inputText = txt.replace(regex, "<br/>")
  return inputText
}

const initialDiary = [
  {
    time: new Date,
    content: [
      "In the afternoon, I watched movies with my family. We watched two films, Asura and The Witness, which were both quite interesting and thrilling. xdg dgfg bdfb",
      "amily. We watched two films, Asura and The Witness, which were both quite interesting and thrilling. xdg dgfg bdfb"
    ]
  },
  {
    time: new Date,
    content: [
      "I watched movies with my family. We watched two films, Asura and The Witness, which were both quite interesting and thrilling. xdg dgfg bdfb",
      "amily. We watched two films, Asura and The Witness, which were both quite interesting and thrilling. xdg dgfg bdfb"
    ]
  }
]