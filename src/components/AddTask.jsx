import { useState } from "react";

const AddTask = ({ taskList, setTaskList }) => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      setProjectName(value);
      setErrorMessage("");
    }
    if (name === "projectName" && value === "") {
      setErrorMessage("Please add project name");
    }
    if (name === "taskDesc") setTaskDesc(value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!projectName) {
      setErrorMessage("Please add project name");
    } else {
      let timestamp = new Date().getTime();
      let tempList = taskList;
      tempList.push({
        projectName,
        taskDesc,
        timestamp: timestamp,
        duration: 0,
      });

      localStorage.setItem("taskList", JSON.stringify(tempList));
      window.location.reload();
      // setTaskList([
      //   ...taskList,
      //   { projectName, taskDesc, timestamp: timestamp },
      // ]);
      setShowModal(false);
      setProjectName("");
      setTaskDesc("");
    }
  };

  return (
    <>
      <button
        className="bg-blue-800 text-white uppercase text-sm font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70"
        onClick={() => setShowModal(true)}
      >
        +New
      </button>
      {showModal ? (
        <>
          <div
            className="flex items-center justify-center
            overflow-x-hidden overflow-y-auto  fixed inset-0 z-100"
          >
            <div className="w-9/12 bg-white border rounded-lg shadow-md relative flex flex-col max-w-lg">
              <div className="flex flex-row justify-between p-5 border bg-white border-b border-slate-200 rounded-t">
                <h3 className="bg-white text-3xl font-semibold ">
                  Add New Task
                </h3>
                <button
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                  onClick={() => setShowModal(false)}
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
                  <p className="text-red-500 text-center mt-2 mb-5 ">
                    {errorMessage}
                  </p>
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
                  onClick={handleAddTask}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddTask;
