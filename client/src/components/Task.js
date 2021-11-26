import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider.js"
import EditTaskForm from "./EditTaskForm.js"
import {
  Box,
  Center,
  Button,
  Heading,
  Text,
  Stack,
  Image,
  Collapse,
  HStack,
  Avatar,
  IconButton,
  Icon
} from '@chakra-ui/react';

export default function Task(props) {

  const [show, setShow] = useState(false)
  const { title, description, imgUrl, _id, userId } = props
  const [editToggle, setEditToggle] = useState(false)
  const { addUserTask, deleteUserTask } = useContext(UserContext)

  const handleToggle = () => setShow(!show)

  return (
    <Center py={12}>
      {
        !editToggle ?
        <Box
        role={'group'}
        p={6}
        maxW={'950px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={imgUrl}
          />
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              { userId }
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              { title }
            </Heading>
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
                  onClick={() => deleteUserTask(_id)}
                  variant='outline' 
                  colorScheme='red' 
                  size='md' 
                >
                  Delete Task
                </Button>

              </HStack>
            </Stack>
          </Stack>
        </Box>
          :
            <EditTaskForm 
              _id={_id} 
              deleteUserTask={deleteUserTask} 
              {...props}
              setEditToggle={setEditToggle} 
              addUserTask={addUserTask} 
            />
      }
    </Center>
  )
}