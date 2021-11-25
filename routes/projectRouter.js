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