const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Task Routes
const taskRoutes = require('./routes/taskRoutes')

const app = express()

// middleware 
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/task', taskRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to MongoDB & listening in port ' + process.env.PORT)
        })
    })
    .catch((error) => console.log(error))