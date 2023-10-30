import {server} from "../store"
import axios from "axios"

export const getAllCourse = (category="",keyword="") => async(dispatch) =>{
    try{
        dispatch({type:'allCourseRequest'})
        const {data} = await axios.get(
            `${server}/getallcourse?keyword=${keyword}&category=${category}`,{
                withCredentials:true
            }
       );
        dispatch({type:'allCourseSuccess',payload:data.courses})
    }catch(error){
        dispatch({type:'allCourseFail',payload:error.response.data})
    }
}

export const getAllCourses = ()=> async(dispatch) =>{
    try{
        dispatch({type:'allCoursesRequest'})
        const {data} = await axios.get(`${server}/getallcourses`,{
            withCredentials:true
        }
        );
        console.log(data);
        dispatch({type:'allCoursesSuccess',payload:data.courses})
    }catch(error){
        console.log(error)
        dispatch({type:'allCoursesFail',payload:error.response.data})
    }
}

export const getCourseLectures  = (id) => async(dispatch) =>{
    try{
        dispatch({type:'getCourseLecturesRequest'})
        
        const {data} = await axios.get(
            `${server}/course/${id}`,{
                withCredentials:true
            });
            console.log(`${server}`)
            console.log(`${id}`)
            const a = typeof(data);
        console.log(a);
        console.log(data);
        dispatch({type:'getCourseLecturesSuccess',payload:data.lectures})
        
    }catch(error){
    
        console.log(error)
        dispatch({type:'getCourseLecturesFail',payload:error.response})
    }
}
