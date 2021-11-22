const express = require('express')
const commentRouter = express.Router()
const Comment = require("../models/Comment.js")


//get comment for a specific issue.
commentRouter.get("/:issueId", (req, res, next) => {
    Comment.find(
        { issueId: req.params.issueId },
        (err, comments) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            res.status(200).send(comments)
        }
    )
})
//comment, userId, username, issueId
commentRouter.post('/:issueId', (req, res, next) => {
    req.body.userId = req.user._id
    req.body.username = req.user.username
    req.body.issueId = req.params.issueId
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
commentRouter.put('/:issueId', (req, res, next) => {
    Comment.findByIdAndUpdate(
        { _id: req.params.issueId, user: req.user._id },
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