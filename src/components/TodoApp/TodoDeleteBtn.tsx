import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteTodo } from "../../lib/api";
import { Trash } from "lucide-react";

const TodoDeleteBtn = ({ todoId }: { todoId: number }) => {
  const queryClient = useQueryClient();
  const { mutate: DeleteThisTodo, isPending } = useMutation({
    mutationKey: ["todoDelete", todoId],
    mutationFn: () => DeleteTodo(todoId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return (
    <button className=" text-red-900" onClick={() => DeleteThisTodo()}>
      <Trash size={20} />
    </button>
  );
};

export default TodoDeleteBtn;
