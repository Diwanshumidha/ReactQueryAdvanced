import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo, updateTodos } from "../lib/api";

const TodoCompleteBtn = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const { mutate: ToggleCompleted } = useMutation({
    mutationKey: ["todoCompleted", todo.id],
    mutationFn: () => updateTodos(todo.id, !todo.completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <>
      {todo.completed ? (
        <button onClick={() => ToggleCompleted()} className=" text-green-500">
          Mark as Pending
        </button>
      ) : (
        <button onClick={() => ToggleCompleted()} className="text-red-600">
          Mark as Completed
        </button>
      )}
    </>
  );
};

export default TodoCompleteBtn;
