import { useEffect, useState, useMemo } from "react";
import { useTodoContext } from './TodoContext';
import { ActionType } from "./types";
import styles from "@/styles/Home.module.css";
import { TaskForm } from './TaskForm';
import { Task } from './Task';
import { Search } from "./Search";
import { useDebounce } from "./useDebounce";

export function TodoApp() {
  const context = useTodoContext();
  const [searchValue, setSearchValue] = useState<string>('');
  // first custom
  const searchValueDebounced = useDebounce(searchValue, 300);

  useEffect(() => {
    context?.dispatch({ type: ActionType.LOAD });
  }, []);

  function handleSearchValueChange(e: any) {
    setSearchValue(e.target.value);
  }

  const tasks = useMemo(() => context?.tasks.map(t => {
    if (t.description.includes(searchValueDebounced))
      return (<Task
        key={t.id}
        id={t.id}
        taskDescription={t.description}
        taskDone={t.done} />
      );
  }), [context?.tasks, searchValueDebounced]);

  return (
    <main className={styles['main']}>
      <div className={styles['task-manager']}>
        <TaskForm />
        <Search onValueChange={handleSearchValueChange}/>
        <ul className={styles['task-list']}>
          {tasks}
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