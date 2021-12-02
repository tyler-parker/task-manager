import React from 'react'
import { useDrag } from 'react-dnd'
import { Link } from 'react-router-dom'
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
    const { title, priority, _id } = props

    // setting up the 'drag' system from react-dnd -- currently not working
    const [{isDragging}, drag] = useDrag((id, status) => ({
        type: 'task',
        item: {id: _id}, 
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging
        }),
      }))

    // changing the bg color of a task card based on priority
    const colorSwitcher = priority => {
       return priority == 'Low' ? lowColor
            : priority == 'Normal' ? normalColor
            : highColor;
    }

    return (
        <Box
            role={'group'}
            p={5}
            m={2}
            boxShadow={boxShadow}
            bg={colorSwitcher(priority)}
            rounded={'lg'}
            w={{sm: '90%', md: '20em', lg: '15em', xl: '90%'}}
            ref={drag}
        >
            <Link to={`/tasks/${_id}`}>
                <Text fontSize='lg'>{title}</Text>
            </Link>
        </Box>
    )
}
