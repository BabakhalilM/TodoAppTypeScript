import React, { useState, useEffect } from 'react';

type TodoFormProps = {
  addTodo: (task: string, status: 'Pending' | 'Completed', assignedTo: string) => void;
  editTodo: (id: number, task: string, status: 'Pending' | 'Completed', assignedTo: string) => void;
  currentTodo: {
    id: number;
    task: string;
    status: 'Pending' | 'Completed';
    assignedTo: string;
  } | null;
};

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, editTodo, currentTodo }) => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState<'Pending' | 'Completed'>('Pending');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    if (currentTodo) {
      setTask(currentTodo.task);
      setStatus(currentTodo.status);
      setAssignedTo(currentTodo.assignedTo);
    } else {
      setTask('');
      setStatus('Pending');
      setAssignedTo('');
    }
  }, [currentTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTodo) {
      editTodo(currentTodo.id, task, status, assignedTo);
    } else {
      addTodo(task, status, assignedTo);
    }
    setTask('');
    setStatus('Pending');
    setAssignedTo('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-4">
        <input
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Assigned to"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <select
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Pending' | 'Completed')}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        {currentTodo ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TodoForm;
