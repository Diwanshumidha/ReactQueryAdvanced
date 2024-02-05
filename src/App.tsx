import Todo from "./components/TodoApp/Todo";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <div className="bg-[#f6f9fb]">
      <Todo />
      <Toaster />
    </div>
  );
};

export default App;
