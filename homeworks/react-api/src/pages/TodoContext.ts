import { createContext, Dispatch } from "react";
import { Action, Task } from "./types";

export const TodoContext = createContext<{ tasks: Task[], dispatch: Dispatch<Action> } | null>(null);

