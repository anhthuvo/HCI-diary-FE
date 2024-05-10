import React, { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import SideBar from '../components/SideBar';
import CsvReview from '../components/TableReview';
import { useTableStore } from '../store/csvStore';
import { BOX_COLORS, MONTHS, WEEKDAYS } from '../constant'
import TextArea from 'antd/es/input/TextArea';
 
interface IDiary {
  time: Date,
  content: string[]
}

interface IQuestion {
  q: ""
  prompts: string[]
}

const Landing: React.FC = () => {
  const [question, setQuestion] = useState<IQuestion>({
    q: "",
    prompts: [
      "abd",
      "sfs"
    ]
  })
  const [diaries, setDiaries] = useState<IDiary[]>([
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
        "In the afternoon, I watched movies with my family. We watched two films, Asura and The Witness, which were both quite interesting and thrilling. xdg dgfg bdfb",
        "amily. We watched two films, Asura and The Witness, which were both quite interesting and thrilling. xdg dgfg bdfb"
      ]
    }
  ])

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container py-10">
        <p className="font-semibold text-4xl">Diary</p>
        <div className="pt-6 flex mt-2">
          <div className="rounded-full h-10 w-10 overflow-hidden mr-2">
            <img src="/assets/avatar.jpg" alt="" className="" />
          </div>
          <div className="rounded-xl bg-white p-4 rounded-tl-none">
            How was the experience of those movie? Did you enjoy it?
          </div>
        </div>

        <div className="">
        <TextArea rows={4} placeholder={
          question.prompts.toString()
        } maxLength={6} />

        </div>

        <div className="mt-4">
          {
            diaries.map((e, i) => (
              <div className={`rounded-xl p-4 ${BOX_COLORS[i % 3]} mb-4`} key={i}>
                <p className="text-slate-400 mb-2">{formatDate(e.time)}</p>
                <div className="">
                  {e.content.map((text) => <p className="mb-4">{text}</p>)}
                </div>
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
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`
}