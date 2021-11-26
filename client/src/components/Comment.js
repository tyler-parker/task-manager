import React, { useState, useEffect } from "react"
import faker from 'faker'
import {
    Box,
    VStack,
    Button,
    Heading,
    Container,
    Collapse,
    HStack,
    Text,
    Avatar,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
  } from '@chakra-ui/react';

export default function Comment(props) {
const { username, deleteComment, _id, comment, userComments } = props
const [show, setShow] = useState(false)
const handleToggle = () => setShow(!show)

    return (
        <>
            <Accordion defaultIndex={[userComments.length]} allowMultiple >
                <AccordionItem>
                    <Heading>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            <HStack>
                                <Avatar name={username}/>
                                <Heading size='lg'>@{username}</Heading>
                            </HStack>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                        <VStack>
                        <Box as='button'>
                            <Collapse 
                                onClick={handleToggle} 
                                wordBreak 
                                fontWeight={600} 
                                fontSize={'lg'}
                                startingHeight={20} 
                                in={show}
                                >
                                    <Text fontSize='lg'>
                                        { comment }
                                    </Text>
                            </Collapse>
                        </Box>
                            <Container align='center'>
                                <Button onClick={()=> deleteComment(_id)} colorScheme='red' size='sm' >Delete Comment</Button>
                            </Container>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    )

}