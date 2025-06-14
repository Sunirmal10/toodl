import React from 'react'
import { IoMdClose } from 'react-icons/io'

const AddTaskModal = ({setShowAddTaskModal, fetchTodos}) => {

    const [textValue, setTextValue] = React.useState('')

    const [status, setStatus] = React.useState('pending');

    const api_base_url = import.meta.env.VITE_API_URL

    const createTask = async (e) => {
        e.preventDefault();
        // fetch 
        if (textValue !== '') { 

          try {
            
          const res = await fetch(api_base_url + '/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              todo: textValue,
              status: status
            })
          });
    
          const data = await res.json();
          if (data.success) {
            console.log("Task created successfully");
                  fetchTodos(); // Fetch updated todos after creating a new task
          } else {
            console.log("Failed to create task");
          }
      
          setTextValue('');
          setStatus('pending');
          setShowAddTaskModal(false);
         


          } catch (error) {
            console.error("Error in creating task:", error);
          }
        } else {
            alert("Please enter a task");
            return;
        }

 
    }

  return (
    <div className='flex flex-col gap-4 w-full max-w-[20rem] bg-white mx-4 rounded-md sm:rounded-lg h-fit shadow-md p-4 relative'>
        <h3 className='font-semibold'>Create Task</h3>
        <input className=' w-full h-10 pl-2 shadow bg-gray-200 rounded-lg text-sm outline-none' type="text" name='todo' placeholder='Add task here....' value={textValue} required onChange={(e)=>setTextValue(e.target.value)} autoFocus autoComplete='off' />

<span className='font-semibold text-md -mb-3'>Status:</span>
      <form className='flex gap-4 justify-start p-1 text-sm font-semibold'>
  <label className='flex gap-1 justify-center items-center cursor-pointer'>
    <input type="radio" name="status" value="pending" onChange={(e)=>setStatus(e.target.value)} defaultChecked />
    Pending
  </label>

  <label className='flex gap-1 justify-center items-center cursor-pointer'>
    <input type="radio" name="status" value="running" onChange={(e)=>setStatus(e.target.value)} />
    Running
  </label>

  <label className='flex gap-1 justify-center items-center cursor-pointer'>
    <input type="radio" name="status" value="done" onChange={(e)=>setStatus(e.target.value)} />
    Done
  </label>

</form>

  <button className='bg-orange-400 dark:bg-sky-400 hover:dark:bg-sky-500 text-white rounded-sm sm:rounded-md w-full h-10 px-2 py-1 hover:bg-orange-500 transition-all duration-100 cursor-pointer active:scale-90' type="submit" onClick={createTask}>
    Create
  </button>

  <button className='flex justify-center items-center absolute top-4.5 right-3.5 w-5 h-5 rounded-full bg-transparent hover:bg-gray-200 hover:scale-[1.2] active:scale-90 cursor-pointer'
  onClick={()=>setShowAddTaskModal(false)}
  >
    <IoMdClose />
  </button>
    </div>
  )
}

export default AddTaskModal