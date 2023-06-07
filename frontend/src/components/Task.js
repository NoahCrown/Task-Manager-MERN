import React, { useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);
  const {title, description, deadline, priority, tags } = updatedTask

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/task/${task._id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
  
  
        if (response.ok) {
          const updatedTaskData = await response.json();
          setUpdatedTask(updatedTaskData);
        } else {
          throw new Error("Failed to fetch updated task data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask()

  }, [updatedTask, task._id, user])

  

  const handleMarkComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await fetch(`/api/task/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        dispatch({ type: "UPDATE_TASK", payload: updatedTask });
        toast.success("Task state successfully changed");
      } else {
        toast.error("Failed to update task completion status");
        throw new Error("Failed to update task completion status");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (task) => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(`/api/task/${task._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json()

      dispatch({ type: "DELETE_TASK", payload: json });
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  const handleEditTask = () => {
    if (!user) {
      return;
    }
    setEditing(true);
  };

  const handleSaveTask = async () => {
    if (!user) {
      return;
    }
    try {
      const parsedDeadline = new Date(updatedTask.deadline);
      const updatedTaskWithParsedDeadline = { ...updatedTask, deadline: parsedDeadline };
      const response = await fetch(`/api/task/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedTaskWithParsedDeadline),
      });

      if (response.ok) {
        setEditing(false);
        toast.success("Task edited successfully");
        dispatch({type: "UPDATE_TASK", payload: updatedTaskWithParsedDeadline})
      } else {
        toast.error("Failed to update task, try again later");
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  
const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === 'tags') {
    // Split the comma-separated tags into an array
    const tagsArray = value.split(',');
    // Remove leading and trailing whitespace from each tag
    const trimmedTagsArray = tagsArray.map((tag) => tag.trim());
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: trimmedTagsArray,
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

  let taskContainerClasses = `task-container ${getPriorityColorClass(updatedTask.priority)}`;

  const deadlineDate = new Date(task.deadline);
  const formattedDate = deadlineDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={taskContainerClasses}>
      <div className="task-text">
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
            <h1>{title}</h1>
            <p>{description}</p>
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
          <p className="priority">Priority: {priority}</p>
          <p className="deadline">Deadline: {formattedDate}</p>
          <div
            className={
              getPriorityColorClass(priority) === "priority-high"
                ? "tags-container"
                : "tags-container priority-tags"
            }
          >
            {tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </>
      )}

      <div className="button-div">
        {editing ? (
          <button className="save-edit" onClick={handleSaveTask}>
            Save Task <span className="material-symbols-outlined">add_task</span>
          </button>
        ) : (
          <button onClick={handleEditTask} className="edit-task">
            Edit
            <span className="material-symbols-outlined">edit_note</span>
          </button>
        )}

        <button className="delete-task" onClick={() => handleDeleteTask(task)}>
          Delete <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      <button
        onClick={() => handleMarkComplete(task)}
        className="mark-as-complete"
      >
        {task.completed ? "Completed" : "Mark as complete"}{" "}
        <span className="material-symbols-outlined">check_circle</span>
      </button>
      <ToastContainer />
    </div>
  );
};

export default Task;
