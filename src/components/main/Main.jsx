import React, { useRef } from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../../redux/result_reducer";

const Main = () => {
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz App</h1>

      <ol>
        <li>you will be asked 10 questions one after the other</li>
        <li>10 points is awarded for the correct answer.</li>
        <li>Each question has 3 options and you can choose only one option</li>
        <li>You can review and change answers before the quiz finish.</li>
        <li>The result will be declared at the end of the quiz. </li>
      </ol>

      <form className="form">
        <input
          ref={inputRef}
          className="userid"
          type="text"
          placeholder="Username*"
        />
      </form>

      <div className="start">
        <Link className="btn" to="/quiz" onClick={startQuiz}>
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default Main;
