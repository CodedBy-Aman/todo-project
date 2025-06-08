import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { todoContext } from "../Wrapper";

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
    <h2 className="inline text-xs text-gray-600">
      {day} {date}
    </h2>
  );
};

const Read = () => {
  const [todo, setTodo] = useContext(todoContext);


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
      toast.error("todo cleared!");
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
      toast.error("All todo cleared!");
      setButtonFade(false);
    }, 500);
  };

  return (
    <div className="relative bg-read w-[40%] rounded-lg  p-10 overflow-y-auto">
      <h1 className="flex justify-between items-center">
        <span className="inline text-4xl font-normal text-heading tracking-normal underline decoration-2 underline-offset-5 mb-3 ">
          Tasks
        </span>
        <span>
          <Header />
        </span>
      </h1>
      <h3 className="block mt-2 text-md opacity-50">
        You have {todo.filter((task) => !task.isCompleted).length} tasks left
        today
      </h3>
      <ul className="mt-6">
        {todo.map((task) => (
          <li
            key={task.id}
            className={`todo-item transition-all p-2 rounded-lg bg-white mt-3 flex justify-between items-center gap-2  duration-800 ${
              fadingId === task.id ? "opacity-0 " : "opacity-100"
            }`}
          >
            <span
              className={`${
                task.isCompleted ? "line-through" : ""
              } text-xl font-[350]`}
            >
              {task.title}
            </span>

            <input
              type="checkbox"
              className="w-5 h-5"
              checked={task.isCompleted}
              onChange={() => checkboxHandler(task.id)}
            />
          </li>
        ))}
      </ul>
      {todo.filter((task) => fadingId !== task.id).length > 0 && (
        <button
          className={`absolute top-16 right-4 py-1 px-3 bg-white text-red-800 rounded-md font-normal text-md mt-8 transition-all duration-500 active:scale-95 ${
            buttonFade ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleClearAll}
        >
          Clear all
        </button>
      )}
    </div>
  );
};
export default Read;
