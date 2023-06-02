const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

// Task Controller
const { getTasks, getTask, createTask, deleteTask, updateTask } = require('../controller/taskController');

router.use(requireAuth);

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Retrieve all tasks
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/', getTasks);

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Retrieve a single task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the task
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/:id', getTask);

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     parameters:
 *       - in: body
 *         name: task
 *         description: The task object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             deadline:
 *               type: string
 *               format: date-time
 *             completed:
 *               type: boolean
 *               default: false
 *             priority:
 *               type: string
 *               enum: ['low', 'medium', 'high']
 *               default: medium
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *               default: []
 *             user_id:
 *               type: string
 *     responses:
 *       '201':
 *         description: Created
 */

router.post('/', createTask);

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the task
 *         required: true
 *         type: string
 *     responses:
 *       '204':
 *         description: No Content
 */
router.delete('/:id', deleteTask);

/**
 * @swagger
 * /api/task/{id}:
 *   patch:
 *     summary: Update a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the task
 *         required: true
 *         type: string
 *       - in: body
 *         name: task
 *         description: The updated task object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       '200':
 *         description: OK
 */
router.patch('/:id', updateTask);

module.exports = router;
