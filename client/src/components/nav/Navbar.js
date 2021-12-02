
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Flex,
  Button,
  Heading,
  useColorModeValue,
  Stack,
  useColorMode,
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import UserMenu from './UserMenu'
import { UserContext } from "../../context/UserProvider.js"

export default function Navbar(props) {

  const { logout } = props
  const {user: { username }} = useContext(UserContext)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
      <Box bg={useColorModeValue('gray.300', 'gray.900')}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link to='/public'>
          <Heading size='xl' color='blue.500' m={6}>Task Manager</Heading>
        </Link>
          <Flex p={6} alignItems={'center'}>
            <Stack direction={'row'} spacing={5} justify='center' align='center'>
              <Text fontSize='large'>Welcome, { username }</Text>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <UserMenu username={username} logout={logout} />
            </Stack>
          </Flex>
        </Flex>
      </Box>
  )
}