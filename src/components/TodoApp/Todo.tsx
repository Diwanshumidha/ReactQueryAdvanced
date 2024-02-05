import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  return (
    <div className=" w-full min-h-svh pt-10 md:pt-36   flex flex-col justify-center items-center container mx-auto px-5">
      <div className=" flex justify-between items-center w-full ">
        <h1 className=" text-4xl font-semibold my-3 text-left">Todos</h1>
        <TodoForm />
      </div>
      <TodoList />
    </div>
  );
};

export default Todo;
