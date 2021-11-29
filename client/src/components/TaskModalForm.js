import React, { useState, useContext } from "react"
import { AiOutlineCaretDown } from 'react-icons/ai'
import { UserContext } from "../context/UserProvider";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Radio,
    RadioGroup,
    Textarea,
    useColorModeValue,
    Select
  } from '@chakra-ui/react';

const initInputs = {
    title:"",
    description:"",
    priority: "",
    status: ""
}

export default function TaskModalForm(props){

    const [inputs, setInputs] = useState(initInputs)
    const {title, description, status} = inputs
    const { addUserTask, projectId } = props
    

    const statusOptions = ['Backlogged', 'In Progress', 'Testing', 'Approved', 'Completed']
    const priorities = ['Low', 'Normal', 'High']

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
        addUserTask(inputs, projectId)
        setInputs(initInputs)
    }

    return(
        <Flex
            align='center'
            justify='center'
            position={{sm: 'relative', md: 'relative', lg: 'relative', xl: 'fixed'}}
            p={6}
        >
        <Stack spacing={8} py={12} px={6} align='center'>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Create A Project</Heading>
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w={{sm: 'sm', md: 'lg', lg: 'xl', xl: 'xl'}}
            >
                <Stack spacing={4} w='full'>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                            <Input
                                onChange={handleChange} 
                                type="text" 
                                name="title"
                                value={title}
                            />
                    </FormControl>
                        <Stack m={4}>
                            <FormLabel>Status</FormLabel>
                            <Select name='status' value={status} onChange={handleChange}>
                                {
                                    statusOptions.map(statusOption => 
                                    <option 
                                        key={statusOption} 
                                        eventKey={statusOption}
                                    > 
                                        {statusOption} 
                                    </option>)
                                }
                            </Select>
                        </Stack>
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