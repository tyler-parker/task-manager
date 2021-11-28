import React from 'react'
import Task from './Task.js'
import { Container } from '@chakra-ui/react'

export default function TaskList(props) {
    const { tasks } = props
    return (
        <Container align='center' justifyItems='center'>
            {tasks.map(task => <Task {...task} key={task._id} />)}
        </Container>
    )
}