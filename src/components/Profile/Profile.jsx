import React,{useEffect, useState} from 'react';
import {Avatar,Text, Button,Container,HStack,Heading, Stack, VStack, Image, ModalOverlay, ModalContent, Modal, ModalCloseButton, ModalBody, Input, ModalFooter, useDisclosure, ModalHeader } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadStyle } from '../Auth/Register';
import { updateProfilePicture } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import {cancelSubscription, loadUser, removeFromPlaylist } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';

function Profile({user}) {
  const dispatch = useDispatch();
  const {loading,message,error} = useSelector(state=>state.profile);
  const {
    loading:subscriptionLoading,
    message:subscriptionMessage,
    error:subscriptionError
  } = useSelector(state=>state.subscription);

  const removeFromPlaylistHandler = async(id) =>{
    console.log(id);
   await dispatch(removeFromPlaylist(id));
   dispatch(loadUser());
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


    if(subscriptionMessage){
      toast.success(subscriptionMessage);
      dispatch({type:'clearMessage'})
      dispatch(loadUser());
    } 

    if(subscriptionError){
      toast.error(error);
      dispatch({type:'clearError'})
    }

},[dispatch,error,message,subscriptionError,subscriptionMessage])  
 

  const changeImageSubmitHandler = async (e,image)=>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file',image)

    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  }

  const cancelSubscriptionHandler = async(id)=>{
    await dispatch(cancelSubscription(id));
    dispatch(loadUser());
  }


  const {isOpen,onOpen,onClose} = useDisclosure();
  
  return (

    <Container minH={'95vh'} maxW="container.lg" py="8">
        <Heading children="Profile" m="8" />
          <Stack
          justifyContent={'flex-start'}
          direction={['column','row']}
          alignItems={'center'}
          spacing={['8','16']}
          padding="8"
          >
            <VStack>
              <Avatar  boxSize={'48'} src={user.avatar.url}/>
               <Button isLoading={loading} onClick={onOpen} colorScheme={'yellow'} variant="ghost">
                  Change Photo
                </Button> 
            </VStack>
            <VStack spacing={'4'} alignItems={['center','flex-start']}>
              <HStack>
                <Text children="Name" fontWeight={'bold'}/>
                <Text children={user.name} />
              </HStack>
              <HStack>
                <Text children="Email" fontWeight={'bold'}/>
                <Text children={user.email} />
              </HStack>
              <HStack>
                <Text children="CreatedAt" fontWeight={'bold'}/>
                <Text children={user.createdAt.split('T')[0]} />
              </HStack>
              {
                user.role!=="admin" && 
                <HStack>
                  <Text children="Subscription" fontWeight={'bold'} />
                  {user.subscription&&user.subscription.status==="active"?(
                    <Button isLoading={subscriptionLoading} onClick={cancelSubscriptionHandler} colorScheme='yellow.500' variant={'unstyled'}> Cancel Subscription </Button>
                  ):(
                    <Link to="/subscribe">
                      <Button colorScheme='yellow'>Subscribe </Button>
                    </Link>
                  )}
                </HStack>
              }
              <Stack direction={['column','row']} alignItems={'center'}>
                <Link to="/updateprofile">
                  <Button> Update Profile </Button>
                </Link>
                <Link to = "/changepassword">
                  <Button> Change Password </Button>
                  </Link>
              </Stack>

              <Heading children="Playlist" size={'md'} my="8" />

              {
                user.playlist.length>0 &&  (
                  <Stack direction={['column','row']} alignItems={'center'} flexWrap="wrap" p="4">
                    {
                      user.playlist.map((element,index)=>(
                        <VStack w='48' m="2" key={element.course}>
                          <Image 
                          boxSize={'full'}
                          objectFit="contain"
                          src={element.poster}
                          />
                          <HStack>
                            <Link to={`/course/${element.course}`}>
                              <Button variant="ghost" colorScheme='yellow'> Watch Now </Button>
                            </Link>
                            <Button onClick={()=>removeFromPlaylistHandler(element.course)}>
                              <RiDeleteBin7Fill />
                            </Button>
                          </HStack>
                        </VStack>
                      ))
                    }
                  </Stack>
                )
              }
            </VStack>
          </Stack>

              <ChangePhotoBox changeImageSubmitHandler = {changeImageSubmitHandler} isOpen={isOpen} onClose={onClose}
              />
       
    </Container>
  );
}

export default Profile;


function ChangePhotoBox({isOpen,onClose,changeImageSubmitHandler}){
  const [image,setImage] = useState("");
  const [imagePrev,setImagePrev]= useState("");
  const changeImage = (e) =>{
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImagePrev(reader.result); 
          setImage(file);
        };
      }
}
  const closeHandler = () =>{
    onClose();
    setImagePrev('');
    setImage("")
  }

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>
          Change Photo
        </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <form onSubmit={(e)=>changeImageSubmitHandler(e,image)}>
                <VStack spacing={'8'}>
                 {imagePrev &&  <Avatar src={imagePrev} boxSize={'48'} /> }
                  <Input

                   type={'file'} 
                   onChange={changeImage}
                   css={{"&::file=selector-button":fileUploadStyle}} 
                   />
               
                <Button w="full" colorScheme={'yellow'} type="submit"> 
                Change
                </Button>
                </VStack>
              </form>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button mr="3" onClick={closeHandler}>
              Cancel
            </Button>
          </ModalFooter>
      </ModalContent>
    </Modal>
  )
}