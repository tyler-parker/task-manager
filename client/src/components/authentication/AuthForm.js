import React from 'react'
import {
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

export default function AuthForm(props){

  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    errMsg,
    title,
    handleToggle,
    accountStatus,
    inputs: {
      username, 
      password
    } 
  } = props
  
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w='70%'
        >
          <Flex justify='center'>
            <Heading fontSize={'3xl'} mb={5} >{title}</Heading>
          </Flex>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input 
                  type="username" 
                  value={username} 
                  name="username" 
                  onChange={handleChange} 
                  placeholder="Username"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input 
                  type="password" 
                  value={password} 
                  name="password" 
                  onChange={handleChange} 
                  placeholder="Password"
              />
            </FormControl>
            <Stack spacing={6} align='center' mt={8}>
              <Button
                onClick={handleSubmit} 
                colorScheme={'blue'} 
                variant={'solid'}
                
                size='lg'
                w='70%'
              >
              { btnText }
              </Button>
              <Text>{errMsg}</Text>
              <Link onClick={handleToggle} >{accountStatus}</Link>
            </Stack>
        </Box>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1553034545-32d4cd2168f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}