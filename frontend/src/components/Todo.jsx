import React, { useState } from "react";
import { IoMdAdd, IoMdClose, IoMdMoon, IoMdSunny } from "react-icons/io";
import {
  MdAccessTime,
  MdEdit,
  MdErrorOutline,
  MdFilterList,
  MdFilterListOff,
  MdOutlineDragIndicator,
  MdSunny,
} from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";
import { GoGrabber } from "react-icons/go";
import AddTaskModal from "./AddTaskModal";
import { useEffect } from "react";
import UpdateTaskModal from "./UpdateTaskModal";
import { TbFilterDown } from "react-icons/tb";
import { TbFilterUp } from "react-icons/tb";
import { HiMoon } from "react-icons/hi";

const Todo = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  const [editId, setEditId] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [checkedTask, setCheckedTask] = useState(false);

  const [filterRadioValue, setFilterRadioValue] = useState("");

  const api_base_url = import.meta.env.VITE_API_URL;

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(api_base_url + "/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTodos(data.tasks);
      if (data.success) {
        setTodos(data.tasks);
        console.log("Todos fetched successfully:", data.tasks);
      } else {
        console.error("Failed to fetch todos");
        setError("Failed to fetch todos");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError(" Error fetching todos");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const [showAddTaskModal, setShowAddTaskModal] = React.useState(false);
  const [showUpdateTaskModal, setShowUpdateTaskModal] = React.useState(false);

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(api_base_url + "/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: id }),
      });

      const data = await res.json();
      if (data.success) {
        console.log("Todo deleted successfully:", data);
        fetchTodos();
      } else {
        console.error("Failed to delete todo:", data);
        setError("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Error deleting todo");
    }
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <main className="flex relative w-full min-h-dvh">
      <img
        src={`/images/${
          darkMode
            ? "dark-layered-waves-haikei.svg"
            : "layered-waves-haikei.svg"
        }`}
        alt="theme-svg"
        className="w-full h-screen overflow-hidden object-cover opacity-90"
      />
      {/* Sun / Moon section  */}
      <section className="hidden md:flex absolute top-6 left-1/4 w-32 h-32 text-[16rem]  justify-between items-center px-4 bg-transparent">
       {darkMode ? <HiMoon className="text-white" /> :  <MdSunny className="text-amber-500" /> }
      </section>
      {/* Real Todo Task Section  */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 p-0 m-0 w-full max-w-[26rem]">
      {/* Extra Todo task section wrapper */}
        <div className="flex flex-col justify-start items-center w-full max-w-[26rem] min-h-dvh h-full dark:from-blue-950 dark:via-blue-200 dark:to-blue-100 relative">
          {/* header wrapper  */}
          <span className="flex w-full px-4 justify-center items-center mb-4 mt-3 relative">
            {/* filter button  */}
            <span
              className="flex justify-center items-center absolute top-2 left-2 w-7 h-7 rounded-full dark:text-white text-orange-800/80 text-xl cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out hover:bg-orange-400/50 hover:dark:bg-gray-900/50"
              onClick={() => setShowFilter(!showFilter)}
              title={showFilter ? "Hide filters" : "Show filters"}
            >
              {showFilter ? <MdFilterListOff /> : <MdFilterList />}
            </span>
            {/* header  */}
            <span className="flex gap-1.5 items-center dark:text-white text-3xl font-semibold"
            
            >
              <span className="font-bold text-white text-shadow-2xs text-shadow-orange-600 dark:text-shadow-sky-600 "
              style={{
                  fontFamily: "Coiny, system-ui"
              }}
              >
                Tood<span className="text-amber-500 dark:text-sky-500"
                   style={{
                  fontFamily: "Coiny, system-ui"
              }}
                >L
                </span>
                </span>
            </span>
            {/* theme button  */}
            <span
              className="flex absolute top-2 right-2 w-7 h-7 rounded-full dark:text-white text-orange-800/80 text-2xl cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out hover:bg-orange-400/50 hover:dark:bg-gray-900/50 justify-center items-center"
              onClick={toggleDarkMode}
              // title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? <IoMdSunny /> : <IoMdMoon />}
            </span>
          </span>

          {/* todo list wrapper  */}
          <div className="flex flex-col gap-2.5 w-full px-2">
            {/* loading state */}

            {loading && (
              <div className="flex justify-center items-center w-full h-24 text-xl gap-1 font-semibold text-amber-500 dark:text-gray-200">
                <MdAccessTime /> <span>Loading</span>
              </div>
            )}
            {/* error state */}
            {error && (
              <div className="flex justify-center items-center w-full h-24 text-red-400 dark:text-red-500/80 text-md text-center gap-1 font-semibold">
                <MdErrorOutline className="" />
                <span className="">Something is wrong! {error}</span>
              </div>
            )}

            {/* Filters */}

            {
              <section
                className="flex w-full justify-between h-10 font-semibold dark:text-white px-2 items-center text-[10px] sm:text-[12px] overflow-hidden"
                style={{
                  height: showFilter ? "2.25rem" : 0,
                  transition: "all 0.5s ease",
                  opacity: showFilter ? 1 : 0,
                }}
              >
                <div className="flex gap-2 font-semibold dark:text-white justify-evenly items-center">
                  <label
                    className="flex cursor-pointer items-center gap-0.5"
                    htmlFor="all"
                  >
                    <input
                      className=" cursor-pointer"
                      type="radio"
                      name="filter-status"
                      checked={filterRadioValue === ""}
                      value=""
                      id="all"
                      onClick={() => setFilterRadioValue("")}
                    />
                    All
                  </label>
                  <label
                    className="flex cursor-pointer items-center gap-0.5"
                    htmlFor="pending"
                  >
                    <input
                      className=" cursor-pointer"
                      type="radio"
                      name="filter-status"
                      checked={filterRadioValue === "pending"}
                      value="pending"
                      id="pending"
                      onClick={(e) => setFilterRadioValue(e.target.value)}
                    />
                    Pending
                  </label>
                  <label
                    className="flex cursor-pointer items-center gap-0.5"
                    htmlFor="running"
                  >
                    <input
                      className=" cursor-pointer"
                      type="radio"
                      name="filter-status"
                      checked={filterRadioValue === "running"}
                      value="running"
                      id="running"
                      onClick={(e) => setFilterRadioValue(e.target.value)}
                    />
                    Running
                  </label>
                  <label
                    className="flex cursor-pointer items-center gap-0.5"
                    htmlFor="done"
                  >
                    <input
                      className=" cursor-pointer"
                      type="radio"
                      name="filter-status"
                      checked={filterRadioValue === "done"}
                      value="done"
                      id="done"
                      onClick={(e) => setFilterRadioValue(e.target.value)}
                    />
                    Done
                  </label>
                </div>
                <div>
                  <label
                    className="flex cursor-pointer items-center gap-1"
                    htmlFor="filter-checked"
                  >
                    <input
                      className=" cursor-pointer"
                      type="checkbox"
                      name="filter-status"
                      value="done"
                      id="filter-checked"
                      onChange={() => setCheckedTask(!checkedTask)}
                    />
                    Checked
                  </label>
                </div>
              </section>
            }

            {/* todos list mapping  */}

            {todos.length > 0 ? (
              todos
                .filter((item) => {
                  if(checkedTask)
                   { return item.checked === checkedTask }
                  else return item;})
                .filter((item) => {
                  if (filterRadioValue === "pending") {
                    return item.status === filterRadioValue;
                  } else if (filterRadioValue === "running") {
                    return item.status === filterRadioValue;
                  } else if (filterRadioValue === "done") {
                    return item.status === filterRadioValue;
                  } else return item;
                })

                .map((task, i) => (
                  // individual todo

                  <div
                    key={i}
                    className="flex gap-1.5 items-center justify-between group bg-white shadow-md rounded-lg w-full p-4 "
                  >
                    <span className="flex gap-2 items-center">
                      {/* grabbing icon  */}
                      {/* <GoGrabber className="hidden text-gray-500 relative top-0 -left-2.5 -mr-4.5 text-xl p-0 m-0 group-hover:block group-hover:opacity-80 transition-all duration-400 ease-in-out" /> */}
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        name={task.todo}
                        id={task._id}
                        checked={task.checked}
                        onChange={() => {
                          setTodos(
                            todos.map((t) => {
                              if (t._id === task._id) {
                                return { ...t, checked: !t.checked };
                              }
                              return t;
                            })
                          );
                        }}
                        title="Mark task as checked"
                      />
                      <h2
                        className={
                          task.checked
                            ? "text-sm font-semibold text-gray-500 line-through cursor-pointer"
                            : "text-sm font-semibold cursor-pointer"
                        }
                        title={task.todo}
                      >
                        {task.todo.length > 20
                          ? task.todo.slice(0, 20) + "..."
                          : task.todo}
                      </h2>

                      {/* status tab */}

                      <span
                        className={`rounded-2xl text-[10px] px-2 py-1 sm:text-xs opacity-80 scale-90 sm:scale-95 font-semibold cursor-pointer ${
                          task.status === "pending"
                            ? "bg-red-300/80 text-red-600/80"
                            : task.status === "running"
                            ? "bg-orange-300/80 text-orange-600/80"
                            : task.status === "done"
                            ? "bg-green-300/80 text-green-600"
                            : "bg-gray-300"
                        }`}
                        title={"Status: " + task.status}
                      >
                        {task.status.charAt(0).toUpperCase() +
                          task.status.slice(1)}
                      </span>
                    </span>

                    {/* Edit and Delete buttons */}

                    <span className="flex gap-1.5 items-center">
                      {/* edit task button */}
                      <button
                        className="border-0 bg-transparent cursor-pointer text-gray-400 hover:bg-gray-200 rounded-full w-5 h-5 hover:scale-[1.2] flex justify-center items-center"
                        onClick={() => {
                          setShowUpdateTaskModal(true);
                          setEditId(task._id);
                        }}
                        title="Edit Task"
                      >
                        <MdEdit />
                      </button>

                      {/* delete task button */}
                      <button
                        className="border-0 bg-transparent cursor-pointer hover:bg-orange-100 hover:dark:bg-sky-100 rounded-full w-5 h-5 hover:scale-[1.2] flex justify-center items-center"
                        onClick={() => deleteTodo(task._id)}
                        title="Remove Task"
                      >
                        <IoMdClose />
                      </button>
                    </span>
                  </div>
                ))
            ) : error === null && (
              <div className="flex justify-center items-center w-full h-24 text-xl gap-1 font-semibold text-amber-500 dark:text-gray-200/80">
                <span className="">Add a new task!</span>
              </div>
            )}
          </div>

          {/* add task button */}
          <button
            className="flex fixed bottom-4 justify-center items-center text-xl shadow-md hover:shadow-gray-500 w-12 h-12 bg-[#FFCC33] dark:bg-sky-400 hover:dark:bg-sky-500 dark:text-white text-orange-800/80 rounded-full px-2 border-0 m-0 cursor-pointer hover:bg-orange-500 hover:scale-[1.15] hover:text-2xl transition-all duration-200 ease-in-out z-40 active:scale-90"
            onClick={() => setShowAddTaskModal(true)}
            title="Add new task"
          >
            <IoMdAdd />
          </button>

          {/* bottom gradient */}
          {/* <div className="fixed bottom-0 right-0 w-full h-24 bg-gradient-to-t from-neutral-200/90 via-neutral-200/50 to-neutral-200/10 z-20 backdrop-blur-4xl pointer-events-none"></div> */}

     

        </div>
      </div>
           {/* add task modal */}

          {showAddTaskModal && (
            <section
              className={`fixed top-0 w-full h-full bg-black/80 z-50 flex justify-center items-center`}
            >
              <AddTaskModal
                setShowAddTaskModal={setShowAddTaskModal}
                showAddTaskModal={showAddTaskModal}
                fetchTodos={fetchTodos}
              />
            </section>
          )}

          {/* update task modal */}

          {showUpdateTaskModal && (
            <section
              className={`fixed top-0 w-full h-full bg-black/80 z-50 flex justify-center items-center`}
            >
              <UpdateTaskModal
                editId={editId}
                todos={todos}
                setShowUpdateTaskModal={setShowUpdateTaskModal}
                showUpdateTaskModal={showUpdateTaskModal}
                fetchTodos={fetchTodos}
              />
            </section>
          )}
    </main>
  );
};

export default Todo;
