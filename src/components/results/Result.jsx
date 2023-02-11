import React from 'react'
import "./result.css"
import ResultTable from "./ResultTable"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// import Actions
import { resetResultAction } from '../../redux/result_reducer'
import { resetAllAction } from '../../redux/question_reducer'
import { useEffect } from 'react'
import { attempt_Numbers, earn_Points, flagResult } from '../../helpers/helper'

const Result = () => {
  
const dispatch =  useDispatch()
const {questions:{queue,answers},result:{result,userId}}=useSelector(state=>state)

    useEffect(()=>{
      console.log(flag)
    })

    const totalPoints = queue.length * 10;
    const attempts = attempt_Numbers(result)
    const earnPoints = earn_Points(result,answers,10)
    const flag = flagResult(totalPoints,earnPoints)

    const onRestart = ()=>{
        console.log("Restart Quiz")
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }
  return (
    <div className='container'>
      <h1 className="title text-light">Quiz Application</h1>
      <div className="result flex-center">
            <div className="flex">
                <span>Username</span>
                <span className="bold">Daily Tuition</span>
            </div>
            <div className="flex">
                <span>Total Quiz Points:</span>
                <span className="bold">{totalPoints || 0}</span>
            </div>
            <div className="flex">
                <span>Total Questions:</span>
                <span className="bold">{queue.length || 0}</span>
            </div>
            <div className="flex">
                <span>Total Attempts:</span>
                <span className="bold">{attempts || 0}</span>
            </div>
            <div className="flex">
                <span>Total Earn Points:</span>
                <span className="bold">{earnPoints}</span>
            </div>
            <div className="flex">
                <span> Quiz Result:</span>
                <span style={{color:`${flag ? "#2aff95" : "#ff2a66" }`}} className="bold">{flag ? "Passed" : "Failed"}</span>
            </div>
      </div>

      <div className='start'>
        <Link className='btn' to="/" onClick={onRestart}>Restart</Link>    
      </div>

      <div className="container">
        {/* Table for Results */}
        <ResultTable/>
      </div>
    </div>
  )
}

export default Result
