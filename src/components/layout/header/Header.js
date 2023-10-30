import React from 'react'
import {ColorModeSwitcher} from "./../../../ColorModeSwitcher"
import { Button, Drawer, DrawerContent, DrawerOverlay,DrawerHeader, DrawerBody, useDisclosure, VStack, HStack} from '@chakra-ui/react'
import {RiDashboardFill,RiLogoutBoxLine, RiMenu5Fill} from "react-icons/ri"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions/user'
import { getAllCourses } from '../../../redux/actions/course'

const LinkButton = ({url="/",title="Home",onClose}) =>(
    <Link onClick={onClose} to={url}>
        <Button variant={'ghost'}>{title}</Button>
    </Link>
)


const Header = ({isAuthenticated=false,user}) => {
    const {isOpen,onClose,onOpen} = useDisclosure();

    
    const dispatch = useDispatch();
    const logoutHandler=()=>{
        onClose();
        dispatch(logout())
    }

    const getCourseHandler=()=>{
        onClose();
        dispatch(getAllCourses())
    }

  return (

    <>
        <ColorModeSwitcher />
        <Button  
        onClick={onOpen}
        colorScheme={'yellow'} 
        zIndex={'overlay'}
        width='12' height={'12'} 
        rounded={'full'} 
        position={"fixed"} 
        top="6" left="6">
            <RiMenu5Fill/> 
        </Button>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay backdropFilter={'blur(5px)'}/>
            <DrawerContent>
                <DrawerHeader borderBottomWidth={'1px'}>
                    COURSE BUNDLER
                </DrawerHeader>

                <DrawerBody>
                <VStack>
                    <LinkButton onClose={onClose} url="/" title="Home" />
                    <Link onClose={onClose} to="/courses">
                        <Button onClick={getCourseHandler} variant={'ghost'}>
                                    Get All Courses
                        </Button>
                    </Link>
                    <LinkButton onClose={onClose} url="/request" title="Request a Course" />
                    <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
                    <LinkButton onClose={onClose} url="/about" title="About us" />

                    <HStack
                    justifyContent={'space-evenly'}
                    position="absolute"
                    bottom={'2rem'}
                    width="80%"
                    >
                        {isAuthenticated?(
                        <>
                            <VStack>
                                <HStack>
                                    <Link onClick={onClose} to="/profile">
                                        <Button variant={'ghost'} colorScheme={'yellow'}>
                                            Profile
                                        </Button>
                                    </Link>
                                    <Button  variant={'ghost'} onClick={logoutHandler}>
                                            <RiLogoutBoxLine  />
                                            Logout
                                        </Button>
                                </HStack>
                                {user && user.role=== "admin" &&(
                            <Link onClick={onClose} to="/admin/dashboard">
                                <Button variant={'ghost'} colorScheme={'purple'}>
                                    <RiDashboardFill stype={{margin:'4px'}} />
                                            Dashboard
                                 </Button>
                            </Link>
                        )}
                            </VStack>
                        </>):(
                        <>
                        <Link onClick={onClose} to="/login">
                            <Button colorScheme={'yellow'}> Login </Button>
                        </Link>
                        <p>Or</p>
                        <Link onClick={onClose} to="/register">
                            <Button colorScheme={'yellow'}> Sign Up</Button>
                        </Link>
                        </>)}
                    </HStack>
                       
                </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default Header


