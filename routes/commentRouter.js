const express = require('express')
const commentRouter = express.Router()
const Comment = require("../models/Comment.js")


//get comment for a specific task.
commentRouter.get("/:taskId", (req, res, next) => {
    Comment.find(
        { taskId: req.params.taskId },
        (err, comments) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            res.status(200).send(comments)
        }
    )
})
//comment, userId, username, taskId
commentRouter.post('/:taskId', (req, res, next) => {
    req.body.userId = req.user._id
    req.body.username = req.user.username
    req.body.taskId = req.params.taskId
    const newComment = new Comment(req.body)
    newComment.save(
        (err, comment) => {
            if (err) {
                res.status(500)
                next(err)
            }
            return res.status(201).send(comment)
        }
    )
})
commentRouter.put('/:taskId/:commentId', (req, res, next) => {
    Comment.findByIdAndUpdate(
        { _id: req.params.commentId, user: req.user._id },
        req.body,
        { new: true },
        (err, comment) => {
            if (err) {
                console.log("Error")
                res.status(500)
                return next(err)
            }
            return res.send(comment)
        }
    )
})

commentRouter.get('/:taskId/:commentId', (req, res, next) => {
    Comment.findById(req.params.commentId, (err, project) => {
      if (err) {
        res.status(500)
        return next(err)
      } else if (!project) {
        res.status(404)
        return next(new Error('No comment has been found.'))
      } else {
          return res.status(200).send(project)
      }
    })
  })

commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findByIdAndDelete({
        _id: req.params.commentId,
        user: req.user._id},
        (err, deletedComment) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(deletedComment)
        })
})


module.exports = commentRouter;