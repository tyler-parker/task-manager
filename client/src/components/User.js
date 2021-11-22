import React, { useState, useEffect } from "react"
import PublicIssues from "./PublicIssues.js"
import axios from "axios"
import {
    Box,
    Heading,
    Divider,
    Grid
} from '@chakra-ui/react'

 function User(props) {
    const { username, _id} = props
    const [issues, setIssues] = useState([])
    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    useEffect(() => {
        userAxios.get(`/api/issue/user/${_id}`)
        .then(res => setIssues(res.data))
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
            <Heading align='center' p={4}>{username}'s Issues</Heading>
            <Grid gridTemplateColumns='repeat(2, 1fr)' gap={6}>
                {issues.map(issue => <PublicIssues {...issue}  key={issue._id}/>)}
            </Grid>
        </Box>
    )
}

export default User