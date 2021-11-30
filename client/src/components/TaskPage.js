import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../context/UserProvider'
import {
    Box,
    Flex,
    Heading,
    useColorModeValue,
    Divider,
    Grid
} from '@chakra-ui/react'

export default function TaskPage(props) {
    const { getUserTask, currentTask } = useContext(UserContext)
    const { title, description, username, createdAt, priority, status } = currentTask
    const { taskId } = useParams()
    const boxShadow = useColorModeValue('lg', '2xl')
    const bgColor = useColorModeValue('white', 'gray.700')
    const contentBgColor = useColorModeValue('gray.100', 'gray.900')

    useEffect(() => {
        getUserTask(taskId)
        console.log(taskId)
        console.log(currentTask)
        console.log(title)
    }, [])

    return (
        <Flex align='center' justify='center' >
            <Box 
                role={'group'}
                p={6}
                m={6}
                boxShadow={boxShadow}
                rounded={'lg'}
                bg={bgColor}
                w={'90%'}
                h='80vh'
            >
                <Flex direction='column' align='center' justify='center'>
                    <Heading>{title}</Heading>
                    <Flex mt={4} w='75%'>
                        <Divider />
                    </Flex>
                    <Flex bgColor={contentBgColor} border='1px solid gray' borderRadius='5px' w='75%' h='70vh'>

                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}
