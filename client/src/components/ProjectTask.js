import React from 'react'
import { useDrag } from 'react-dnd'
import {
    Box,
    Text,
    useColorModeValue
} from '@chakra-ui/react'

export default function ProjectTask(props) {
    const boxShadow = useColorModeValue('lg', '2xl')
    const lowColor = useColorModeValue('blue.300', 'blue.600')
    const normalColor = useColorModeValue('yellow.300', 'yellow.600')
    const highColor = useColorModeValue('red.300', 'red.600')
    const { title, priority, status } = props
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'task', 
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging
        }),
      }))

    const colorSwitcher = priority => {
       return priority == 'Low' ? lowColor
            : priority == 'Normal' ? normalColor
            : highColor;
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
