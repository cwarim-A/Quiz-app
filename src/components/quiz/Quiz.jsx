import Questions from "../questions/Questions";
import { moveNextQuestion, movePrevQuestion } from "../../hooks/FetchQuestion";
import { PushAnswer } from "../../hooks/setResult";

// redux store import
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {Navigate} from "react-router-dom"

const Quiz = () => {
  // const trace = useSelector((state) => state.questions.trace);
  const[check,setChecked] = useState(undefined)
  const result = useSelector(state=>state.result.result)
  const { queue, trace } = useSelector((state) => state.questions);

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(result);
  });

  // Next button event handler
  const Next = () => {
    // console.log("Next Page");
    // updating the trace value by one using moveNextAction
    if (trace < queue.length) {
      dispatch(moveNextQuestion());
     //insert a new result in the array
     if(result.length <= trace){
       // Store the answers in an array
      dispatch(PushAnswer(check))
     }
    }
  };
  // Prev Button event Handler
  const Prev = () => {
    if (trace > 0) {
      dispatch(movePrevQuestion());
    }
  };

  function onChecked (check){
     console.log(check)
     setChecked(check)
  }


  // Finish exam after the last question
  if(result.length && result.length >= queue.length){
    return <Navigate to={"/result"} replace={true}></Navigate>
  }




  return (
    <div className="container">
      <h1 className="title text-light" Quiz Applications>
        Quiz Application
      </h1>

      {/* display questions */}
      <Questions onChecked={onChecked} />

      <div className="grid">
       {trace > 0 ?  <button className="btn prev" onClick={Prev}>
          Prev
        </button> : <div></div>}
        <button className="btn next" onClick={Next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
