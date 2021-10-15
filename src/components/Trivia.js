import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import play from '../sounds/play.wav';
import correct from '../sounds/correct.mp3';
import wait from '../sounds/wait.mp3';
import wrong from '../sounds/wrong.mp3';

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, SetSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
    const [letscorrect] = useSound(correct);
    const [letswrong] = useSound(wrong);

    useEffect(() => {
        letsPlay();
    }, [letsPlay])

    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback()
        }, duration);
    }

    const handleClickAnswer = (item) => {
        SetSelectedAnswer(item);
        setClassName("answer active")
        delay(3000, () => setClassName(item.correct ? "answer correct" : "answer wrong"))
        delay(5000, () => {
            if (item.correct) {
                letscorrect();
                delay(1000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    SetSelectedAnswer(null);
                });
            } else {
                delay(1000, () => {
                    letswrong();
                    setStop(true);
                })
            }
        })
    }

    return (
        <div className="Trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {
                    question?.answers.map((item) => (
                        <div className={selectedAnswer === item ? className : "answer"} onClick={() => handleClickAnswer(item)}>{item.text}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default Trivia
