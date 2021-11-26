const express = require("express")
const projectRouter = express.Router()
const Project = require('../models/Project')

projectRouter.get('/', (req, res, next) => {
    Project.find((err, tasks) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(tasks)
    })
})

projectRouter.get('/user', (req, res, next) => {
    Project.find({ user: req.user._id }, (err, projects) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(projects)
    })
})

projectRouter.get('/user/:userId', (req, res, next) => {
    Project.find(
        { user: req.params.userId },
        (err, projects) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(projects)
        }
    )
})

projectRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const newProject = new Project(req.body)
    newProject.save((err, savedProject) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedProject)
    })
})

projectRouter.put('/:projectId', (req, res, next) => {
    Project.findOneAndUpdate(
        { _id: req.params.projectId, user: req.user._id },
        req.body,
        { new: true },
        (err, updatedProject) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedProject)
        }
    )
})

projectRouter.delete('/:projectId', (req, res, next) => {
    Project.findOneAndDelete(
        { _id: req.params.projectId, user: req.user._id },
        (err, deletedProject) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted project: ${deletedProject.title}`)
        }
    )
})

module.exports = projectRouter