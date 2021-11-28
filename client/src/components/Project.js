import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import { ProjectContext } from '../context/ProjectProvider'
import { useParams } from 'react-router-dom'

export default function Project(props) {

    const {
        getUserProject,
        currentProject
    } = useContext(ProjectContext)

    const { projectId } = useParams()

    useEffect(() => {
        console.log(currentProject)
        getUserProject(projectId)

    }, [])

    return (
        <div>
            <h1>{currentProject.title}</h1>
            <h2>{currentProject.description}</h2>
        </div>
    )
}
