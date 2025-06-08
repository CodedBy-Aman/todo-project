import { useState } from "react";
import { TodoContext } from "./context/TodoContext";

const Wrapper = (props) => {
     const [todo, setTodo] = useState([]);
  

  return <TodoContext.Provider value={{todo, setTodo}}>{props.children}</TodoContext.Provider>;
};

export default Wrapper;




/* my react todo -application:

Main.jsx:
import { createRoot } from 'react-dom/client'
import  './index.css';
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import Wrapper from './Wrapper.jsx';

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <App />
    <ToastContainer position='top-center'/>
  </Wrapper>,
)

App.jsx:
 */