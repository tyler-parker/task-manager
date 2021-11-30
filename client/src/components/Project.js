import React, { useContext, useEffect, useState } from 'react'
import ProjectTask from './ProjectTask'
import TaskModal from './TaskModal'
import { ProjectContext } from '../context/ProjectProvider'
import { UserContext } from '../context/UserProvider'
import { useParams } from 'react-router-dom'
import { useDrop } from 'react-dnd'
import {
    Stack,
    useColorModeValue,
    Divider,
    Heading,
    Grid,
    Flex,
} from '@chakra-ui/react'

export default function Project(props) {

    // Setting up the react-dnd system -- currently not working
    const [board, setBoard] = useState([])
    const boardBg = useColorModeValue('gray.200', 'gray.600')
    
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addTaskToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))
    
    // adding a task to a board
    const addTaskToBoard = id => {
        console.log(id)
        console.log(board)
        const taskList = projectTasks.filter(task => id === task._id)
        setBoard(board => [...board, taskList[0]])
        console.log(taskList)
        console.log(drop)
    }
    
    const {
        getUserProject,
        getProjectTasks,
        currentProject,
        projectTasks
    } = useContext(ProjectContext)

    const {
        addUserTask
    } = useContext(UserContext)
    
    const { projectId } = useParams()
    
    useEffect(() => {
        getUserProject(projectId)
        getProjectTasks(projectId)
        console.log(currentProject)
        console.log(projectTasks)
    }, [projectTasks])

    const formattedDate = new Date(currentProject.createdAt).toDateString()

    return (
        <>
                <Grid gridTemplateColumns={{sm: '1fr',md: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)'}} m={6}>
                    <Stack>
                        <Heading size='xl'>{currentProject.title}</Heading>
                        <Heading size='large'>{currentProject.description}</Heading>
                    </Stack>
                    <Flex align='center' justify='center'>
                        <TaskModal addUserTask={addUserTask} projectId={projectId} />
                    </Flex>
                        <Flex direction='column' align='end'>
                            <Heading fontSize={{sm: 'sm', md: 'sm', lg: 'md', xl: 'md'}}>
                                Created by: {currentProject.username}
                            </Heading>
                            <Heading size='sm'>
                                {formattedDate}
                            </Heading>
                        </Flex>
                </Grid>
                <Divider />
                <Grid align='center' templateColumns={{sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(4, 1fr)'}} gap={6} m={4}>
                    <Flex ref={drop} bg={boardBg} direction='column' border='3px solid gray' borderRadius='20px' align='center'>
                        <Heading size='md' p={4}>Backlogged</Heading>
                        <Divider />
                        {
                            projectTasks.map(task => task.status == 'Backlogged' ? <ProjectTask {...task} key={task._id} /> : <></>)
                        }
                    </Flex>
                    <Flex bg={boardBg} direction='column' border='3px solid gray' borderRadius='20px' align='center'>
                        <Heading size='md' p={4}>In-Progress</Heading>
                        <Divider />
                        {
                            projectTasks.map(task => task.status == 'In Progress' ? <ProjectTask {...task} key={task._id} /> : <></>)
                        }
                    </Flex>
                    <Flex bg={boardBg} direction='column' border='3px solid gray' borderRadius='20px' align='center'>
                        <Heading size='md' p={4}>Testing</Heading>
                        <Divider />
                        {
                            projectTasks.map(task => task.status == 'Testing' ? <ProjectTask {...task} key={task._id} /> : <></>)
                        }
                    </Flex>
                    <Flex bg={boardBg} direction='column' border='3px solid gray' borderRadius='20px' align='center'>
                        <Heading size='md' p={4}>Completed</Heading>
                        <Divider />
                        {
                            projectTasks.map(task => task.status == 'Completed' ? <ProjectTask {...task} key={task._id} /> : <></>)
                        }
                    </Flex>
                </Grid>
        </>
    )
}
