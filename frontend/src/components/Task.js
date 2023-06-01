import React from "react";
import { useTasksContext } from "../hooks/useTaskContext";
import { useState, useEffect } from "react";

const Task = ({ task }) => {
  const {dispatch } = useTasksContext();
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);
  const { title, description, priority, deadline, tags } = updatedTask;


  const handleMarkComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed }; // Toggle the opposite of the current 'completed' value

      const response = await fetch(`/api/task/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask), // Send the updatedTask object as the body
      });

      if (response.ok) {
        dispatch({ type: "UPDATE_TASK", payload: updatedTask });
      } else {
        throw new Error("Failed to update task completion status");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      // Send a DELETE request to remove the task from the database
      const response = await fetch(`/api/task/${task._id}`, {
        method: "DELETE",
      });

      console.log(response);
      // Remove the task from the context state
      dispatch({ type: "DELETE_TASK", payload: task });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = () => {
    setEditing(true);
  };

  const handleSaveTask = async () => {
    try {
      const parsedDeadline = new Date(updatedTask.deadline); // Parse the deadline value
      const updatedTaskWithParsedDeadline = { ...updatedTask, deadline: parsedDeadline };
  
      const response = await fetch(`/api/task/${task._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskWithParsedDeadline),
      });
  
      if (response.ok) {
        const updatedTaskData = await response.json();
        dispatch({ type: 'UPDATE_TASK', payload: updatedTaskData });
        setEditing(false);
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'deadline') {
      const formattedDate = new Date(value).toISOString().split('T')[0];
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        [name]: formattedDate,
      }));
    } else {
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };
  
  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case "low":
        return "priority-low";
      case "medium":
        return "priority-medium";
      case "high":
        return "priority-high";
      default:
        return "";
    }
  };

  const taskContainerClasses = `task-container ${getPriorityColorClass(
    task.priority
  )}`;

  const deadlineDate = new Date(task.deadline);
  const formattedDate = deadlineDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={taskContainerClasses}>
      <div className="task-text ">
        {editing ? (
          <>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              className="edit-form edit-title"
            />
            <textarea
              id="description"
              value={description}
              onChange={handleInputChange}
              name="description"
              required
              className="edit-form edit-description"
            ></textarea>
          </>
        ) : (
          <>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </>
        )}
      </div>

      {editing ? (
        <>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={handleInputChange}
            name="deadline"
          />

          <select
            id="priority"
            value={priority}
            onChange={handleInputChange}
            required
            name="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="text"
            id="tags"
            value={tags}
            onChange={handleInputChange}
            required
            name="tags"
          />
        </>
      ) : (
        <>
          <p className="priority">Priority: {task.priority} </p>
          <p className="deadline">Deadline: {formattedDate}</p>
          <div
            className={
              getPriorityColorClass(task.priority) === "priority-high"
                ? "tags-container"
                : "tags-container priority-tags"
            }
          >
            {task.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </>
      )}

      <div className="button-div">
        {editing ? (
          <button className="save-edit" onClick={handleSaveTask}>Save Task <span class="material-symbols-outlined">
add_task
</span></button>
        ) : (
          <button onClick={handleEditTask} className="edit-task">
            Edit Task
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        )}

        <button className="delete-task" onClick={() => handleDeleteTask(task)}>
          Delete task <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
      <button
        onClick={() => handleMarkComplete(task)}
        className="mark-as-complete"
      >
        {task.completed ? "Completed" : "Mark as complete"}{" "}
        <span className="material-symbols-outlined">check_circle</span>
      </button>
    </div>
  );
};

export default Task;
