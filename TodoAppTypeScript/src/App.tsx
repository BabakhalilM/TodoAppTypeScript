import React from 'react';
import TodoList from './components/Todolist';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-3xl bg-white shadow-md rounded-lg p-6">
        <TodoList />
      </div>
    </div>
  );
};

export default App;
