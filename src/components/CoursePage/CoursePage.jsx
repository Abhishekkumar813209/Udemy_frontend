import { Text,Grid,Box, Heading, VStack } from '@chakra-ui/react';
import React,{useEffect, useState} from 'react';
import introVideo from "../../assets/videos/lake_aerial_view_drone_flight_view_943.mp4"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import { loadUser } from '../../redux/actions/user';
import Loader from '../layout/loader/Loader';
import toast from 'react-hot-toast';

function CoursePage({user}) {

  const [lectureNumber,setLectureNumber] = useState(0);
  const {loading,lectures,error,message} = useSelector(state=>state.course)
  const a = typeof(lectures)
    console.log(a);
    console.log(lectures)

  

const dispatch = useDispatch();
  const params = useParams();

  useEffect(()=>{
    dispatch(getCourseLectures(params.id))
    // dispatch(loadUser());
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'})
    }
  },[dispatch,params.id,error,message])

  const getVideoUrl = (lectureNumber) =>{
    if (lectures && lectures.length > 0 && lectures[lectureNumber] && lectures[lectureNumber].video && lectures[lectureNumber].video.url) {
    return lectures[lectureNumber].video.url;
    }
  }
  
  return (
    loading?<Loader />:(
      <Grid minH={'90vh'} templateColumns={['1fr','3fr 1fr']}> 
        <Box>
        
          <video
          width={'100%'}
          controls 
          controlsList='nodownload noremoteplayback'
          disablePictureInPicture
          disableRemotePlayback
          src={getVideoUrl(lectureNumber)}
          >

          </video>
          {lectures && lectures.length > 0 && lectures[lectureNumber] && (
      <Heading m="4" children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`} />
    )}
    {lectures && lectures.length > 0 && lectures[lectureNumber] && (
      <Text m="4" children={lectures[lectureNumber].description} />
    )}
        </Box>
        <VStack>
          {
            lectures.map((item,index)=>(
              <button key={item._id}
              onClick={()=> setLectureNumber(index)}
              style={{
                width:'100%',
                padding:'1rem',
                textAlign:'center',
                margin:0,
                borderBottom:'1px solid rgba(0,0,0,0.2)'
              }}
              >
                <Text noOfLines={1}>
                  #{index+1} {item.title}
                </Text>
              </button>
            ))
          }
        </VStack>
    </Grid>
    )
  );
}

export default CoursePage;
