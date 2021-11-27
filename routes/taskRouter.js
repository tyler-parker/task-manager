const express = require("express")
const taskRouter = express.Router()
const Task = require('../models/Task.js')

// Get All Tasks
taskRouter.get("/", (req, res, next) => {
  Task.find((err, tasks) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(tasks)
  })
})

//Get user tasks
taskRouter.get('/user', (req, res, next) => {
  Task.find({ user: req.user._id }, (err, tasks) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(tasks)
  })
})

//Get one user task
taskRouter.get("/user/:userId", (req, res, next) => {
  Task.find(
    { user: req.params.userId },
    (err, tasks) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(tasks)
    })
})

//get a task by the id
taskRouter.get('/:taskId', (req, res, next) => {
  Task.findById(req.params.taskId, (err, task) => {
    if (err) {
      res.status(500)
      return next(err)
    } else if (!task) {
      res.status(404)
      return next(new Error('No task has been found.'))
    }
    return res.send(task)
  })
})

taskRouter.get('/project/:projectId', (req, res, next) => {
  Task.find({projectId: req.params.projectId}, (err, tasks) => {
    if (err) {
      res.status(500)
      return next(err)
    } else if (!tasks) {
      res.status(404)
      return next(new Error('No tasks found in your project'))
    }
    return res.send(tasks)
  })
})

// Add new Task
taskRouter.post("/:projectId", (req, res, next) => {
  req.body.user = req.user._id
  req.body.projectId = req.params.projectId
  const newTask = new Task(req.body)
  newTask.save((err, savedTask) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedTask)
  })
})

// Delete Task
taskRouter.delete("/:taskId", (req, res, next) => {
  Task.findOneAndDelete(
    { _id: req.params.taskId, user: req.user._id },
    (err, deletedTask) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted task: ${deletedTask.title}`)
    }
  )
})

// Update Task 
taskRouter.put("/:taskId", (req, res, next) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskId, user: req.user._id },
    req.body,
    { new: true },
    (err, updatedTask) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedTask)
    }
  )
})

module.exports = taskRouter;