import { useQuery } from "@tanstack/react-query";
import { GetTodos, Todo } from "../../lib/api";
import TodoCompleteBtn from "./TodoCompleteBtn";
import TodoDeleteBtn from "./TodoDeleteBtn";
import { ErrorComponent } from "@/components/ErrorComponent";
import { Badge } from "../ui/badge";

const TodoList = () => {
  const {
    data: Todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: GetTodos,
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return (
      <ErrorComponent
        error={error}
        errorMessageUser="Error Loading Lists"
        isError={isError}
      />
    );
  }

  return (
    <div className=" py-5 w-full space-y-3">
      {Todos?.map((todo) => {
        return <Todo todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

export default TodoList;

function Todo({ todo }: { todo: Todo }) {
  return (
    <div className=" py-3 bg-white px-6 rounded-2xl  flex w-full justify-between gap-4 items-center  ">
      <TodoDeleteBtn todoId={todo.id} />

      <div className=" flex-1">
        <div>
          <h2 className={` ${todo.completed ? " line-through" : null}`}>
            {todo.todo}
          </h2>
          <Badge className=" bg-green-600">{todo.category}</Badge>
        </div>
      </div>
      <TodoCompleteBtn todo={todo} />
    </div>
  );
}
