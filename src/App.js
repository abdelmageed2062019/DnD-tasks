import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Todo from "./components/Todo";
import uuid from "react-uuid";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToComplted(
        item.id,
        item.projectName,
        item.taskDesc,
        item.timestamp,
        item.duration
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToComplted = (id, projectName, taskDesc, duration, timestamp) => {
    const movetask = taskList.filter((task) => id === task.id);
    setCompleted((completed) => [
      ...completed,
      {
        movetask,
        projectName,
        taskDesc,
        timestamp,
        duration,
      },
    ]);
  };

  useEffect(() => {
    let array = localStorage.getItem("taskList");

    if (array) {
      setTaskList(JSON.parse(array));
    }
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold py-4 pl-6">The Task Tracker </h1>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Hi There!</p>
        <p className="text-xl pl-6"> Click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl py-2"> to add a new task</p>
      </div>
      <div className="flex flex-row">
        <div className="w-full">
          <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg px-2 py-2 my-4 bg-gray-300">
            To Do:
          </h2>
          <div className="ml-6 flex flex-col-reverse">
            {taskList
              .slice(0)
              .reverse()
              .map((task, i) => (
                <Todo
                  key={uuid()}
                  task={task}
                  index={i}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              ))}
          </div>
        </div>
        <div className="w-full flex flex-col" ref={drop}>
          <h2 className="text-xl font-semibold w-3/4 max-w-lg px-2 py-2 my-4 bg-gray-300">
            Completed:
          </h2>
          {completed
            .slice(0)
            .reverse()
            .map((task, i) => (
              <Todo
                key={uuid()}
                task={task}
                index={i}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
