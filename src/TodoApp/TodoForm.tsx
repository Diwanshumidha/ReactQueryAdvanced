import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddTodo, GetCategories } from "../lib/api";
import { ChangeEvent, FormEvent, useState } from "react";

const TodoForm = () => {
  const [todoText, setTodoText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategories,
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["addingtodos"],
    mutationFn: () => AddTodo({ todo: todoText, category: selectedCategoryId }),
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
    },
  });

  const HandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form className=" space-y-4 w-full" onSubmit={HandleSubmit}>
      <div className=" flex gap-4 w-full ">
        <input
          placeholder="Enter The Todo"
          className=" flex-1"
          value={todoText}
          required
          onChange={(e) => setTodoText(e.target.value)}
        />
        <select
          className=" px-5 py-2"
          value={selectedCategoryId}
          required
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="" disabled>
            Select a Category
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.name}>
              {" "}
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-5 py-2 text-white font-bold bg-green-600 w-full"
      >
        {isPending ? "Adding" : "Add"}
      </button>
      <ErrorComponent
        isError={isError}
        error={error}
        errorMessageUser="There was an issue adding your todo."
      />
    </form>
  );
};

export default TodoForm;

function ErrorComponent({
  errorMessageUser,
  isError,
  error,
}: {
  errorMessageUser: string;
  isError: boolean;
  error: Error | null;
}) {
  const [isErrorExpanded, setisErrorExpanded] = useState(false);

  return (
    <>
      {isError ? (
        <div
          className=" bg-red-600 text-white py-2 px-3 cursor-pointer "
          onClick={() => setisErrorExpanded((prev) => !prev)}
        >
          <div className="flex justify-between">
            <p>{errorMessageUser}</p>
            <p>View More Details</p>
          </div>
          {isErrorExpanded && error ? <p>Error:- {error?.message}</p> : null}
        </div>
      ) : null}
    </>
  );
}
