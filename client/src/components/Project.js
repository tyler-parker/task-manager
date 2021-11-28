import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import { ProjectContext } from '../context/ProjectProvider'
import { useParams } from 'react-router-dom'

export default function Project(props) {

    const {
        getUserProject,
        currentProject,
        getProjectTasks,
        projectTasks
    } = useContext(ProjectContext)

    const { projectId } = useParams()

    useEffect(() => {
        getUserProject(projectId)
        getProjectTasks(projectId)
        console.log(currentProject)
        console.log(projectTasks)
    }, [])

    return (
        <div>
            <h1>{currentProject.title}</h1>
            <h2>{currentProject.description}</h2>
        </div>
    )
}
