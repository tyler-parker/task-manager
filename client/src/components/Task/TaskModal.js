import React, { useState } from 'react'
import { LoremIpsum } from 'react-lorem-ipsum'
import TaskModalForm from './TaskModalForm'
import TaskForm from './TaskForm'
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,    
} from '@chakra-ui/react'


export default function TaskModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { addUserTask, projectId } = props

    return (
        <>
            <Button onClick={onOpen} size='lg' colorScheme='blue'>Create Task</Button>
            <Modal size='xl' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TaskModalForm addUserTask={addUserTask} projectId={projectId} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
