import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Search from "./components/Search";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const searchResults = tasks.filter((task) => {
    return (
      task.name.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase())
    );
  });
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8001/task");
      const data = await response.json();
      console.log("fetched task", data);
      setTasks(
        data.map((task) => {
          task.isCompleted = task.isCompleted === 0 ? false : true;
          return task;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    const taskAdd = { ...task, isCompleted: false };
    const response = await fetch("http://localhost:8001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskAdd),
    });
    fetchTasks();
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        setTasks(tasks.filter((task) => task.id !== id));
        console.log("Task Deleted!");
      }
      fetchTasks();
    } catch (error) {
      console.log("Failed to delete the task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`http://localhost:8001/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (response) {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        );
      }
    } catch (error) {
      console.log("Error updating task: ", error);
    }
  };

  // FILTER TASK

  return (
    <div className="task-management">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <Search query={query} setQuery={setQuery} />
      <TaskList
        tasks={searchResults}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </div>
  );
};

export default App;
