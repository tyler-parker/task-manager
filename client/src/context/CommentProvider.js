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
    const [singleComment, setSingleComment] = useState()

    function getAllComments(taskId) {
        userAxios.get(`/api/comment/${taskId}`)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err))
    }

    function getSingleComment(taskId, commentId) {
        userAxios.get(`/api/comment/${taskId}/${commentId}`)
            .then(res => setSingleComment(res.data))
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
    }

    function editComment(editedComment, taskId, commentId) {
        userAxios.put(`/api/comment/${taskId}/${commentId}`, editedComment)
            .then(res => setComments(prevState => prevState, res.data ))
            .catch(err => console.log(err))
    }

    return (
        <CommentContext.Provider
            value={{
                getAllComments,
                deleteComment,
                submitComment,
                editComment,
                getSingleComment,
                singleComment,
                comments
            }}>

            {props.children}
        </CommentContext.Provider>
    )
}

export { CommentContext, CommentProvider }