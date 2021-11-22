import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    HStack,
    Textarea,
    useColorModeValue,
  } from '@chakra-ui/react';

const initInputs = {
    comment: ""
}

export default function CommentForm(props) {

    const { _id, submitComment, toggle } = props
    
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
        console.log(inputs);
    }

    function handleSubmit(e){
        e.preventDefault()
        submitComment(inputs, _id)
        console.log(inputs)
        setInputs(initInputs)
    }

    const { comment } = inputs

    return (
        <Box 
            border='solid' 
            borderColor='gray.200' 
            p={4} 
            boxShadow={'xl'} m={6}
        >
                <FormControl>
                    <FormLabel>Title</FormLabel>
                        <Input
                            onChange={handleChange} 
                            type="text" 
                            name="comment"
                            value={comment}
                            placeholder="comment"
                        />
                </FormControl>
                <HStack m={4}>
                    <Button onClick={handleSubmit} colorScheme='yellow'>Add Comment</Button>
                    <Button onClick={() => toggle(prevToggle => !prevToggle)}>Close Comments</Button>
                </HStack>
        </Box>
    )
} 