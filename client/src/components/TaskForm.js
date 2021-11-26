import React, {useState} from "react"
import { Link } from 'react-router-dom'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    Textarea,
    useColorModeValue,
  } from '@chakra-ui/react';

const initInputs = {
    title:"",
    description:"",
    imgUrl:"",
    priority: "",
    status: "Backlogged"
}

export default function TaskForm(props){

    const [inputs, setInputs] = useState(initInputs)
    const {title, description, priority, status} = inputs
    const { addUserTask } = props
    const statusOptions = ['Backlogged', 'In Progress', 'Testing', 'Approved', 'Completed']

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addUserTask(inputs)
        setInputs(initInputs)
    }

    return(
        <Flex
            align={'center'}
            justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Create A Task</Heading>
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w='45vh'>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                            <Input
                                onChange={handleChange} 
                                type="text" 
                                name="title"
                                value={title}
                            />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Priority</FormLabel>
                            <Input
                                onChange={handleChange} 
                                type="text" 
                                name="priority"
                                value={priority}
                            />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                            <Textarea
                                onChange={handleChange} 
                                type="text" 
                                name="description"
                                value={description}
                            />
                    </FormControl>
                    <Stack spacing={10}>
                        <Button
                            onClick={handleSubmit}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}
                        >
                            Create
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Flex>
    )
}