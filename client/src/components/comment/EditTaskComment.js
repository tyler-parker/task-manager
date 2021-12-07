import React, { useState, useContext, useEffect} from 'react'
import { CommentContext } from '../../context/CommentProvider'
import {
    Textarea,
    Flex,
    Button
} from '@chakra-ui/react'

const initInputs = { comment: '' }

export default function EditTaskComment(props) {
    const [inputs, setInputs] = useState(initInputs)
    // const [singleComment, setSingleComment] = useState()

    const { commentId, taskId, handleToggle } = props

    const { singleComment, editComment, getSingleComment, getAllComments } = useContext(CommentContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
        console.log(inputs)
    }

    function handleEdit(e){
        e.preventDefault()
        editComment(inputs.comment, taskId, commentId)
        console.log(inputs.comment)
        console.log(taskId)
        console.log(commentId)
        handleToggle()
        getAllComments(taskId)
    }

    useEffect(() => {
        getSingleComment(taskId, commentId)
        console.log(singleComment)
        console.log(taskId)
        console.log(commentId)
    }, [])

    return (
        <>
            <Flex w='95%' flexDirection='column' p={4}>
                <Textarea
                    focusBorderColor='blue'
                    onChange={handleChange} 
                    name='comment' 
                    value={inputs.comment} 
                >

                </Textarea>
            </Flex>
            <Flex w='95%' justify='end' >
                <Button
                    onClick={handleEdit} 
                    variant='outline' 
                    colorScheme='yellow' 
                    size='sm'
                >
                    Edit Comment
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
    )
}
