import React, { useState, useEffect } from 'react'
import User from './User.js'
import axios from "axios"
import {
  Center,
  Heading,
  Stack,
  Box
} from '@chakra-ui/react';

export default function Public() {
  const userAxios = axios.create()

  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  const [users, setUsers] = useState([])

  useEffect(() => {
    userAxios.get("/api/users")
    .then(res => setUsers(res.data))
    .catch(err => console.log(err.response.data.errMsg))
  }, [])

  return (
        <Stack align='center' w='full'>
            <Heading size='2xl' m={5}>Public Issues</Heading>
            <Box w="full">
              {users.map(user => <User {...user}  key={user._id}/>)}
            </Box>
        </Stack>
  )
}