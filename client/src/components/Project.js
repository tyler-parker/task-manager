import React, { useContext, useEffect } from 'react'
import Task from './Task'
import ProjectTask from './ProjectTask'
import { ProjectContext } from '../context/ProjectProvider'
import { useParams } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
    Box,
    Text,
    Divider,
    Heading,
    Grid,
    Flex
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
                <Box m={6}>
                    <Heading size='xl'>{currentProject.title}</Heading>
                    <Heading size='large'>{currentProject.description}</Heading>
                </Box>
                <Divider />
                <Flex direction='column'>
                    {
                        projectTasks.map(task => <ProjectTask {...task} key={task._id} />)
                    }
                </Flex>
        </>
    )
}
