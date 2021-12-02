import React, { useState } from "react"
import axios from "axios"

const CommentContext = React.createContext()


const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function CommentProvider(props) {

    const [comments, setComments] = useState([])
    const [taskComment, setTaskComment] = useState("")

    function getAllComments(taskId) {
        userAxios.get(`/api/comment/${taskId}`)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err))
    }
    
    function deleteComment(commentId) {
        userAxios.delete(`/api/comment/${commentId}`)
            .then(res => setComments(prevState => prevState.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err))
            getAllComments()
    }
  
    function submitComment(newComment, taskId) {
        userAxios.post(`/api/comment/${taskId}`, newComment)
            .then(res => setComments(prevState => prevState, res.data ))
            .catch(err => console.log(err))
            setTaskComment("")
            getAllComments()
    }

    return (
        <CommentContext.Provider
            value={{
                getAllComments,
                deleteComment,
                submitComment,
                taskComment,
                comments
            }}>

            {props.children}
        </CommentContext.Provider>
    )
}

export { CommentContext, CommentProvider }