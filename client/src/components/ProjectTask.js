import React from 'react'
import { useDrag } from 'react-dnd'
import {
    Box,
    Text,
    useColorModeValue
} from '@chakra-ui/react'

export default function ProjectTask(props) {
    const boxShadow = useColorModeValue('lg', '2xl')
    const { title, priority, status } = props
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'task', 
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging
        }),
      }))

    const colorSwitcher = priority => {
       return priority == 'Low' ? 'blue.300'
            : priority == 'Normal' ? 'yellow.300'
            : 'red.300';
    }

    return (
        <Box
            role={'group'}
            p={6}
            m={2}
            boxShadow={boxShadow}
            bg={colorSwitcher(priority)}
            rounded={'lg'}
            w={'15em'}
            ref={drag}
        >
            <Text fontSize='md'>{title}</Text>
            <Text fontSize='sm'>{status}</Text>
            <Text fontSize='sm'>{priority}</Text>
        </Box>
    )
}
