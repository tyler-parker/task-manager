import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../context/UserProvider'
import { CommentContext } from '../../context/CommentProvider'
import EditForm from '../Task/EditTaskForm'
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

const initInputs = { comment: '' }

export default function TaskPage(props) {
    const { taskId } = useParams()

    const { getUserTask, currentTask, user: { username } } = useContext(UserContext)
    const { title, description, createdAt, priority, status } = currentTask

    const { getAllComments, deleteComment, submitComment, comments, taskComment, _id } = useContext(CommentContext)

    const userBgColor = useColorModeValue('gray.600', 'gray.300')
    const boxShadow = useColorModeValue('lg', '2xl')
    const bgColor = useColorModeValue('white', 'gray.700')
    const contentBgColor = useColorModeValue('gray.100', 'gray.900')
    const lowColor = useColorModeValue('blue.300', 'blue.600')
    const normalColor = useColorModeValue('yellow.300', 'yellow.600')
    const highColor = useColorModeValue('red.300', 'red.600')

    const statusOptions = ['Backlogged', 'In Progress', 'Testing', 'Approved', 'Completed']

    const priorityColorSwitcher = priority => {
        return priority == 'Low' ? lowColor
             : priority == 'Normal' ? normalColor
             : highColor;
     }

    useEffect(() => {
        getUserTask(taskId)
        console.log(comments)
        console.log(taskId)
        console.log(currentTask)
    }, [taskId])

    useEffect(() => {
        getAllComments(taskId)
    }, [])

    const [toggle, setToggle] = useState(false)
    const [taskToggle, setTaskToggle] = useState(false)
    const [inputs, setInputs] = useState(initInputs)
    const { comment } = inputs

    const handleToggle = () => {setToggle(!toggle)}
    const taskEditToggle = () => {setTaskToggle(!taskToggle)}

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
        console.log(inputs)
    }


    function handleSubmit(e){
        e.preventDefault()
        submitComment(inputs, taskId)
        getAllComments(taskId)
        setInputs(initInputs)
        console.log(inputs)
    }

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
                { !taskToggle ?
                    <>
                    <Flex direction='column' align='center' justify='center'>

                    <Flex align='center' justify='space-around'>
                        <Flex 
                            bgColor={priorityColorSwitcher(priority)} 
                            p={1} 
                            borderRadius='5px'
                            >
                            {priority}
                        </Flex>
                        <Heading p={3}>{title}</Heading>
                        <IconButton onClick={taskEditToggle} icon={<AiFillEdit />} size='sm' variant='outline' />
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
                                        {statusOptions.map(status => <option>{status}</option>)}
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
                                comments.map(commentObj =>
                                    <Flex align='start' justify='start' direction='column' p={4} w='95%'>
                                        <Divider />
                                        { !toggle ? 
                                        <>
                                            <Flex align='center' p={2}>
                                                <Avatar size='sm' name={commentObj.username} />
                                                <Text pl={4}>{commentObj.comment}</Text>
                                            </Flex>
                                            <Flex justify='end' align='end' w='95%'>
                                                <IconButton 
                                                    size='sm' 
                                                    variant='outline' 
                                                    colorScheme='yellow' 
                                                    icon={<AiFillEdit />}
                                                    onClick={handleToggle}
                                                    />
                                                <IconButton
                                                    ml={4} 
                                                    size='sm' 
                                                    variant='outline' 
                                                    colorScheme='red' 
                                                    icon={<AiFillDelete />}
                                                    onClick={() => deleteComment(commentObj._id)}
                                                    />
                                            </Flex>
                                        </>
                                            :
                                        <>
                                            <Flex w='95%' flexDirection='column' p={4}>
                                                <Textarea
                                                    onChange={handleChange} 
                                                    name='comment' 
                                                    value={inputs.comment} 
                                                    placeholder={commentObj.comment} 
                                                    >

                                                </Textarea>
                                            </Flex>
                                            <Flex w='95%' justify='end' >
                                                <Button variant='outline' colorScheme='yellow' size='sm'>
                                                    Submit Comment
                                                </Button>
                                                <Button
                                                    ml={4} 
                                                    onClick={handleToggle}  
                                                    size='sm'
                                                    >
                                                    Close
                                                </Button>
                                            </Flex>
                                        </>
                                        }
                                    </Flex> 
                                )
                            }
                                <Flex w='95%' flexDirection='column' p={4}>
                                    <Textarea 
                                        placeholder='Submit your comment here ...'
                                        onChange={handleChange} 
                                        name='comment' 
                                        value={comment}
                                        >

                                    </Textarea>
                                </Flex>
                                <Flex w='95%' justify='end' p={4}>
                                    <Button onClick={handleSubmit} colorScheme='blue' size='md'>
                                        Submit Comment
                                    </Button>
                                </Flex>
                            </GridItem>

                        </Grid>
                    </Flex>
                </Flex>
                </>
                :
                <EditForm 
                    setEditToggle={taskEditToggle}
                    isTask={true} 
                />
            }
            </Box>
        </Flex>
    )
}
