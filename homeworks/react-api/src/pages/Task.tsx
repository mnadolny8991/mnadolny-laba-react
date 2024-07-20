import { useEffect, useRef, useState } from "react";
import styles from '@/styles/Home.module.css';
import Image from "next/image";
import { useValidation } from "./useValidation";
import { useTodoContext } from './TodoContext';
import { ActionType } from "./types";

export function Task({ taskDescription, taskDone, id }:
  {
    taskDescription: string,
    taskDone: boolean,
    id: string
  }) {
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [task, setTask] = useState(taskDescription);
  // second custom hook
  const [error, validate] = useValidation({ task });
  // third custom hook
  const context = useTodoContext();

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabled]);

  return (
    <div>
      <div className={styles['complete-checkbox']}>
        <input type="checkbox" id="completed" checked={taskDone} onChange={(e: any) => {
          const checked = e.target.checked;
          context?.dispatch({ type: ActionType.SET_DONE, id: id, taskDescription: taskDescription, done: checked });
        }}></input>
        <label htmlFor="completed">Mark as Completed</label>
      </div>
      <div className={styles['task']}>
        {disabled ? 
        <input
          type="text"
          disabled={disabled}
          className={`${styles['task__input']} ${taskDone && styles['task__input_done']}`}
          value={taskDescription}>
        </input> :
        <input
          type="text"
          disabled={disabled}
          className={`${styles['task__input']} ${taskDone && styles['task__input_done']}`}
          onChange={(e: any) => setTask(e.target.value)}
          value={task}
          ref={inputRef}
          maxLength={30}>
        </input>}
        
        <button className={styles['task__btn']} onClick={() => {
          if (!validate()) {
            inputRef.current?.focus();
            return;
          }
          context?.dispatch({ type: ActionType.CHANGE, id: id, taskDescription: task });
          setDisabled(!disabled);
        }}>
          <Image
            width={63.23}
            height={65}
            src="/write.svg"
            alt="write image"
          />
        </button>
        <button className={styles['task__btn']} onClick={() => context?.dispatch({ type: ActionType.DELETE, id: id })}>
          <Image
            width={59.38}
            height={65}
            src="/delete.svg"
            alt="write image"
          />
        </button>
      </div>
      {error && <div className={styles['error']}>{error}</div>}
    </div>
  );
}