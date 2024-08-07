import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoApp />
    </>
  );
}

interface Task {
  description: string,
  done: boolean,
  id: string
}

function TodoApp() {
  const [tasks, setTasks] = useState(new Array<Task>());

  useEffect(() => {
    const tasksStr = localStorage.getItem('tasks');
    if (!tasksStr) return;
    const data: Array<Task> = JSON.parse(tasksStr);
    setTasks(data);
  }, []);

  function handleTaskSubmit(taskDescription: string) {
    const id = uuidv4();
    const task: Task = { description: taskDescription, id, done: false };
    const newTasks = [task, ...tasks];
    setTasks([task, ...tasks]);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  function handleTaskDelete(id: string) {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  } 

  function handleTaskChange(id: string, newDescription: string) {
    const newTasks = tasks.map(t => t.id === id ? { id: id, description: newDescription, done: false } : t);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  function handleTaskDone(id: string, done: boolean) {
    const newTasks = tasks.map(t => t.id === id ? { id: id, description: t.description, done } : t);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  return (
    <main className={styles['main']}>
      <div className={styles['task-manager']}>
        <TaskForm onTaskSubmit={(desc: string) => handleTaskSubmit(desc)}/>
        <ul className={styles['task-list']}>
          {tasks.map(t => 
            <Task 
              key={t.id} 
              taskDescription={t.description} 
              taskDone={t.done}
              onTaskDelete={() => handleTaskDelete(t.id)}
              onTaskChange={(newDescription: string) => handleTaskChange(t.id, newDescription)}
              onTaskDone={(done: boolean) => handleTaskDone(t.id, done)}/>
          )}
        </ul>
      </div>
    </main>
  );
}

function TaskForm({ onTaskSubmit }: { onTaskSubmit: (desc: string) => void }) {
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
        <button className={styles['task-input__btn']}>Add</button>
      </div>
    </form>
  );
}

function Task({ taskDescription, taskDone, onTaskDelete, onTaskChange, onTaskDone }: 
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
          maxLength={30}>
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
