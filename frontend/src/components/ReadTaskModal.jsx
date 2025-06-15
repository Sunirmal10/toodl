import { useEffect } from "react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";

const ReadTaskModal = ({
  setShowReadTaskModal,
  viewId,
  todos,
  setShowUpdateTaskModal,
  setEditId,
}) => {
  const toBeEditedTask = todos.find((todo) => todo._id === viewId);
  const [editFormData, setEditFormData] = useState({
    id: toBeEditedTask?._id || "",
    todo: toBeEditedTask?.todo || "",
    status: toBeEditedTask?.status || "",
  });

  useEffect(() => {
    setEditFormData({
      id: toBeEditedTask?._id || "",
      todo: toBeEditedTask?.todo || "",
      status: toBeEditedTask?.status || "",
    });
  }, [toBeEditedTask]);

  return (
    <div className="flex flex-col gap-2 w-full max-w-[20rem] bg-white mx-4 rounded-md sm:rounded-lg shadow-md p-4 relative">
      <h3 className="font-semibold">Task</h3>

      {/* Status  */}

      <span
        className={`rounded-2xl absolute top-4.25 left-14 text-[10px] px-2 py-1 w-fit sm:text-xs opacity-80 scale-85 font-semibold ${
          editFormData.status === "pending"
            ? "bg-red-300/80 text-red-600/80"
            : editFormData.status === "running"
            ? "bg-orange-300/80 text-orange-600/80"
            : editFormData.status === "done"
            ? "bg-green-300/80 text-green-600"
            : "bg-gray-300"
        }`}
        title={"Status: " + editFormData.status}
      >
        {editFormData.status.charAt(0).toUpperCase() +
          editFormData.status.slice(1)}
      </span>

      <div className="overflow-y-auto overflow-x-hidden h-[20rem] p-2 mb-1 break-words whitespace-normal rounded-sm border border-gray-300/80">
        {editFormData.todo}
      </div>

      {/* edit task button */}
      <button
        className="flex justify-center items-center absolute top-4.5 right-10.5 w-5 h-5 rounded-full bg-transparent text-gray-400 hover:bg-gray-200 hover:scale-[1.2] active:scale-90 cursor-pointer"
        onClick={() => {
          setShowReadTaskModal(false);
          setShowUpdateTaskModal(true);
          setEditId(editFormData.id);
        }}
        title="Edit"
      >
        <MdEdit />
      </button>

      {/* Close Button  */}

      <button
        className="flex justify-center items-center absolute top-4.5 right-3.5 w-5 h-5 rounded-full bg-transparent hover:bg-gray-200 hover:scale-[1.2] active:scale-90 cursor-pointer"
        title="Close"
        onClick={() => setShowReadTaskModal(false)}
      >
        <IoMdClose />
      </button>
    </div>
  );
};

export default ReadTaskModal;
