import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserProvider.js"
import {
    Menu,
    MenuButton,
    MenuList,
    Avatar,
    MenuItem,
    Button,
} from '@chakra-ui/react'

export default function UserMenu(props) {
    const { logout } = props
    const {user: { username }} = useContext(UserContext)

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
                  <Link to='/profile'>
                    <MenuItem>
                      Profile
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
