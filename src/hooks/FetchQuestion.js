// fetch question hook to fetch api data and set value to store

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Data,{answers} from "../components/database/Data";

// redux actions
import * as Action from "../redux/question_reducer";



export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({
      ...prev,
      isLoading: true,
    }));
    (
      // Async Function Fetch Backend Data
      async () => {
        try {
          let question = await Data;

          if (question.length > 0) {
            setGetData((prev) => ({ ...prev, isLoading: false }));
            setGetData((prev) => ({ ...prev, apiData: {question,answers} }));

            // Dispatch an Action
            dispatch(Action.startExamAction({question,answers}));
          } else {
            throw new Error("No Questions Available");
          }
        } catch (error) {
          setGetData((prev) => ({
            ...prev,
            isLoading: false,
          }));
          setGetData((prev) => ({
            ...prev,
            serverError: error,
          }));
        }
      }
    )();
  }, [dispatch]);
  return [getData, setGetData];
};


// MoveAction Dispatch function
export const moveNextQuestion = ()=> async (dispatch)=> {
  try {
    dispatch(Action.moveNextAction())
  } catch (error) {
    console.log(error)
  }
}

export const movePrevQuestion = ()=> async (dispatch)=> {
  try {
    dispatch(Action.movePrevAction())
  } catch (error) {
    console.log(error)
  }
}