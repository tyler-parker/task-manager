import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserProvider.js"
import {
    Menu,
    MenuButton,
    MenuList,
    Center,
    Avatar,
    MenuDivider,
    MenuItem,
    Button,
    Text,
    Heading
} from '@chakra-ui/react'

export default function UserMenu(props) {
    const { avatarUrl, logout } = props
    const {user: { username, avatar }} = useContext(UserContext)

    return (
        <>
            <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'md'}
                    name={username}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      name={username} 
                    />
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link to='/profile'>
                    <MenuItem>
                      Profile
                    </MenuItem>
                  </Link>
                  <Link to='/public'>
                    <MenuItem>
                      Public Issues
                    </MenuItem>
                  </Link>
                  <Link to='/'>
                    <MenuItem onClick={logout}>
                      Logout
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
        </>
    )
}
