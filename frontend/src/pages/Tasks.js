import React from 'react'

const Tasks = () => {
  return (
    <main className='task-page'>
      <div className='texts'>
        <p>Hello Noah,</p>
        <h3>Embrace the power of action, for in doing lies the key to achievement.</h3>
      </div>
      <div className='tasks-list'>
      <button className='add-task'>Add new task <span class="material-symbols-outlined">add_circle</span> </button>
        <div className='task-container'>
          <div className='task-text'>
            <h1>LMS Project</h1>
            <p>Create a Task Manager App using MERN stack and JWT</p>
          </div>
          <p className='deadline'>Deadline: September 12, 2001</p>
          <div className='tags-container'>
            <p>School</p>
            <p>Programming</p>
          </div>
          <div className='button-div'>
          <button className='mark-as-complete'>Mark as complete <span class="material-symbols-outlined">check_circle</span></button>
          <button className='edit-task'>Edit Task<span class="material-symbols-outlined">edit_note</span></button>

          </div>
          


        </div>

      </div>
      
    </main>
  )
}

export default Tasks