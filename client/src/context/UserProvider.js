import React, { useState } from "react"
import axios from "axios"

const UserContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        tasks: [],
        comment: [],
        currentTask: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [allTasks, setAllTasks] = useState([])
    const [foundUser, setFoundUser] = useState()

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }
    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getUserTasks()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }
    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: "",
            tasks: [],
            currentTask: [],
            comment: []
        })
    }
    function handleAuthError(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function getUser(userId) {
        userAxios.get(`/api/users/${userId}`)
            .then(res => setFoundUser(res.data))
            .catch(err => console.log(err))
    }

    function getAllUserTasks() {
        userAxios.get("/api/task")
            .then(res => setAllTasks(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserTask(taskId) {
        userAxios.get(`/api/task/${taskId}`)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    currentTask: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    function getUserTasks() {
        userAxios.get('/api/task/user')
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    tasks: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    function addUserTask(newTask, projectId) {
        userAxios.post(`/api/task/${projectId}`, newTask)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    tasks: [...prevState.tasks, res.data]
                }))
            })
            .catch(err => console.log(err))
    }

    function editUserTask(newTask, taskId) {
        userAxios.put(`/api/task/${taskId}`, newTask)
            .then(res => setUserState(prevState => ({
                ...prevState,
                tasks: prevState.tasks.map(task => task._id !== taskId ? task : res.data)
            })))
    }

    function deleteUserTask(taskId) {
        userAxios.delete(`/api/task/${taskId}`)
            .then(res => setUserState(prevState => ({
                ...prevState,
                tasks: prevState.tasks.filter(task => task._id !== taskId)
            })))
            .catch(err => console.log(err)
            )
        return getUserTasks()
    }

    return (
        <UserContext.Provider
            value={{
                ...userState,
                foundUser,
                signup,
                login,
                logout,
                getUser,
                getAllUserTasks,
                addUserTask,
                getUserTasks,
                getUserTask,
                editUserTask,
                deleteUserTask
            }}>

            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }