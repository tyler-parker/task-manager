import React, {useEffect, useContext} from 'react'
import TaskForm from './TaskForm.js'
import Task from './Task'
import { UserContext } from "../context/UserProvider.js"
import {
    Box,
    Heading,
    Divider,
    Container,
    Grid,
    Flex
} from '@chakra-ui/react'


export default function Profile() {

    const {
        getUserTasks,
        addUserTask,
        tasks
    } = useContext(UserContext)

    useEffect(() => {
        getUserTasks()
    }, [])


    return (
        <Box w='full' justify='center' align='center'>
            <TaskForm addUserTask={addUserTask} />
                <Divider />
                <Container justify='center' align='center' m={5}>
                    <Heading size='xl' >Your Tasks</Heading>
                </Container>
                <Flex direction='row'>
                    {tasks.map(task => <Task {...task} key={task._id} />)}
                </Flex>
        </Box>
    )
}