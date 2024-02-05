import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddTodo, GetCategories } from "../../lib/api";
import { FormEvent, useState } from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

const TodoForm = () => {
  const [todoText, setTodoText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategories,
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["addingtodos"],
    mutationFn: () => AddTodo({ todo: todoText, category: selectedCategoryId }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      setSelectedCategoryId("");
      setTodoText("");
    },
  });

  const HandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Drawer open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e)}>
      <DrawerTrigger asChild>
        <Button className=" bg-green-800">
          <PlusIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className=" max-w-2xl w-full min-h-[50svh] flex flex-col px-5 p mx-auto">
          <DrawerHeader>
            <DrawerTitle className=" text-2xl">Add A Todo</DrawerTitle>
            <DrawerDescription>Add a Todo to your list.</DrawerDescription>
          </DrawerHeader>
          <form
            className="space-y-4 py-6  flex-1 flex flex-col justify-center items-center w-full"
            onSubmit={HandleSubmit}
          >
            <div className=" w-full">
              <Label htmlFor="todo">
                Todo <Required />
              </Label>
              <Input
                id="todo"
                placeholder="Enter The Todo"
                className=" flex-1"
                value={todoText}
                required
                onChange={(e) => setTodoText(e.target.value)}
              />
            </div>

            <div className=" w-full">
              <Label>
                Category <Required />{" "}
              </Label>
              <Select
                onValueChange={(value) => {
                  setSelectedCategoryId(value);
                }}
                value={selectedCategoryId}
                required={true}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={!selectedCategoryId || !todoText}
              className="px-5 py-2 text-white font-bold bg-green-600 w-full"
            >
              {isPending ? "Adding" : "Add"}
            </Button>
            <ErrorComponent
              isError={isError}
              error={error}
              errorMessageUser="There was an issue adding your todo."
            />
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TodoForm;

const Required = () => (
  <span aria-label="required felid" className=" text-red-600">
    *
  </span>
);
