import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from './TodoApp.module.css';
import TaskForm from "@/components/TaskForm/TaskForm";
import Task from "@/components/Task/Task";
import type { Task as TaskData } from "@/types";

export default function TodoApp() {
  const [tasks, setTasks] = useState(new Array<TaskData>());

  useEffect(() => {
    const tasksStr = localStorage.getItem('tasks');
    if (!tasksStr) return;
    const data: Array<TaskData> = JSON.parse(tasksStr);
    setTasks(data);
  }, []);

  function handleTaskSubmit(taskDescription: string) {
    const id = uuidv4();
    const task: TaskData = { description: taskDescription, id, done: false };
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