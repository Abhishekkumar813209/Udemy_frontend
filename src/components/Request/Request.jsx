import {Input, Button,Box, Container, FormLabel, Heading, VStack, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/actions/others';
import toast from "react-hot-toast"


const Request = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [course,setCourse]=useState('');

    const {loading,error,message} = useSelector(state=>state.other);

    const dispatch = useDispatch();

    const submitHandler = e =>{
        e.preventDefault();
        dispatch(courseRequest(name,email,course));
    }
useEffect(()=>{
    if(error){
        toast.error(error);
        dispatch({type:'clearError'})
    }
    if(message){
        toast.success(message);
        dispatch({type:'clearMessage'});
    }
},[dispatch,error,message])

  return (
    <Container>
        <VStack h="full" justifyContent={'center'} spacing="16"> 
            <Heading children="Request New Course" />
            <form onSubmit={submitHandler} style={{width:"100%"}}>
            <Box my={'4'}>    
               <FormLabel htmlFor="name" children="Name" />
                <Input required 
                id="name"
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder="Abc"
                type={'text'}
                focusBorderColor="yellow.500"
                />
               </Box>
               <Box my={'4'}>    
               <FormLabel htmlFor="email" children="Email" />
                <Input required 
                id="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type={'email'}
                focusBorderColor="yellow.500"
                />
               </Box>
               <Box my={'4'}>    
               <FormLabel htmlFor="course" children="Course" />
                <Textarea required 
                id="course"
                value={course}
                onChange={e=>setCourse(e.target.value)}
                placeholder="Enter the Course you need"
                focusBorderColor="yellow.500"
                />
               </Box>

               
              
               <Button my='4' isLoading = {loading} colorScheme='yellow' type='submit'>SendMail </Button>

               <Box my='4'>
                See Available Courses! {' '}
                <Link to="/courses">
                    <Button colorScheme={'yellow'} variant="link">
                        Click
                    </Button>{' '}
                    here
                </Link>
               </Box>
            </form>
        </VStack>
    </Container>
  )
}

export default Request