import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider.js"
import EditIssueForm from "./EditIssueForm.js"
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
import { BsArrowUpSquareFill, BsArrowDownSquareFill, BsDot } from 'react-icons/bs'

export default function Issue(props) {

  const [show, setShow] = useState(false)
  const { title, description, imgUrl, _id, upVotes, downVotes, userId } = props
  const [editToggle, setEditToggle] = useState(false)
  const { addUserIssue, deleteUserIssue } = useContext(UserContext)

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
                  Edit Issue
                </Button>

                <Button 
                  onClick={() => deleteUserIssue(_id)}
                  variant='outline' 
                  colorScheme='red' 
                  size='md' 
                >
                  Delete Issue
                </Button>

              </HStack>
            </Stack>
          </Stack>
        </Box>
          :
            <EditIssueForm 
              _id={_id} 
              deleteUserIssue={deleteUserIssue} 
              {...props}  
              setEditToggle={setEditToggle} 
              addUserIssue={addUserIssue} 
            />
      }
    </Center>
  )
}