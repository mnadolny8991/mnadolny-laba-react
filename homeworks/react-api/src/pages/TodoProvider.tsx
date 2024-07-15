import { useReducer } from "react";
import { TodoContext } from "./TodoContext";
import { Task } from "./types";
import { taskReducer } from "./TaskReducer";

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, new Array<Task>());

  return (
    <TodoContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}