// Edit.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Edit: React.FC = () => {
  const [todo, setTodo] = useState<Todo>({
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        setTodo(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implement logic to update the to-do item
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${id}`, todo)
      .then(response => {
        console.log('Todo updated successfully:', response.data);
        // Navigate to the to-do list or view page after successful update
        navigate('/');
      })
      .catch(error => console.error('Error updating data:', error));
  };

  if (!id) {
    return (
      <div>
        <p>Error: ID is missing.</p>
      </div>
    );
  }

  const todoId = parseInt(id, 10);

  if (isNaN(todoId)) {
    return (
      <div>
        <p>Error: Invalid ID.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-4 p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Edit Data - ID: {todoId}</h1>
      <h2 className="text-xl mb-4">User ID: {todo.userId}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="flex items-center">
  <label className="block text-sm font-medium text-gray-700 mr-2">Completed:</label>
  <input
    type="checkbox"
    name="completed"
    checked={todo.completed}
    onChange={() =>
      setTodo(prevTodo => ({ ...prevTodo, completed: !prevTodo.completed }))
    }
    className="mt-1 p-2 border rounded-md"
  />
</div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default Edit;
