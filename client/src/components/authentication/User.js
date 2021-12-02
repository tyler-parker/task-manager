import React, { useState, useEffect } from "react"
import PublicTasks from "../Task/PublicTasks.js"
import axios from "axios"
import {
    Box,
    Heading,
    Divider,
    Grid
} from '@chakra-ui/react'

 function User(props) {
    const { username, _id} = props
    const [tasks, setTasks] = useState([])
    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    useEffect(() => {
        userAxios.get(`/api/task/user/${_id}`)
        .then(res => setTasks(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <Box 
        role={'group'}
        p={6}
        w={'full'}
        pos={'relative'}
        >
            <Divider />
            <Heading align='center' p={4}>{username}'s Tasks</Heading>
            <Grid gridTemplateColumns='repeat(2, 1fr)' gap={6}>
                {tasks.map(task => <PublicTasks {...task}  key={task._id}/>)}
            </Grid>
        </Box>
    )
}

export default User