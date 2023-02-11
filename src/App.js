import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"

//import Components
import Main from './components/main/Main';
import Quiz from './components/quiz/Quiz';
import Result from './components/results/Result';
import { CheckUserExist } from './helpers/helper';


const router = createBrowserRouter([
  {
    path:"/",
    element:<Main/>
  },
  {
    path:"/quiz",
    element:<CheckUserExist> <Quiz/></CheckUserExist>
  },
  {
    path:"/result",
    element:<CheckUserExist> <Result/></CheckUserExist>
  }
])

function App() {
  return (
    <>
     <RouterProvider router={router}/>
    </>
  );
}

export default App;
