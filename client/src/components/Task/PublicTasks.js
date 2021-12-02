import React, { useState, useEffect } from "react"
import Comment from "../comment/Comment.js"
import CommentForm from "../comment/CommentForm.js"
import { Link } from 'react-router-dom'
import axios from "axios"
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Collapse,
    HStack,
    Button,
    Divider,
  } from '@chakra-ui/react';


export default function PublicTasks(props) {
    const { title, description, _id, userId } = props

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const [userComments, setUserComments] = useState([])
    const [userComment, setUserComment] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)
    const [show, setShow] = useState(false)
    const handleToggle = () => setShow(!show)
    

    function getAllComments() {
        userAxios.get(`/api/comment/${_id}`)
        .then(res => {
            setUserComments(res.data)
            console.log(res.data)
        }
        )
        .catch(err => console.log(err))
    }

    useEffect(() => {
      getAllComments()
    }, [])
    
    function submitComment(newComment, taskId) {
        userAxios.post(`/api/comment/${taskId}`, newComment)
            .then(res => {
                setUserComments(prevState => [...prevState, res.data])
            })
            .catch(err => console.log(err))
        setUserComment("")
        getAllComments()
    }
    function deleteComment(commentId) {
        userAxios.delete(`/api/comment/${commentId}`)
            .then(res => setUserComments(prevState => prevState.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err))
            getAllComments()
    }

    return (
        <Center py={12}>
        {!commentToggle ?
        <Box
            role={'group'}
            p={6}
            maxW={'950px'}
            w={'full'}
            boxShadow={'2xl'}
            rounded={'lg'}
            pos={'relative'}
            align='center'
            >
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                    { userId }
                    </Text>
                    <Link to={`/tasks/${_id}`}>
                        <Heading size='lg'>{title}</Heading>
                    </Link>
                    <Stack mt={2}>
                        <Box as='button'>
                            <Collapse 
                                onClick={handleToggle} 
                                wordBreak 
                                fontWeight={600} 
                                fontSize={'lg'}
                                startingHeight={20} 
                                in={show}
                                >
                                { description }
                            </Collapse>
                        </Box>
                        <Divider />
                        <HStack align='center' justify='center' spacing={5} pt={5}>
                            <Button 
                                onClick={() => setCommentToggle(prevToggle => !prevToggle)}
                            >
                                View Comments
                            </Button>
                        </HStack>
                    </Stack>
            </Stack>
        </Box>
        :
            <Box>
                <CommentForm _id={_id} toggle={setCommentToggle} submitComment={submitComment}/>
                {userComments.map(comment => 
                    <Comment key={comment._id} {...comment} userComments={userComments} deleteComment={deleteComment} />
                )}
            </Box>
        }
        </Center>
    )
}