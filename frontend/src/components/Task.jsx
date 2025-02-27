import React, { useState } from "react";

const Task = ({ task, toggleTaskCompletion, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    description: task.description,
    dueDate: task.dueDate,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const formatDate = (datePassed, format) => {
    const date = new Date(datePassed);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    const formatParts = {
      dd: day,
      mm: month,
      yyyy: year,
      yy: year.toString().slice(-2),
    };

    let formattedDate = format;
    for (const part in formatParts) {
      formattedDate = formattedDate.replace(part, formatParts[part]);
    }
    return formattedDate;
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="task-form update-form">
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={editedTask.name}
              onChange={handleEditChange}
              placeholder="Task Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Due Date: </label>
            <input
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleEditChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description: </label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleEditChange}
              placeholder="Task Description"
            />
          </div>
          <div class="buttons">
            <button type="submit" className="btn-primary">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            {task.name}
          </h3>
          <p>{task.description}</p>
          <p>Due: {formatDate(task?.dueDate, "dd/mm/yyyy") || "No due date"}</p>
          <div className="buttons">
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn-danger" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;
