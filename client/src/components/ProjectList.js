import React from 'react'
import Task from './Task'
import { Link } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'

export default function ProjectList(props) {
    const { projects } = props

    return (
        <Flex direction='column-reverse' align='center' justify='center'>
                {projects.map(project => 
                        <Task {...project} key={project._id} />
                )}
        </Flex>
    )
}
