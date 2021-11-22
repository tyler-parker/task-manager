import React, {useEffect, useContext} from 'react'
import IssueForm from './IssueForm.js'
import Issue from './Issue'
import { UserContext } from "../context/UserProvider.js"
import {
    Box,
    Heading,
    Divider,
    Container,
    Grid
} from '@chakra-ui/react'


export default function Profile() {

    const {
        getUserIssues,
        addUserIssue,
        issues
    } = useContext(UserContext)

    useEffect(() => {
        getUserIssues()
    }, [])


    return (
        <Box justify='center' align='center' m={5}>
            <IssueForm addUserIssue={addUserIssue} />
                <Divider />
            <Box w='85%'>
                <Container m={5}>
                    <Heading size='xl' >Your Topics</Heading>
                </Container>
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    {issues.map(issue => <Issue {...issue} key={issue._id} />)}
                </Grid>
            </Box>
        </Box>
    )
}