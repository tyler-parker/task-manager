import React, {useEffect, useContext} from 'react'
import TaskForm from '../Task/TaskForm.js'
import Task from '../Task/Task'
import { UserContext } from "../../context/UserProvider.js"
import { ProjectContext } from '../../context/ProjectProvider'
import ProjectList from '../projects/ProjectList'
import Split from 'react-split'
import {
    Box,
    Heading,
    Divider,
    extendTheme,
    Grid,
    Flex
} from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'


export default function Profile() {

    const breakpoints = createBreakpoints({
        sm: '320px',
        md: '1260px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1536px',
      })

    const theme = extendTheme({ breakpoints })

    const {
        getUserTasks,
        addUserTask,
        tasks
    } = useContext(UserContext)

    const {
        getUserProjects,
        getAllUserProjects,
        addUserProject,
        projects
    } = useContext(ProjectContext)

    useEffect(() => {
        getUserProjects()
        getAllUserProjects()
        getUserTasks()
    }, [])


    return (
            <Grid gridTemplateColumns={{sm: '1fr', md: '1fr', lg: '1fr', xl: 'repeat(2, 1fr)', '2xl': 'repeat(2, 1fr)'}}>
                <Flex direction='column' align='center'>
                    <TaskForm addUserProject={addUserProject} />
                </Flex>
                <Flex align='center' justify='center'>
                    <ProjectList projects={projects} />
                </Flex>
            </Grid>
    )
}