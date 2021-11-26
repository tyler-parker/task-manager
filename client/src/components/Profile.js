import React, {useEffect, useContext} from 'react'
import TaskForm from './TaskForm.js'
import Task from './Task'
import { UserContext } from "../context/UserProvider.js"
import {
    Box,
    Heading,
    Divider,
    Container,
    Grid
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
        <Box justify='center' align='center' m={5}>
            <TaskForm addUserIssue={addUserTask} />
                <Divider />
            <Box w='85%'>
                <Container m={5}>
                    <Heading size='xl' >Your Topics</Heading>
                </Container>
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    {tasks.map(task => <Task {...task} key={task._id} />)}
                </Grid>
            </Box>
        </Box>
    )
}