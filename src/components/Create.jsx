import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useContext } from "react";
import { TodoContext } from './../context/TodoContext';

const Create = () => {
  const {todo, setTodo} = useContext(TodoContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const SubmitHandler = (data) => {
    data.isCompleted = false;
    data.id = nanoid();

    setTodo([...todo, data]);
    toast.success("Todo created successfully! 🎉")
    reset();
  };

  return (
    <div className="bg-gradient-to-br from-slate-400/50 to-slate-200/100 w-full md:w-full lg:w-[60%] rounded-2xl p-6 md:p-8 lg:p-10 md:mr-[10%] shadow-lg">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-md">
        <h1 className="mb-8">
          <span className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent tracking-wide">
            TO DO
          </span>
          <br />
          <span className="block mt-2 text-lg md:text-xl lg:text-2xl font-light text-slate-600 tracking-[.18em]">
            Reminds Everything
          </span>
        </h1>
        <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-12">
          <div className="relative">
            <input
              className="w-full tracking-[.06em] text-lg md:text-xl lg:text-2xl mb-2 border-b-2 border-slate-200 p-2 outline-none focus:border-slate-400 transition-colors bg-transparent text-slate-700 placeholder-slate-400"
              type="text"
              placeholder="What needs to be done?"
              {...register("title",{required:"Title is required"})}
            />
            {errors.title && (
              <small className="text-sm font-medium text-rose-500 absolute -bottom-6 left-0">
                {errors.title.message}
              </small>
            )}
          </div>
          <button 
            className="w-full py-3 px-6 bg-gradient-to-r from-slate-600 to-slate-500 text-white rounded-lg font-medium text-lg mt-8 hover:from-slate-700 hover:to-slate-600 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-slate-500/25"
            type="submit"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
