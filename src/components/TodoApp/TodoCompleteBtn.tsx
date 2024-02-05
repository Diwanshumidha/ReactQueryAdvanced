import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo, updateTodos } from "../../lib/api";
import { Checkbox } from "../ui/checkbox";

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
    <Checkbox
      checked={todo.completed}
      onCheckedChange={() => ToggleCompleted()}
    />
  );
};

export default TodoCompleteBtn;
