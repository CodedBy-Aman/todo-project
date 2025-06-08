import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { TodoContext } from "../context/TodoContext";

//date and time
const Header = () => {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const date = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <h2 className="inline tracking-[.03em] text-base text-slate-600 font-medium">
      {day} {date}
    </h2>
  );
};

const Read = () => {
  const {todo, setTodo} = useContext(TodoContext);

  //task fading state
  const [fadingId, setFadingId] = useState(null);

  //button fading state
  const [buttonFade, setButtonFade] = useState(false);

  //checkbox
  const checkboxHandler = (id) => {
    const updatedTodos = todo.map((todo) => {
      return todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo;
    });
    setTodo(updatedTodos);

    const toggledTodo = updatedTodos.find((todo) => todo.id === id);

    if (toggledTodo.isCompleted) {
      setFadingId(id);
      toast.error("Task completed! 🎯");
      setTimeout(() => {
        setTodo((todo) => todo.filter((t) => t.id != toggledTodo.id));
        setFadingId(null);
      }, 1500);
    } else {
      setFadingId(null);
    }
  };

  //clear all button
  const handleClearAll = () => {
    setButtonFade(true);
    setTimeout(() => {
      setTodo([]);
      toast.error("All tasks cleared! 🧹");
      setButtonFade(false);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-400/50 to-slate-200/100 w-full md:w-full lg:w-[50%] rounded-2xl p-4 md:p-6 lg:p-8 overflow-y-auto shadow-lg">
      <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 h-full md:p-8 shadow-md">
        <h1 className="flex items-end md:flex-row justify-between items-start gap-2 md:gap-8 mb-6">
          <span className="inline tracking-[.02em] text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
            Tasks
          </span>
          <span>
            <Header />
          </span>
        </h1>
        <div className="flex justify-between items-end mb-5">
          <h3 className="text-base  md:text-md text-slate-600 font-medium">
            You have {todo.filter((task) => !task.isCompleted).length} tasks left today
          </h3>
          {todo.filter((task) => fadingId !== task.id).length > 0 && (
            <button
              className={`py-1 px-4 tracking-[.04em] bg-gradient-to-r from-slate-600 to-slate-500 text-white rounded-lg font-medium text-base lg:text-lg md:text-lg transition-all duration-300 hover:from-slate-700 hover:to-slate-600 transform hover:scale-[1.02] shadow-md hover:shadow-slate-500/25 ${
                buttonFade ? "opacity-0" : "opacity-100"
              }`}
              onClick={handleClearAll}
            >
              Clear
            </button>
          )}
        </div>
        <ul className="space-y-3">
          {todo.map((task) => (
            <li
              key={task.id}
              className={`todo-item transition-all p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 flex justify-between items-center gap-4 duration-300 ${
                fadingId === task.id ? "opacity-0 transform translate-x-4" : "opacity-100"
              }`}
            >
              <span
                className={`${
                  task.isCompleted ? "line-through text-slate-400" : "text-slate-700"
                } text-base tracking-[.02em] md:text-lg lg:text-xl font-medium`}
              >
                {task.title}
              </span>

              <input
                type="checkbox"
                className="w-5 h-5 rounded-full border-2 border-slate-400 text-slate-500 focus:ring-slate-400 cursor-pointer transition-all duration-200"
                checked={task.isCompleted}
                onChange={() => checkboxHandler(task.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Read;
