import React, { useState, useContext } from "react"
import { UserContext } from "../../context/UserProvider.js"
import { ProjectContext } from '../../context/ProjectProvider'
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
    RadioGroup,
    Radio
  } from '@chakra-ui/react';

export default function EditForm(props) {

    const initInputs = {
        title: props.title || "",
        description: props.description || "",
        priority: props.priority || "",
        status: props.status || ""
    }
    const [inputs, setInputs] = useState(initInputs)
    const { editUserTask } = useContext(UserContext)
    const { editUserProject } =useContext(ProjectContext)
    const { setEditToggle, _id, isTask, isProject } = props
    const statusOptions = ['Backlogged', 'In Progress', 'Testing', 'Approved', 'Completed']
    const priorities = ['Low', 'Normal', 'High']

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        editUserProject(inputs, _id)
        setEditToggle(prevState => !prevState)
    }


    const { title, description, priority } = inputs

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'2xl'}>Edit Task</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    w='md'
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
                        <RadioGroup>
                            <Stack spacing={5} direction='row'>
                                {
                                    priorities.map(priorityVal =>                                 
                                    <Radio onChange={handleChange} name='priority' value={priorityVal}>
                                        {priorityVal}
                                    </Radio>)
                                }
                            </Stack>
                        </RadioGroup>
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
                                Submit
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