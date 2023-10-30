import React,{useState} from 'react';
import { Container,Heading,VStack,Input,Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

function UpdateProfile({user}) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading} = useSelector(state=>state.profile);

  const submitHandler = async(e) =>{
    e.preventDefault();
    await dispatch(updateProfile(name,email));
    dispatch(loadUser());
    navigate('/profile');
}


  return (
    <Container py="16" minH={'90vh'}>
    <form onSubmit={submitHandler}> 

        <Heading
        textTransform={'uppercase'}
        children="Update Profile" 
        my="16" 
        textAlign={['center','left']} 
        />

        <VStack spacing={'8'}>

        <Input
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Name"
            type={'text'}
            focusBorderColor="yellow.500"
            />

            <Input 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="Enter New Email"
            type={'email'}
            focusBorderColor="yellow.500"
            />

            <Button
            isLoading={loading}
            w='full'
            colorScheme={'yellow'}
            type="submit"
            >

            Change Profile
            </Button>
        </VStack>
    </form>
</Container>
  );
}

export default UpdateProfile;
