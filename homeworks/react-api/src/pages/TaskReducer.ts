import { Task, Action, ActionType } from "./types";
import { v4 as uuidv4 } from 'uuid';

export function taskReducer(tasks: Task[], action: Action): Task[] {
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