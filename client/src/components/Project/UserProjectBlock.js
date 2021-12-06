import React, { useState, useEffect } from "react"
import PublicTasks from "./PublicProjects.js"
import axios from "axios"
import {
    Box,
    Heading,
    Divider,
    Grid
} from '@chakra-ui/react'

 function User(props) {
    const { username, _id} = props
    const [projects, setProjects] = useState([])
    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    useEffect(() => {
        userAxios.get(`/api/project/user/${_id}`)
        .then(res => setProjects(res.data))
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
            <Heading align='center' p={4}>{username}'s Projects</Heading>
            <Grid gridTemplateColumns='repeat(2, 1fr)' gap={6}>
                {projects.map(project => <PublicTasks {...project}  key={project._id}/>)}
            </Grid>
        </Box>
    )
}

export default User