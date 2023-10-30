// import { Image,
//     Stack,
//     Button, 
//     Container ,
//     Text,
//      HStack, 
//      Heading,
//      Input, 
//      VStack ,
//     } from '@chakra-ui/react'
//     import {Link} from "react-router-dom"
// import React,{useState }from 'react'
// import { useDispatch, useSelector } from 'react-redux'


// const Course = ({
//     views,
//     title,
//     imageSrc,
//     id,
//     addToPlaylistHandler,
//     creator,
//     description,
//     lectureCount
// }) =>{



//     return(
//         <VStack className='course' alignItems={['center','start']}>
//             <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
//             <Heading textAlign="left" maxW="200px" fontFamily={'sans-serif'} noOfLines={3} children={title} />
//             <Text noOfLines={2} children={description} />

//             <HStack>
//                 <Text 
//                 fontWeight={'bold'}
//                 textTransform="uppercase"
//                 children={'Creator'}
//                 />
//                <Text 
//                fontFamily={'body'}
//                textTransform="uppercase"
//                children={creator}
//                />
//             </HStack>

//             <Heading 
//             textAlign={'center'}
//             size="xs"
//             children={`Lectures - ${lectureCount}`}
//             textTransform="uppercase"
//             />
//             <Heading 
//             size="xs"
//             children={`Views - ${views}`}
//             textTransform="uppercase"
//             />

//             <Stack direction={['column','row']} alignItems="center" 
//             >
//             <Link to ={`/course/${id}`} >
//             <Button colorScheme={'yellow'}> 
//                 Watch Now
//             </Button>
//             </Link>
//             <Button variant={'ghost'} 
//             colorScheme='yellow'
//             onClick={addToPlaylistHandler}
//             >
//                 Add To Playlist
//             </Button>
//                 </Stack>
//         </VStack>
//     )
// }

// const Courses = () => {
//     const [keyword,setKeyword] = useState('');
//     const [category,setCategory] = useState('');
   
//     const categories=[
//         'Web Development',
//         "Artificial Intelligence",
//         "Data Structuresa & Algorithm",
//         "App Development",
//         "Data Science",
//         "Game Development"
//     ]
//     const addToPlaylistHandler = (courseId) =>{
//         console.log('Added To Playlist',courseId)
//     }

// const {courses} = useSelector(state=>state.course)

//   return (
//     <Container
//     minH={'95vh'}
//     maxW="container.lg"
//     paddingY={'8'}
//     >

//     <Heading children="All Courses" m={'8'} />

//         <Input value={keyword} onChange={e=> setKeyword(e.target.value)} 
//         placeholder='Search a Course...'
//         type="text"
//         focusBorderColor='yellow.500'
//         />

//         <HStack overflowX={'auto'} paddingY="8" css={{
//                 '&::-webkit-scrollbar':{
//                     display:'none',
//                 }

//         }}>
//             {
//                 categories.map((item,index)=>(
//                    <Button key={index} onClick={()=>setCategory(item)}>
//                         <Text children={item} />
//                    </Button>
//                 ))
//             }
//         </HStack>
//         <Stack
//         direction={['column','row']}
//         flexWrap="wrap"
//         justifyContent={['flex-start','space-evenly']}
//         alignItems={['center','flex-start']}
//         >
//             {courses.lenght>0 ? courses.map((item)=>(
//                 <Course 
//                 key={item._id}
//                 title={item.title}
//                 description={item.description}
//                 views={item.views}
//                 imageSrc={item.poster.url}
//                 id={item._id}
//                 creator={item.createdBy}
//                 lectureCount={item.numOfVideos}
//                 addToPlaylistHandler={addToPlaylistHandler}
//                 />
//             )):(
//                 <Heading children="Courses Not Found" />
//             )}
//         </Stack>
//     </Container>
//   )
// }

// export default Courses
import { Button, Container , HStack, Heading , Input,Text,Stack,VStack,Image } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getAllCourse } from '../../redux/actions/course'
import toast from 'react-hot-toast'
import { addToPlaylist } from '../../redux/actions/profile'
import { loadUser } from '../../redux/actions/user'

const Course = ({views,title,imageSrc,id,addToPlaylistHandler,creator,description,lectureCount,loading}) =>{

  
 

      return (
        <VStack className='course' alignItems={["center","flex-start"]}>
          <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
          <Heading textAlign={["center","left"]} maxW="200px" fontFamily={"sans-serif"} 
            noOfLines={3}
            children={title}
          />
          <Text noOfLines={2} children={description} />

          <HStack>
            <Text 
            fontWeight={'bold'}
            children={"Creator"}
            textTransform="uppercase" 
            />

            <Text 
            fontWeight={'body'}
            textTransform="uppercase"
            children={creator}
            />

          </HStack>

        <Heading 
        textAlign={'center'} 
        size='xs'
        children={`Lectures - ${lectureCount}`}
        />
         
        <Heading 
          size="xs"
          children={`Views - ${views}`}
          textTransform="uppercase"
        />

        <Stack direction = {["column","row"]} alignItems = "center">
          <Link to={`/course/${id}`}>
              <Button colorScheme = {'yellow'}> Watch Now </Button>
          </Link>
            <Button 
            variant={"ghost"} 
            colorScheme={'yellow'}
            isLoading={loading}
            onClick={addToPlaylistHandler}
            > 
            Add to Playlist
           </Button>

        </Stack>
        </VStack>
      )
}


const Courses = () => {

    const [keyword , setKeyword] = useState("")
    const [category,setCategory] = useState("")
    const dispatch = useDispatch()


    const categories = [
      'Web Development',
      'Artificial Intelligence',
      'Data Structure & Algorithm',
      'App Development',
      'Data Science',
      'Game Development'
    ]

    const {loading,courses,error,message} = useSelector(state=>state.course)
    console.log(courses);
    useEffect(()=>{
      dispatch(getAllCourse(category,keyword));

      if(error){
        toast.error(error);
        dispatch({type:'clearError'})
      }

      if(message){
        toast.success(message);
        dispatch({type:'clearMessage'});
      }

    },[category,keyword,dispatch,error,message])
    
    const addToPlaylistHandler = async(courseId) =>{
      console.log('Added To Playlist',courseId)
      await dispatch(addToPlaylist(courseId));
      dispatch(loadUser());
  }
  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY = {'8'}>
        <Heading children="All Courses" m={'8'} />

        <Input value={keyword}
         onChange={(e) => setKeyword(e.target.value)}
         placeholder = "Search a course ..."
         type={'text'}
         focusBorderColor='yellow.500'
         />
        <HStack overflowX={'auto'} paddingY="8" css={{"&::-webkit-scrollbar":{
          display:'none',
        },
        }}>

            {
              categories.map((item,index) => {

               return (
                <Button key = {index} onClick ={()=> setCategory(item)} minW={'60'}>
                  <Text children = {item} />
                </Button>
               )
              })
            }
        </HStack>
      
      <Stack 
      direction = {["column","row"]}
      flexWrap="wrap"
      justifyContent={["flex-start","space-evenly"]}
      alignItems={['center','flex-start']}
      >
       {
        courses && courses.map((item)=>{
          console.log(item._id);
          return(
      <Course 
      key={item._id}
      title = {item.title}
      description={item.description}
      views = {item.views}
      imageSrc={item.poster.url}
      id={item._id}
      creator={item.createdBy}
      lectureCount = {item.numOfVideos}
      loading={loading}
      onClick={()=>addToPlaylistHandler(item._id)}
       />

        )})
       }
            </Stack>
    </Container>
  )
}

export default Courses 