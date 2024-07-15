import { useContext, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { ActionType } from "./types";
import styles from "@/styles/Home.module.css";
import { TaskForm } from './TaskForm';
import { Task } from './Task';

export function TodoApp() {
  const context = useContext(TodoContext);

  useEffect(() => {
    context?.dispatch({ type: ActionType.LOAD });
  }, []);

  return (
    <main className={styles['main']}>
      <div className={styles['task-manager']}>
        <TaskForm />
        <ul className={styles['task-list']}>
          {context?.tasks.map(t =>
            <Task
              key={t.id}
              id={t.id}
              taskDescription={t.description}
              taskDone={t.done}></Task>
          )}
        </ul>
      </div>
    </main>
  );
}