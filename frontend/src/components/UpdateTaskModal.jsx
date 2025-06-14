import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io'

const UpdateTaskModal = ({setShowUpdateTaskModal, fetchTodos, editId, todos}) => {

    // const [textValue, setTextValue] = React.useState();

  const toBeEditedTask = todos.find(todo => todo._id === editId);
      const [editFormData, setEditFormData] = useState({
    todo: toBeEditedTask?.todo || "",
    status: toBeEditedTask?.status || "",
  });

  useEffect(() => {
    setEditFormData({
      todo: toBeEditedTask?.todo || "",
      status: toBeEditedTask?.status || "",
    });
  }, [toBeEditedTask]);

  const handleChange = (e) => {
    setEditFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

    // const [status, setStatus] = React.useState('pending');

    const api_base_url = import.meta.env.VITE_API_URL

    const updateTask = async (e) => {
        e.preventDefault();
        // fetch 
        if (editFormData.todo !== '') { 

          try {
            
          const res = await fetch(api_base_url + '/update', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              todo: editFormData.todo,
              status: editFormData.status,
              taskId: editId // Pass the task ID to update
            })
          });
    
          const data = await res.json();
          if (data.success) {
            console.log("Task updated successfully");
                  fetchTodos(); // Fetch updated todos after creating a new task
          } else {
            console.log("Failed to updated task");
          }
      
   
 
          setShowUpdateTaskModal(false);
         


          } catch (error) {
            console.error("Error in updating task:", error);
          }
        } else {
            alert("Please enter a task");
            return;
        }

 
    }

  return (
    <div className='flex flex-col gap-4 w-full max-w-[20rem] bg-white mx-4 rounded-md sm:rounded-lg h-fit shadow-md p-4 relative'>
        <h3 className='font-semibold'>Update Task</h3>
        <input className=' w-full h-10 pl-2 p-1.5 shadow bg-gray-200 rounded-lg text-sm outline-orange-400 dark:outline-sky-400' name='todo' type="text" placeholder='Update task' value={editFormData.todo} required onChange={handleChange} autoFocus />

<span className='font-semibold text-md -mb-3'>Status:</span>
      <form className='flex gap-4 justify-start p-1 text-sm font-semibold'>
  <label className='flex gap-1 justify-center items-center cursor-pointer'>
    <input type="radio" name="status" value="pending" onChange={handleChange} checked={editFormData.status === 'pending'} />
    Pending
  </label>

  <label className='flex gap-1 justify-center items-center cursor-pointer'>
    <input type="radio" name="status" value="running" onChange={handleChange} checked={editFormData.status === 'running'} />
    Running
  </label>

  <label className='flex gap-1 justify-center items-center cursor-pointer'>
    <input type="radio" name="status" value="done" onChange={handleChange} checked={editFormData.status === 'done'} />
    Done
  </label>

</form>

  <button className='bg-orange-400 dark:bg-sky-400 hover:dark:bg-sky-500 text-white rounded-sm sm:rounded-md w-full h-10 px-2 py-1 hover:bg-orange-500 transition-all duration-100 cursor-pointer active:scale-90' type="submit" 
  onClick={updateTask}
  >
    Update
  </button>

  <button className='flex justify-center items-center absolute top-4.5 right-3.5 w-5 h-5 rounded-full bg-transparent hover:bg-gray-200 hover:scale-[1.2] active:scale-90 cursor-pointer'
  onClick={()=>setShowUpdateTaskModal(false)}
  >
    <IoMdClose />
  </button>
    </div>
  )
}

export default UpdateTaskModal