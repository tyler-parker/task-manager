import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserProvider'
import { CommentContext } from '../../context/CommentProvider'
import { useParams } from 'react-router'
import EditForm from '../Task/EditTaskForm'
import EditTaskComment from '../comment/EditTaskComment'
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
    Avatar,
    Badge
} from '@chakra-ui/react'

const initInputs = { comment: '' }

export default function TaskPage(props) {
    const { taskId } = useParams()

    const { getUserTask, currentTask, foundUser, getUser } = useContext(UserContext)
    const { title, description, createdAt, priority, status, user } = currentTask
    // const { username } = foundUser

    const { getAllComments, deleteComment, submitComment, comments, taskComment, editComment } = useContext(CommentContext)

    const userBgColor = useColorModeValue('gray.600', 'gray.300')
    const boxShadow = useColorModeValue('lg', '2xl')
    const bgColor = useColorModeValue('gray.100', 'gray.600')
    const contentBgColor = useColorModeValue('gray.200', 'gray.900')

    const statusOptions = ['Backlogged', 'In Progress', 'Testing', 'Approved', 'Completed']

    const priorityColorSwitcher = priority => {
        return priority == 'Low' ? 'blue'
             : priority == 'Normal' ? 'yellow'
             : 'red';
     }

    useEffect(() => {
        getUserTask(taskId)
        getUser(user)
        console.log(user)
        console.log(foundUser)
    }, [taskId])

    useEffect(() => {
        getAllComments(taskId)
        console.log(taskComment)
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
    }

    function handleSubmit(e){
        e.preventDefault()
        submitComment(inputs, taskId)
        getAllComments(taskId)
        setInputs(initInputs)
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
                            <Heading p={3}>{title}</Heading>
                            <IconButton onClick={taskEditToggle} icon={<AiFillEdit />} size='sm' variant='outline' />
                        </Flex>
                    <Flex w='full' justify='center' align='center'>
                        <Badge 
                            colorScheme={priorityColorSwitcher(priority)} 
                            p={1}
                            m={2} 
                            borderRadius='5px'
                            >
                            {priority}
                        </Badge>
                        <Text color={userBgColor}>
                            Created by: {user}
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
                                            <EditTaskComment 
                                                commentId={commentObj._id} 
                                                taskId={taskId} 
                                                handleToggle={handleToggle}
                                            />

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
                    currentTask={currentTask}
                    setEditToggle={taskEditToggle}
                    editType='task'
                    _id={currentTask._id} 
                />
            }
            </Box>
        </Flex>
    )
}
