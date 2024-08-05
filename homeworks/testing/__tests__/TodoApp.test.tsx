import { render, screen } from "@testing-library/react";
import TodoApp from "@/components/TodoApp/TodoApp";

it('should have add button', () => { 
  render(<TodoApp />);
  const inputElem = screen.getByTestId('task-input');
  
});