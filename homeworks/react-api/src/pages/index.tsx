import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { FormEvent, useEffect, useReducer, useRef, useState } from "react";
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

enum ActionType {
  LOAD,
  SUBMIT,
  DELETE,
  CHANGE,
  SET_DONE
}

type Action = {
  type: ActionType,
  id ?: string,
  taskDescription ?: string,
  done ?: boolean
}

function taskReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case ActionType.LOAD: {
      const tasksStr = localStorage.getItem('tasks');
      if (!tasksStr) return [];
      const data: Array<Task> = JSON.parse(tasksStr);
      return data;
    }
    case ActionType.SUBMIT: {
      const id = uuidv4();
      const task: Task = { description: action.taskDescription!, id, done: false };
      const newTasks = [task, ...tasks];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    }
    case ActionType.DELETE: {
      const newTasks = tasks.filter(t => t.id !== action.id);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    }
    case ActionType.CHANGE: {
      const newTasks = tasks.map(t => t.id === action.id ? { id: action.id!, description: action.taskDescription!, done: false } : t);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    }
    case ActionType.SET_DONE: {
      const newTasks = tasks.map(t => t.id === action.id ? { id: action.id!, description: t.description, done: action.done! } : t);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    }
    default:
      return tasks;
  }
}

function TodoApp() {
  // const [tasks, setTasks] = useState(new Array<Task>());
  const [tasks, dispatch] = useReducer(taskReducer, new Array<Task>())

  useEffect(() => {
    dispatch({ type: ActionType.LOAD });
  }, []);

  function handleTaskSubmit(taskDescription: string) {
    dispatch({ type: ActionType.SUBMIT, taskDescription });
  }

  function handleTaskDelete(id: string) {
    dispatch({ type: ActionType.DELETE, id });
  } 

  function handleTaskChange(id: string, newDescription: string) {
    dispatch({ type: ActionType.CHANGE, id, taskDescription: newDescription });
  }

  function handleTaskDone(id: string, done: boolean) {
    dispatch({ type: ActionType.SET_DONE, id, done });
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
