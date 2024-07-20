import { useState, useEffect } from 'react';

export function useDebounce(searchValue: string, delay = 500) {
  const [searchValueDebounced, setSearchValueDebounced] = useState('');

  useEffect(() => {
    const timId = setTimeout(() => setSearchValueDebounced(searchValue), delay);
    return () => clearTimeout(timId);
  }, [searchValue, delay]);

  return searchValueDebounced;
}