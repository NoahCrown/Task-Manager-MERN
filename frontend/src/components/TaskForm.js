import React, { useState } from 'react';
import { useTasksContext } from '../hooks/useTaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const {dispatch} = useTasksContext()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      deadline,
      priority,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    const response = await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(response)
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
        setError(null);
        setTitle('')
        setDescription('')
        setPriority('medium')
        setTags('')
        setEmptyFields([])
        dispatch({type: "CREATE_TASK", payload: json})
    }
  };

  return (
    <form  onSubmit={handleSubmit} className='task-form'>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <label htmlFor="deadline">Deadline:</label>
      <input
        type="date"
        id="deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <label htmlFor="priority">Priority:</label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label htmlFor="tags">Tags (comma-separated):</label>
      <input
        type="text"
        id="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        required
      />

      <button type="submit">Add Task <span class="material-symbols-outlined">
add_notes
</span></button>
  {error && <div className='form-error'>{error}</div>}
    </form>
  );
};

export default TaskForm;
