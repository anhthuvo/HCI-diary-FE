import React, { useEffect, useRef, useState } from 'react';
import { DIARY_DURATION, DIARY_STORAGE_KEY, EMOTIONS, MONTHS, WEEKDAYS } from '../constant'
import { Link } from 'react-router-dom';
import { IDiary } from './Journaling'

const Landing: React.FC = () => {
  const [emotions, setEmotions] = useState(EMOTIONS)
  const [unclock, setUnclock] = useState(false)
  const emotion = useRef(null)

  const selectEmotions = (categoryIndex: number, labelIndex: number) => {
    const newEmotoins = [...emotions]
    newEmotoins.forEach(category => {
      category.options.forEach(e => {
        e.selected = false
      })
    })

    newEmotoins[categoryIndex].options[labelIndex].selected = true
    const selectedEmotion = newEmotoins[categoryIndex].options[labelIndex]

    selectedEmotion.selected = true
    emotion.current = selectedEmotion
    setEmotions(newEmotoins)
    !unclock && setUnclock(true)
  }

  const saveEmotion = () => {
    if (!emotion.current) return
    const inputText = `${emotion.current.label.toUpperCase()} ${emotion.current.emoji}`
    const _diaries = localStorage.getItem(DIARY_STORAGE_KEY)
    let saveDiaries: IDiary[] = []
    if (_diaries && _diaries.length > 0) {
      saveDiaries = JSON.parse(_diaries).map(e => ({
        ...e,
        time: new Date(e.time)
      }))

      saveDiaries.unshift({
        time: new Date(),
        content: inputText,
        emotion: emotion.current?.label || ""
      })
    } else {
      saveDiaries = [{
        time: new Date(),
        content: inputText,
        emotion: emotion.current?.label || ""
      }]
    }
    localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(saveDiaries))
  }

  useEffect(() => {
    return saveEmotion
  }, [])

  return (
    <div className="bg-black">
      <div className="max-w-md bg-white min-h-screen mx-auto relative">
        <div className="container pb-20 pt-6">
          <p className="text-center text-slate-400 mb-6">Today - {getToday()}</p>
          <p className="font-normal text-2xl mb-6">How are you feeling?</p>

          <div className="grid grid-cols-4 gap-4 mb-4">
            {
              EMOTIONS.map((category, index) => (
                    category.options.map((e, i) => (
                      <div
                        key={i}
                        className={`rounded-xl pt-[100%] relative ${e.selected ? "bg-indigo-500 text-white" : "bg-indigo-50 text-slate-400"}`}
                        onClick={() => selectEmotions(index, i)}
                      >
                        <div className="w-1/2 h-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-3xl">
                          {e.emoji}
                        </div>
                        <p className={`absolute bottom-1.5 w-full text-center capitalize font-light text-xs`}>{e.label}</p>
                      </div>
                    ))
              ))
            }
          </div>

          <div
            className='w-full rounded-2xl hover:bg-indigo-50 bg-indigo-50 border-none p-4 font-light'
          >
            <span className="text-red-500 font-medium">YOUR DATA IS SAFE</span>
            <br/>We don't collect your diary content. It's securely stored in your phone's memory, so feel free to write your thoughts.
          </div>
        </div>
        {unclock ? (
          <div className="fixed bottom-0 w-full max-w-md mx-auto p-4 pt-0 bg-white">
            <Link to="/journaling" className=''>
              <div className="w-full bg-indigo-500 text-white text-center rounded-2xl py-4 text-lg">Go to my diary</div>
            </Link>
          </div>
        ) : null
        }
      </div>
    </div>
  );
};

export default Landing;

export const formatDate = (d: Date) => {
  if (!d) return ""
  return ` ${d.getHours()}:${d.getMinutes()} ${WEEKDAYS[d.getDay()]} ${d.getDate()}`
}

const getToday = () => {
  const d = new Date()
  return (
    `${d.getDate()} ${MONTHS[d.getDay()]}`
  )
}