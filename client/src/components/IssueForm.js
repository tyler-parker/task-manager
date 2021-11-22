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
    imgUrl:""
}

export default function PostForm(props){

    const [inputs, setInputs] = useState(initInputs)
    const {title, description, imgUrl} = inputs
    const { addUserIssue } = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addUserIssue(inputs)
        setInputs(initInputs)
    }

    return(
        <Flex
            align={'center'}
            justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Create An Issue</Heading>
                <Text fontSize={'lg'}>
                    for other users to  <Link to='/public'>vote and comment on</Link> ✌️😎
                </Text>
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
                        <FormLabel>Image URL</FormLabel>
                            <Input
                                onChange={handleChange} 
                                type="text"
                                name="imgUrl"
                                value={imgUrl}
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