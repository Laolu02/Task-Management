const {Router} = require('express')
const { createTask, get_All_tasks, get_A_task, updateTask, delete_A_Task } = require('../controller/taskController')
const authMW = require('../Middleware/authMW')

const router= Router()
    .post('/task',authMW, createTask)
    .get('/tasks', get_All_tasks)
    .get('/task/:id', get_A_task)
    .put('/task/:id', authMW, updateTask)
    .delete('task/:id',authMW, delete_A_Task)

module.exports = router    