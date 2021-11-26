import React from 'react'
import Task from './Task.js'

export default function TaskList(props) {
    const { tasks } = props
    return (
        <>
            {tasks.map(task => <Task {...task} key={task._id} />)}
        </>
    )
}