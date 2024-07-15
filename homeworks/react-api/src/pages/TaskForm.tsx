import { FormEvent, useContext, useRef, useState } from "react";
import { ActionType } from './types';
import styles from "@/styles/Home.module.css";
import { TodoContext } from './TodoContext';
import { useValidation } from './useValidation';

export function TaskForm() {
  const [task, setTask] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const context = useContext(TodoContext);
  const [error, validate] = useValidation({ task });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    inputRef.current?.focus();
    if (!validate()) return;
    context?.dispatch({ type: ActionType.SUBMIT, taskDescription: task });
    setTask('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={styles['task-input']}>
        <input
          type="text"
          name="task"
          id="task"
          placeholder="Create Todo-Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className={styles['task-input__input']}
          maxLength={30}
          ref={inputRef}>
        </input>
        <button type="submit" className={styles['task-input__btn']}>Add</button>
      </div>
      {error && <div className={styles['error']}>{error}</div>}
    </form>
  );
}
