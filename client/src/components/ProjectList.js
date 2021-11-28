import React from 'react'
import Task from './Task'
import { Box } from '@chakra-ui/react'

export default function ProjectList(props) {
    const { projects } = props

    return (
        <Box align='center' justify='center'>
            {projects.map(project => <Task {...project} key={project._id} />)}
        </Box>
    )
}
