import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../context/UserProvider'
import { CommentContext } from '../context/CommentProvider'
import LoremIpsum from 'react-lorem-ipsum'
import { AiFillEdit, AiFillDelete, AiOutlineUnorderedList } from 'react-icons/ai'
import {
    Box,
    Flex,
    Heading,
    useColorModeValue,
    Divider,
    Grid,
    GridItem,
    Text,
    IconButton,
    Button,
    Textarea,
    Select,
    Avatar
} from '@chakra-ui/react'

export default function TaskPage(props) {
    const { taskId } = useParams()
    const { getUserTask, currentTask } = useContext(UserContext)
    const { title, description, username, createdAt, priority, status } = currentTask
    const { getAllComments, deleteComment, submitComment, comments, taskComment } = useContext(CommentContext)

    const userBgColor = useColorModeValue('gray.600', 'gray.300')
    const boxShadow = useColorModeValue('lg', '2xl')
    const bgColor = useColorModeValue('white', 'gray.700')
    const contentBgColor = useColorModeValue('gray.100', 'gray.900')

    useEffect(() => {
        getUserTask(taskId)
        getAllComments(taskId)
        console.log(comments)
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
            >
                <Flex direction='column' align='center' justify='center'>

                    <Flex align='center' justify='space-around'>
                        <Heading p={3}>{title}</Heading>
                        <IconButton icon={<AiFillEdit />} size='sm' colorScheme='yellow' variant='outline'>Edit Task</IconButton>
                    </Flex>
                    <Flex w='full' justify='center' align='center' p={2}>
                        <Text color={userBgColor}>
                            Created by: {username}
                        </Text>
                    </Flex>
                    <Flex 
                        bgColor={contentBgColor} 
                        border='1px solid gray' 
                        borderRadius='5px' 
                        w={{sm: '95%', md: '85%', lg: '75%', xl: "75%"}} 
                    >
                        <Grid grid-templateRows='repeat(2, 1fr)' w='full'>

                            <GridItem 
                                rowSpan={2} 
                                align='center' 
                                justify='center'
                                p={2}
                            >
                                <Flex p={4} justify='end'>
                                    <Select placeholder={status} w='30%'>

                                    </Select>
                                </Flex>

                                <Flex w='80%' flexDirection='column' p={4}>
                                    <Text fontSize='lg' justifyContent='space-around' align='start' p={2}>
                                        {description}
                                        <LoremIpsum />
                                    </Text>
                                </Flex>
                            <Divider />
                            </GridItem>

                            <GridItem 
                                align='center' 
                                justify='center' 
                            >
                            {
                                comments.map(comment =>
                                    <Flex align='start' justify='start' direction='column' p={4} w='95%'>
                                        <Divider />
                                        <Flex align='center' p={2}>
                                            <Avatar size='sm' name={comment.username} />
                                            <Text pl={4}>{comment.comment}</Text>
                                        </Flex>
                                            <Flex justify='end' align='end' w='95%'>
                                                <IconButton 
                                                    size='sm' 
                                                    variant='outline' 
                                                    colorScheme='yellow' 
                                                    icon={<AiFillEdit />}
                                                />
                                                <IconButton
                                                    ml={4} 
                                                    size='sm' 
                                                    variant='outline' 
                                                    colorScheme='red' 
                                                    icon={<AiFillDelete />}
                                                />
                                            </Flex>
                                    </Flex> 
                                )
                            }
                                <Flex w='95%' flexDirection='column' p={4}>
                                    <Textarea placeholder='Submit your comment here ...'>

                                    </Textarea>
                                </Flex>
                                <Flex w='95%' justify='end' p={4}>
                                    <Button size='sm'>
                                        Submit Comment
                                    </Button>
                                </Flex>
                            </GridItem>

                        </Grid>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}
