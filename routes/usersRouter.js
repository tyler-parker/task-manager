const express = require('express')
const userRouter = express.Router()
const User = require('../models/User.js')

//Get All User
userRouter.get("/", (req, res, next) => {
    User.find(
        {},
        (err, users) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(users)
        })
    
})

userRouter.get(`/:userId`, (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
          } else if (!user) {
            res.status(404)
            return next(new Error('No user has been found.'))
          } else {
              return res.status(200).send(user)
          }
    })
})

module.exports = userRouter