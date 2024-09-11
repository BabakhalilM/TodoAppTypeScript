import React, { useState } from 'react';
import TodoForm from './Todoform';
import TodoItem from './Todoitem';

type Todo = {
  id: number;
  task: string;
  status: 'Pending' | 'Completed';
  assignedTo: string;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const addTodo = (task: string, status: 'Pending' | 'Completed', assignedTo: string) => {
    const newTodo = { id: Date.now(), task, status, assignedTo };
    setTodos([...todos, newTodo]);
  };

  const editTodo = (id: number, task: string, status: 'Pending' | 'Completed', assignedTo: string) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, task, status, assignedTo } : todo))
    );
    setCurrentTodo(null);
  };

  const handleEdit = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setCurrentTodo(todoToEdit);
    }
  };
  const toggleStatus = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, status: todo.status === 'Pending' ? 'Completed' : 'Pending' }
        : todo
    ));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Todo List</h1>
      <TodoForm addTodo={addTodo} editTodo={editTodo} currentTodo={currentTodo} />
      <table className="min-w-full table-auto border-collapse border border-gray-200 mt-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-200">Task</th>
            <th className="px-4 py-2 border border-gray-200">Assigned To</th>
            <th className="px-4 py-2 border border-gray-200">Status</th>
            <th className="px-4 py-2 border border-gray-200 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              toggleStatus={toggleStatus}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
