import { useState } from 'react';

export function useValidation({ task }: { task: string }): [string, () => boolean] {
  const [error, setError] = useState<string>('');

  function validate(): boolean {
    if (task.length < 2) {
      setError('task must have at least 2 characters');
      return false;
    }
    setError('');
    return true;
  }

  return [error, validate];
}