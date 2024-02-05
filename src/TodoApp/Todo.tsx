import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  return (
    <div className=" w-full min-h-svh pt-36 flex flex-col justify-center items-center px-3 container mx-auto">
      {" "}
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Todo;
