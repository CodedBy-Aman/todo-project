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
    <h2 className="inline text-base text-gray-500 font-medium">
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
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 w-full md:w-full lg:w-[50%] rounded-2xl p-4 md:p-6 lg:p-8 overflow-y-auto shadow-lg">
      <div className="relative bg-white rounded-xl p-6 h-full md:p-8 shadow-md">
        <h1 className="flex items-end md:flex-row justify-between items-start  gap-2 md:gap-8 mb-6">
          <span className="inline text-3xl md:text-4xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Tasks
          </span>
          <span>
            <Header />
          </span>
        </h1>
        <div className="flex justify-between items-end mb-5">
          <h3 className="text-base md:text-md text-gray-500 font-medium">
            You have {todo.filter((task) => !task.isCompleted).length} tasks left today
          </h3>
          {todo.filter((task) => fadingId !== task.id).length > 0 && (
            <button
              className={`py-1 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium text-base lg:text-lg md:text-lg transition-all duration-300 hover:from-red-600 hover:to-pink-600 transform hover:scale-[1.02] shadow-md hover:shadow-lg ${
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
              className={`todo-item transition-all p-3 rounded-xl bg-gray-50 hover:bg-gray-200 flex justify-between items-center gap-4 duration-300 ${
                fadingId === task.id ? "opacity-0 transform translate-x-4" : "opacity-100"
              }`}
            >
              <span
                className={`${
                  task.isCompleted ? "line-through text-gray-400" : "text-gray-700"
                } text-base md:text-lg lg:text-xl font-medium`}
              >
                {task.title}
              </span>

              <input
                type="checkbox"
                className="w-5 h-5 rounded-full border-2 border-indigo-500 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all duration-200"
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
