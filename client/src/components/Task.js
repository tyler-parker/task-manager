import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider.js"
import { ProjectContext } from "../context/ProjectProvider.js";
import EditTaskForm from "./EditTaskForm.js"
import { BsChevronDoubleDown,BsChevronDoubleUp } from 'react-icons/bs'
import {
  Box,
  IconButton,
  Button,
  Heading,
  Text,
  Stack,
  Flex,
  Divider,
  HStack
} from '@chakra-ui/react';

export default function Task(props) {

  const [show, setShow] = useState(false)
  const { title, _id } = props
  const [editToggle, setEditToggle] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const { deleteUserTask, tasks } = useContext(UserContext)
  const { deleteUserProject } = useContext(ProjectContext)

  const handleToggle = () => setShow(!show)

  return (
    <>
      {
        !editToggle ?
        <Box
        role={'group'}
        p={6}
        m={6}
        boxShadow={'2xl'}
        rounded={'lg'}
        w={{sm: 'sm', md: 'xl', lg: '2xl', xl: 'xl'}}
        // h={{sm: 'sm', md: 'md', lg: 'md', xl: 'xs'}}
        >
          <Stack m={6} pt={10} align={'center'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              { title }
            </Heading>
              <HStack align='center' justify='center' spacing={5} pt={5}>
                <Button
                  variant='outline'
                  colorScheme='teal'
                  size='md'
                  onClick={() => setEditToggle(prevState => !prevState)}
                >
                  Edit Task
                </Button>

                <Button
                  onClick={() => deleteUserProject(_id)}
                  variant='outline'
                  colorScheme='red'
                  size='md'
                >
                  Delete Task
                </Button>

              </HStack>
          </Stack>
          {
            !showMore ?
            <Stack>
              <Text>Show Tasks</Text>
              <IconButton p={6} onClick={() => setShowMore(prevState => !prevState)} icon={<BsChevronDoubleDown />} /> 
            </Stack>
            :
            <Stack>
              {tasks.map(task => 
                <Box align='left' p={5}>
                  <Box pb={2}>
                    {task.title}
                  </Box>
                  <Divider />
                </Box>)
              } 
              <IconButton p={6} onClick={() => setShowMore(prevState => !prevState)} icon={<BsChevronDoubleUp />} />
            </Stack>
          }
        </Box>
          :
            <EditTaskForm
              _id={_id}
              deleteUserTask={deleteUserTask}
              {...props}
              setEditToggle={setEditToggle}
            />
      }
    </>
  )
}