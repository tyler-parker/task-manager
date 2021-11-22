import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider.js"
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

export default function EditForm(props) {

    const initInputs = {
        title: props.title || "",
        description: props.description || "",
    }
    const [inputs, setInputs] = useState(initInputs)
    const { editUserIssue } = useContext(UserContext)
    const { setEditToggle, _id } = props

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))

    }

    function handleSubmit(e) {
        e.preventDefault()
        editUserIssue(inputs, _id)
        setEditToggle(prevState => !prevState)
    }


    const { title, description, imgUrl } = inputs

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'2xl'}>Edit Issue</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    w='45vh'
                >
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
                        <HStack spacing={10} justify='center' align='center'>
                            <Button
                                onClick={handleSubmit}
                                colorScheme='yellow'
                                variant='outline'
                                size='md'
                                w='25%'
                            >
                                Edit
                            </Button>
                            <Button 
                                onClick={() => setEditToggle(prevState => !prevState)}
                                variant='outline'
                                size='md'
                                w='25%'
                            >
                                Cancel
                            </Button>
                        </HStack>
                        <Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}