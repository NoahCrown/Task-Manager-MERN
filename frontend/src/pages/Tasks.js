import React, { useEffect, useState } from 'react';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';
import TaskFilterForm from '../components/TaskFilterForm';
import { useTasksContext } from '../hooks/useTaskContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    sortByDeadline: false,
    sortByPriority: false,
    sortByTags: false,
    sortByCompleted: false,
    tags: '',
    sortAlphabeticalOrder: '',
  });
  const { user } = useAuthContext();
  const { tasks, dispatch } = useTasksContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/task', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TASKS', payload: json });
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (tasks) {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [tasks, filter]);

  const handleAddTask = () => {
    setShowForm((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (tasks) {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setShowFilterForm((prev) => !prev);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    let filtered = tasks;

    if (filterOptions.sortByDeadline) {
      filtered = filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    if (filterOptions.sortByPriority) {
      filtered = filtered.sort((a, b) => a.priority.localeCompare(b.priority));
    }
    if (filterOptions.sortByTags) {
      const enteredTags = filterOptions.tags.split(',').map((tag) => tag.trim().toLowerCase());
      filtered = filtered.filter((task) =>
        enteredTags.some((enteredTag) => task.tags.some((tag) => tag.toLowerCase() === enteredTag))
      );
    }
    if (filterOptions.sortByCompleted) {
      filtered = filtered.filter((task) => !task.completed);
    }

    if (filterOptions.sortAlphabeticalOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filterOptions.sortAlphabeticalOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredTasks(filtered);
    setShowFilterForm(false);
  };

  return (
    <main className="task-page">
      <div className="texts">
        <p>Hello {user.username},</p>
        <h3>Embrace the power of action, for in doing lies the key to achievement.</h3>
      </div>
      <div className="tasks-list">
        <div className="filter-section">
          <form className="filter">
            <input
              type="text"
              name="filter-title"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button onClick={handleSearch}>
              <span className="material-symbols-outlined">search</span>
            </button>
            <button onClick={handleFilter}>
              <span className="material-symbols-outlined">filter_alt</span>
            </button>
          </form>
          <button onClick={handleAddTask} className="add-task">
            Add new task{' '}
            <span className="material-symbols-outlined">
              {!showForm ? 'add_circle' : 'cancel'}
            </span>
          </button>
        </div>
        {showForm && <TaskForm />}
        <div className="tasks-section">
          {showFilterForm ? (
            <TaskFilterForm
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              handleFilterSubmit={handleFilterSubmit}
            />
          ) : (
            <>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => <Task key={task._id} task={task} />)
              ) : tasks ? (
                tasks.map((task) => <Task key={task._id} task={task} />)
              ) : (
                <p>No tasks found.</p>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Tasks;
