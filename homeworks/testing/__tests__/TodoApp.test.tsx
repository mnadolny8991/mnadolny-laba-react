import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "@/components/TodoApp/TodoApp";

test('form input changes when typing', () => { 
  render(<TodoApp />);
  const inputElem: HTMLInputElement = screen.getByTestId('task-input');
  fireEvent.change(inputElem, { target: { value: 'write a killer app' } } );
  expect(inputElem.value).toBe('write a killer app');
});

test('new task is added upon add click', () => { 
  render(<TodoApp />);
  const formInputElem: HTMLInputElement = screen.getByTestId('task-input');
  fireEvent.change(formInputElem, { target: { value: 'write a killer app' } } );
  const inputElem: HTMLButtonElement = screen.getByTestId('task-add-btn');
  fireEvent.click(inputElem);

  const tasks: HTMLInputElement[] = screen.getAllByTestId('task');
  const firstTask = tasks[0];
  expect(firstTask.value).toBe('write a killer app');
});