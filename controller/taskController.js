const err= require('../Middleware/errorMW')
const taskModel = require('../model/taskModel')
const userModel = require('../model/userModel')

const createTask = async (req, res) => {
    const {title, details, deadline, category, progress} = req.body
    const userId = req.user.id
    try {
        const newTask = await new taskModel({...req.body, userId })
        await newTask.save()
        res.status(200).json({message: 'Task created successfully', newTask})
    } catch (error) {
        console.log(error);
        
    }
}

const get_All_tasks = async (req,res) => {
    const id = req.body.userId
    try {
        const tasks = await taskModel.find(id)
        if (!tasks) {
            return res.status(400).json({message: "Tasks can't be found"})
        }
        res.json(tasks)
    } catch (error) {
        console.log(error);
        
    }
}

const get_A_task = async (req, res) => {
    const {id} = req.params
    try {
        const task = await taskModel.findById(id)
        if (!task) {
            return res.status(400).json({message: "Task can't be found"})
        }
        res.status(200).json(task)
    } catch (error) {
        console.log(error);
        
    }
}

const updateTask = async (req,res) => {
    const userId = req.user
    const update = req.body
    const {id} = req.params
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
        const taskId = await taskModel.findById(id)
        if (!taskId) {
            return res. status(404).json({message: ' Task not found'})
        }
        if (!userId || !id) {
            return res.status(401).json({message: 'Unauthorized'})
        }
        if (!task.userId || !userId._id) {
            return res.status(403).json({message: 'Task not found'})
        }
        const updatedTask = await new taskModel.findByIdAndUpdate(id, update, {new: true, runValidators: true})
        await updatedTask.save()
        res.json(updatedTask)
    } catch (error) {
        console.log(error);
        
    }

}

const delete_A_Task = async (req, res) => {
    const {id} = req.params
    const reqId = req.user
    try {
        const user = await userModel.findById(reqId)
        const task = await taskModel.findById(id)
        if (!user) {
            return res.json({message: 'User not found'})
        }
        if (!task) {
            return res.json({message: ' Task not found'})
        }
        if (task.userId !== reqId.id ) {
            return res.status(403).json({message: 'Unauthorized action'})
        }
        const deleteTask = await taskModel.findByIdAndDelete(id)
        if (!deleteTask) {
            return res.status(404).json({Message : ' Task not found'})
        }
        return res.status(200).json({message: "Delete successfully"})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {createTask, get_A_task, get_All_tasks, updateTask, delete_A_Task}