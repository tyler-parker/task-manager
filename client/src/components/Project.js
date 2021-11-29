import React, { useContext, useEffect } from 'react'
import Task from './Task'
import { ProjectContext } from '../context/ProjectProvider'
import { useParams } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
    Box,
    Text,
    Divider
} from '@chakra-ui/react'

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
        <>
                <Box>
                    <h1>{currentProject.title}</h1>
                    <h2>{currentProject.description}</h2>
                </Box>
                <Divider />
                {
                    projectTasks.map(task => <Task {...task} key={task._id} />)
                }
        </>
    )
}
