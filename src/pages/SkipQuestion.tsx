import React, { useEffect, useRef, useState } from 'react';
import { QUESTIONS_STORAGE_KEY } from '../constant';

const SkipQuestion: React.FC = () => {
    const [q, setQ] = useState([])

    useEffect(() => {
        const _skip_question = localStorage.getItem(QUESTIONS_STORAGE_KEY)
        let skip_question: string[] = []
        if (_skip_question) {
            skip_question = JSON.parse(_skip_question)
            setQ(skip_question)
        }
    }, [])
    return (
        <div className="">
            <ul className="">
            {
                q.map((e, i) => (
                    <li className="" key={i}>- {e}</li>
                ))
            }
            </ul>
        </div>
    )
}

export default SkipQuestion;
