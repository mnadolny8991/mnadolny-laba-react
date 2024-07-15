import { useContext, useEffect } from "react";
import { useTodoContext } from './TodoContext';
import { ActionType } from "./types";
import styles from "@/styles/Home.module.css";
import { TaskForm } from './TaskForm';
import { Task } from './Task';

export function TodoApp() {
  const context = useTodoContext();

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
              taskDone={t.done} />
          )}
        </ul>
        <button 
          className={styles['btn-remove']}
          onClick={() => context?.dispatch({ type: ActionType.REMOVE_COMPLETED })}>
          Remove Completed
        </button>
      </div>
    </main>
  );
}