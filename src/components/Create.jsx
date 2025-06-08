import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useContext } from "react";
import { todoContext } from "../Wrapper";

const Create = () => {
  const [todo, setTodo] = useContext(todoContext);

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
    toast.success("todo created")
    reset();
  };

  return (
    <div className="bg-create w-[60%] rounded-lg  p-10  mr-[10%]  ">
      <h1 className="  mb-10 bg-white px-10 py-5 rounded-sm ">
        <span className="text-8xl font-semibold text-heading tracking-wide underline decoration-2 underline-offset-8 ">
          TO DO
        </span>
        <br />{" "}
        <span className="block mt-2 text-2xl font-thin tracking-[.24em]">
          Reminds Everything
        </span>
      </h1>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <input
          className=" w-full text-2xl mb-2 border-b border-black-600 p-1 outline-0"
          type="text"
          placeholder="title"
          {...register("title",{required:"Title is required"})}
        />
        {errors.title && (<small className=" text-sm  font-normal  text-red-700 " >{errors.title.message}</small>)}
        <br />
        <button className="py-1 px-3 bg-white rounded-md font-normal text-lg mt-8">
          create todo
        </button>
      </form>
    </div>
  );
};

export default Create;
