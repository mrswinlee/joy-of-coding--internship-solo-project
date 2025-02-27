import React, { useState } from "react";
import Task from "./Task";
import FilterDropDown from "./FilterDropDown";

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask, updateTask }) => {
  const [filteredStatus, setFilteredStatus] = useState("All");
  const applyFilter = () => {
    console.log("filteredStatus", filteredStatus);

    if (filteredStatus == "Completed") {
      const completedTasks = tasks.filter((task) => task.isCompleted);
      console.log(completedTasks);
      return completedTasks;
    }
    if (filteredStatus == "InProgress") {
      const inComplete = tasks.filter((task) => !task.isCompleted);
      console.log(inComplete);
      return inComplete;
    }
    return [...tasks];
  };
  console.log("test");
  const filteredTasks = applyFilter();
  return (
    <div className="task-list">
      <FilterDropDown setFilteredStatus={setFilteredStatus} />
      <ul>
        {filteredTasks &&
          filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
