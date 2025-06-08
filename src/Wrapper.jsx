import { useState, useEffect } from "react";
import { TodoContext } from "./context/TodoContext";

const Wrapper = (props) => {
  const [todo, setTodo] = useState([]);

  //local storage using useEffect
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodo(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  return (
    <TodoContext.Provider value={{ todo, setTodo }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default Wrapper;
