import {Box,Avatar, Input,Container, FormLabel, Heading, VStack, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';

export const fileUploadStyle={
    cursor:'pointer',
    marginLeft:'-5%',
    width:"110%",
    border:'none',
    height:'100%',
    color:'#ECC948',
    backgroundColor:'white'
}

const fileUploadCss={
        '&::file-selector-button':fileUploadStyle
}

const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [imagePrev,setImagePrev] = useState('');
    const [image,setImage] = useState('');

    const changeImageHandler = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();


        reader.readAsDataURL(file);
        reader.onloadend = () =>{ 
            //yha spelling should be correct onlodend
            setImagePrev(reader.result);
            setImage(file);
        }
    }

    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.append('name',name);
        myForm.append('email',email);
        myForm.append('password',password);
        myForm.append('file',image)

        dispatch(register(myForm));
    }

  return (
    <Container h={'120vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
            <Heading className="alpha" textTransform={'uppercase'} children={"Registration"} />
            <form onSubmit={submitHandler} style={{width:"100%"}}>
                <Box my="4" display={'flex'} justifyContent={'center'}>
                    <Avatar src={imagePrev} size={'2xl'} />
                </Box>
            <Box my={'4'}>    
               <FormLabel htmlFor="email" children="Name" />
                <Input required 
                id="name"
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder="abc"
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
               <FormLabel htmlFor="password" children="password" />
                <Input required 
                id="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type={'password'}
                focusBorderColor="yellow.500"
                />
               </Box>

               <Box my={'4'}>    
               <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
                <Input 
                required 
                accept='image/*'
                id="chooseAvatar"
                type={'file'}
                focusBorderColor="yellow.500"
                css={{fileUploadCss}}
                onChange={changeImageHandler}
                />
               </Box>

              
               <Button my='4' colorScheme='yellow' type='submit'>SignUp </Button>
               <Box my='4'>
                Already Signed Up?{' '}
                <Link to="/login">
                    <Button colorScheme={'yellow'} variant="link">
                        Login
                    </Button>{' '}
                    here
                </Link>
               </Box>
            </form>
        </VStack>
    </Container>
  )
}

export default Register