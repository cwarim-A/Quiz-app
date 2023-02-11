import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Data from "../database/Data";
import { useDispatch, useSelector } from "react-redux";

// Custom Hook
import { useFetchQuestion } from "../../hooks/FetchQuestion";
import { updateResultAction } from '../../redux/result_reducer';
import { updateResult } from "../../hooks/setResult";

const Questions = ({ onChecked }) => {
  const [checked, setChecked] = useState(undefined);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  const question = Data[0];
  // useSelector(state=>console.log(state))
  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const {trace} = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  const onSelect = (i) => {
    onChecked(i);
    setChecked(i);
    dispatch(updateResultAction({ trace, checked }));
  };

  if (isLoading) return <h3 className="text-light">isLoading</h3>;
  if (serverError)
    return <h3 className="text-light"> {serverError || "Unknown Error"}</h3>;

  return (
    <div className="questions">
      <h2 className="text-light"> {questions?.question} </h2>
      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={true}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />
            <label className="text-primary" htmlFor={`q${i}-option`}>
              {" "}
              {q}{" "}
            </label>
            <div
              className={`check ${result[trace] == i ? "checked" : ""}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
