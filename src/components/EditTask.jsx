import { useState, useEffect } from "react";
const EditTask = ({ task, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDesc(task.taskDesc);
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") setProjectName(value);
    if (name === "taskDesc") setTaskDesc(value);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName: projectName,
      taskDesc: taskDesc,
      timestamp: task.timestamp,
      duration: task.duration,
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
    setEditModal(false);
  };

  return (
    <>
      <button
        className="bg-gray-400 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded-lg"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal ? (
        <div
          className="flex items-center justify-center
          overflow-x-hidden overflow-y-auto  fixed inset-0 z-100"
        >
          <div className="w-9/12 bg-white border rounded-lg shadow-md relative flex flex-col max-w-lg">
            <div className="flex flex-row justify-between p-5 border bg-white border-b border-slate-200 rounded-t">
              <h3 className="bg-white text-3xl font-semibold ">Edit Task</h3>
              <button
                className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                onClick={() => setEditModal(false)}
              >
                X
              </button>
            </div>
            <form className="p-6">
              <div>
                <label
                  className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                  htmlFor="project-name"
                >
                  Project name
                </label>
                <input
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  id="project-name"
                  name="projectName"
                  value={projectName}
                  onChange={handleInputs}
                  type="text"
                  placeholder="Project Name"
                  required
                />
              </div>
              <div>
                <label
                  className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2"
                  htmlFor="task-dec"
                >
                  Task Description
                </label>
                <textarea
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  id="task-dec"
                  name="taskDesc"
                  value={taskDesc}
                  onChange={handleInputs}
                  type="text"
                  rows="4"
                  placeholder="Task Description"
                  required
                />
              </div>
            </form>
            <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
              <button
                className="bg-blue-800 text-white uppercase text-sm font-semibold px-6 py-3 rounded hover:opacity-70"
                onClick={handleEdit}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditTask;
