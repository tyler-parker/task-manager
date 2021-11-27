import React, { useState } from "react"
import axios from "axios"

const ProjectContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function ProjectProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        projects: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [allProjects, setAllProjects] = useState([])
    const [project, setProject] = useState()
    const [userProjects, setUserProjects] = useState()

    function getAllUserProjects() {
        userAxios.get("/api/project")
            .then(res => setAllProjects(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserProjects() {
        userAxios.get('/api/project/user')
            .then(res => setUserProjects(res.data))
            .catch(err => console.log(err))
    }

    function getUserProject() {
        userAxios.get('/api/project/user/:projectId')
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }

    function addUserProject(newProject) {
        userAxios.post('/api/project', newProject)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                projects: [...prevState.projects, res.data]
            }))
        })
        .catch(err => console.log(err))
    }

    function editUserProject(editedProject, projectId) {
        userAxios.put(`/api/project/${projectId}`, editedProject)
            .then(res => setUserState(prevState => ({
                ...prevState,
                projects: prevState.projects.map(project => project._id !== projectId ? project : res.data)
            })))
            .catch(err => console.log(err))
    }

    function deleteUserProject(projectId) {
        userAxios.delete(`/api/project/${projectId}`)
            .then(res => setUserState(prevState => ({
                ...prevState,
                projects: prevState.projects.filter(project => project._id !== projectId)
            })))
            .catch(err => console.log(err))
            return getAllUserProjects()
    }

    return (
        <ProjectContext.Provider
            value={{
                ...userState,
                getAllUserProjects,
                getUserProject,
                getUserProjects,
                addUserProject,
                editUserProject,
                deleteUserProject,
                allProjects,
                userProjects,
                project,
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export { ProjectContext, ProjectProvider }