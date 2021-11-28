import React from 'react'
import Task from './Task'
import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

export default function ProjectList(props) {
    const { projects } = props

    return (
        <Box align='center' justify='center'>
                {projects.map(project => 
            <Link to={`project/${project._id}`}>
                <Task {...project} key={project._id} />
            </Link>
                )}
        </Box>
    )
}
