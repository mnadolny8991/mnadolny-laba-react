import { FormEvent, useState } from "react";
import styles from './TaskForm.module.css';

export default function TaskForm({ onTaskSubmit }: { onTaskSubmit: (desc: string) => void }) {
  const [task, setTask] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onTaskSubmit(task);
    setTask('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={styles['task-input']}>
        <input 
          data-testid="task-input"
          type="text" 
          name="task" 
          id="task"
          placeholder="Create Todo-Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className={styles['task-input__input']}
          required
          maxLength={30}>
        </input>
        <button className={styles['task-input__btn']} data-testid="task-add-btn">Add</button>
      </div>
    </form>
  );
}