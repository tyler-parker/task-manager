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
    const [issueComment, setIssueComment] = useState("")

   
    function getAllComments(_id) {
        userAxios.get(`/api/comment`)
        .then(res => {
            setComments(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
    
    function deleteComment(commentId) {
        userAxios.delete(`/api/comment/${commentId}`)
            .then(res => setComments(prevState => prevState.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err))
            getAllComments()
    }
  
    function submitComment(newComment, issueId) {
        userAxios.post(`/api/comment/${issueId}`, newComment)
            .then(res => {
                setComments(prevState => [...prevState, res.data])
            })
            .catch(err => console.log(err))
        setIssueComment("")
        getAllComments()
    }

    return (
        <CommentContext.Provider
            value={{
                getAllComments,
                deleteComment,
                submitComment
            }}>

            {props.children}
        </CommentContext.Provider>
    )
}

export { CommentContext, CommentProvider }