import React, { useState, useContext } from "react"
import { UserContext } from "../../context/UserProvider.js"
import { ProjectContext } from "../../context/ProjectProvider.js";
import EditTaskForm from "../Task/EditTaskForm.js"
import { BsChevronDoubleDown, BsChevronDoubleUp, } from 'react-icons/bs'
import { AiFillEdit, AiFillDelete, AiOutlineUnorderedList } from 'react-icons/ai'
import { useDrag } from 'react-dnd'
import { Link } from 'react-router-dom'
import {
  Box,
  IconButton,
  Button,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Divider,
  HStack
} from '@chakra-ui/react';

export default function Task(props) {

  const { title, _id, priority } = props
  const [editToggle, setEditToggle] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const { deleteUserTask, tasks } = useContext(UserContext)
  const { deleteUserProject } = useContext(ProjectContext)
  const boxShadow = useColorModeValue('lg', '2xl')
  const bgColor = useColorModeValue('white', 'gray.700')
  const lowColor = useColorModeValue('blue.300', 'blue.600')
  const normalColor = useColorModeValue('yellow.300', 'yellow.600')
  const highColor = useColorModeValue('red.300', 'red.600')

  const colorSwitcher = priority => {
    return priority == 'Low' ? lowColor
         : priority == 'Normal' ? normalColor
         : highColor;
 }

  const [{isDragging}, drag] = useDrag(() => ({
    type: 'task', 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging
    }),
  }))

  return (
    <>
      {
        !editToggle ?
        <Box
        role={'group'}
        p={6}
        m={6}
        boxShadow={boxShadow}
        rounded={'lg'}
        bg={bgColor}
        w={{sm: 'sm', md: 'xl', lg: '2xl', xl: 'xl'}}
        ref={drag}
        border='solid'
        borderColor={colorSwitcher(priority)}
        >
          <Stack m={6} pt={10} align={'center'}>
            <Link to={`project/${_id}`}>
              <Heading fontSize={'2xl'} fontWeight={500}>
                { title }
              </Heading>
            </Link>
              <HStack align='center' justify='center' spacing={4} pt={2}>
                <IconButton
                  variant='outline'
                  colorScheme='yellow'
                  size='md'
                  icon={<AiFillEdit />}
                  onClick={() => setEditToggle(prevState => !prevState)}
                />

                <IconButton
                  variant='outline'
                  colorScheme='red'
                  size='md'
                  icon={<AiFillDelete />}
                  onClick={() => deleteUserProject(_id)}
                />

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
              editType='project'
            />
      }
    </>
  )
}