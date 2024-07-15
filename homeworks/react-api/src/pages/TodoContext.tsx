import { createContext, Dispatch, useContext, useReducer } from "react";
import { Action, Task } from "./types";
import { taskReducer } from "./TaskReducer";

const TodoContext = createContext<{ tasks: Task[], dispatch: Dispatch<Action> } | null>(null);

export function useTodoContext() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, new Array<Task>());

  return (
    <TodoContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}