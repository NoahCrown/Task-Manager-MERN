const express = require('express')
const router = express.Router()

// controller functions
const {loginUser, signupUser} = require ('../controller/userController.js')

// login route
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     description: User login
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.post('/login', loginUser)

// sign up route
/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     description: User signup
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.post('/signup', signupUser)

module.exports = router