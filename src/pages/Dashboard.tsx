import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState<Partial<Todo>>({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data.slice(0, 20));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddCancel = () => {
    setShowAddForm(false);
    setNewTodo({});
  };

  const handleAddSubmit = () => {
    // Assuming you have an API endpoint for adding todos
    axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
      .then(response => {
        // If the backend addition is successful, update the state
        setTodos([...todos, response.data]);
        setShowAddForm(false);
        setNewTodo({});
      })
      .catch(error => console.error('Error adding data:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

     

      <table className="min-w-full pt-6 bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">User ID</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Completed</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id} className="hover:bg-gray-100">
              <td className="p-3">{todo.id}</td>
              <td className="p-3">{todo.userId}</td>
              <td className="p-3">{todo.title}</td>
              <td className="p-3">{todo.completed ? 'Yes' : 'No'}</td>
              <td className="p-3">
                <div className="space-x-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => handleEdit(todo.id)}>
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddForm ? (
       <div className="max-w-md mx-auto mt-8">
       <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
         <div className="mb-4">
         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
            User ID:
            </label>
           <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="userId"
             type="number"
             name="userId"
             value={newTodo.userId || ''}
             onChange={handleInputChange}
           />
         </div>
     
         <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
             Title:
           </label>
           <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="title"
             type="text"
             name="title"
             value={newTodo.title || ''}
             onChange={handleInputChange}
           />
         </div>
     
         <div className="mb-4">
           <label className="flex items-center text-gray-700 text-sm font-bold">
             <input
               type="checkbox"
               className="form-checkbox h-5 w-5 text-blue-500"
               name="completed"
               checked={newTodo.completed || false}
               onChange={handleInputChange}
             />
             <span className="ml-2">Completed</span>
           </label>
         </div>
     
         <div className="flex items-center">
           <button
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             type="button"
             onClick={handleAddSubmit}
           >
             Add
           </button>
           <button
             className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             type="button"
             onClick={handleAddCancel}
           >
             Cancel
           </button>
         </div>
       </form>
     </div>
     
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={handleAddClick}
        >
          Add New
        </button>
      )}
    </div>
  );
};

export default Dashboard;
