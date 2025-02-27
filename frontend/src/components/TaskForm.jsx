import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    dueDate: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.name.trim()) {
      alert("Task name is required!");
      return;
    }
    addTask(taskData);
    setTaskData({ name: "", description: "", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={taskData.name}
          id="name"
          onChange={handleChange}
          placeholder="Task Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Due Date: </label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate.toLocaleString()}
          onChange={handleChange}
          id="date"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          id="description"
          placeholder="Task Description"
        />
      </div>
      <button type="submit" className="btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
