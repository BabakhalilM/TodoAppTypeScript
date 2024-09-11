import React from 'react';

type TodoItemProps = {
  todo: {
    id: number;
    task: string;
    status: 'Pending' | 'Completed';
    assignedTo: string;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  toggleStatus: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete,toggleStatus }) => {

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2">{todo.task}</td>
      <td className="px-4 py-2">{todo.assignedTo}</td>
      <td className="px-4 py-2">
        <span
        onClick={() => toggleStatus(todo.id)}
          className={`px-2 py-1 rounded-lg text-xs ${
            todo.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          } hover:opacity-75 transition duration-200`}
        >
          {todo.status}
        </span>
      </td>
      <td className="px-4 py-2 text-right space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          onClick={() => onEdit(todo.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
