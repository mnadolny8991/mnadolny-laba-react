import { useContext, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { ActionType } from "./types";
import styles from "@/styles/Home.module.css";
import { TaskForm } from './TaskForm';
import { Task } from './Task';

export function TodoApp() {
  // const [tasks, setTasks] = useState(new Array<Task>());
  // const [tasks, dispatch] = useReducer(taskReducer, new Array<Task>())
  const context = useContext(TodoContext);

  useEffect(() => {
    context?.dispatch({ type: ActionType.LOAD });
  }, []);

  function handleTaskDelete(id: string) {
    context?.dispatch({ type: ActionType.DELETE, id });
  }

  function handleTaskChange(id: string, newDescription: string) {
    context?.dispatch({ type: ActionType.CHANGE, id, taskDescription: newDescription });
  }

  function handleTaskDone(id: string, done: boolean) {
    context?.dispatch({ type: ActionType.SET_DONE, id, done });
  }

  return (
    <main className={styles['main']}>
      <div className={styles['task-manager']}>
        <TaskForm />
        <ul className={styles['task-list']}>
          {context?.tasks.map(t =>
            <Task
              key={t.id}
              taskDescription={t.description}
              taskDone={t.done}
              onTaskDelete={() => handleTaskDelete(t.id)}
              onTaskChange={(newDescription: string) => handleTaskChange(t.id, newDescription)}
              onTaskDone={(done: boolean) => handleTaskDone(t.id, done)} />
          )}
        </ul>
      </div>
    </main>
  );
}