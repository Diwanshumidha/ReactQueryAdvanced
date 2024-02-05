import { useMutation, useQuery } from "@tanstack/react-query";
import { AddTodo, GetTodos, Todo } from "../lib/api";
import TodoCompleteBtn from "./TodoCompleteBtn";

const TodoList = () => {
  const { data: Todos } = useQuery({
    queryKey: ["todos"],
    queryFn: GetTodos,
  });

  return (
    <div className=" py-5 w-full">
      {Todos?.map((todo) => {
        return <Todo todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

export default TodoList;

function Todo({ todo }: { todo: Todo }) {
  return (
    <div className=" py-3 border-t-2 border-black last:border-b-2  ">
      <div className=" flex w-full justify-between gap-4">
        <div>
          <h2 className={` ${todo.completed ? " line-through" : null}`}>
            {todo.todo}
          </h2>
          <p>{todo.category}</p>
        </div>

        <button
          className=" text-red-900"
          onClick={() => {
            console.log("hello");
          }}
        >
          Delete
        </button>
      </div>
      <TodoCompleteBtn todo={todo} />
    </div>
  );
}
