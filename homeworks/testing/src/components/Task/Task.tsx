import { useEffect, useRef, useState } from "react";
import styles from "./Task.module.css";
import Image from "next/image";

export default function Task({ taskDescription, taskDone, onTaskDelete, onTaskChange, onTaskDone }: 
  { 
    taskDescription: string, 
    taskDone: boolean,
    onTaskDelete: () => void, 
    onTaskChange: (newDescription: string) => void,
    onTaskDone: (done: boolean) => void 
  }) {
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabled]);

  return (
    <div>
      <div className={styles['complete-checkbox']}>
        <input type="checkbox" id="completed" checked={taskDone} onChange={(e: any) => {
          const checked = e.target.checked;
          onTaskDone(checked);
        }}></input>
        <label htmlFor="completed">Mark as Completed</label>
      </div>
      <div className={styles['task']}>
        <input 
          type="text" 
          disabled={disabled} 
          className={`${styles['task__input']} ${taskDone && styles['task__input_done']}`}
          onChange={(e: any) => {
            onTaskChange(e.target.value);
          }}
          value={taskDescription}
          ref={inputRef}
          maxLength={30}
          data-testid="task">
        </input>
        <button className={styles['task__btn']} onClick={() => setDisabled(!disabled)}>
          <Image
            width={63.23}
            height={65}
            src="/write.svg"
            alt="write image"
          />
        </button>
        <button className={styles['task__btn']} onClick={onTaskDelete}>
          <Image
            width={59.38}
            height={65}
            src="/delete.svg"
            alt="write image"
          />
        </button>
      </div>
    </div>
  );
}
