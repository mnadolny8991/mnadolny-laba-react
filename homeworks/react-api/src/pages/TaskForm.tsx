import { FormEvent, useContext, useRef, useState } from "react";
import { ActionType } from './types';
import styles from "@/styles/Home.module.css";
import { TodoContext } from './TodoContext';

export function TaskForm() {
    const [task, setTask] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const context = useContext(TodoContext);
  
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      context?.dispatch({ type: ActionType.SUBMIT, taskDescription: task });
      setTask('');
      inputRef.current?.focus();
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
            required
            maxLength={30}
            ref={inputRef}>
          </input>
          <button className={styles['task-input__btn']}>Add</button>
        </div>
      </form>
    );
  }
  