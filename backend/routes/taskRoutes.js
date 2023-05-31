const express = require('express')
const router = express.Router()

// Task Controller
const {getTasks, getTask, createTask, deleteTask, updateTask} = require('../controller/taskController')

// GET all task
router.get('/', getTasks )

// GEt a single task
router.get('/:id', getTask)

// POST a new task
router.post('/', createTask)

// DELETE a task
router.delete('/:id', deleteTask)

// UPDATE a task
router.patch('/:id', updateTask)

module.exports = router;