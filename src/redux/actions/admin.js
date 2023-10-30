import {server} from "../store"
import axios from "axios"


export const createCourse  = (formData) => async(dispatch) =>{
    try{
        const config={
            headers:{
                'Content-type':'multipart/form-data',
            },
            withCredentials:true,
        };
        dispatch({type:'createCourseRequest'});
        const {data} = await axios.post(
            `${server}/createcourse`,
            formData,
            config
        )
        dispatch({type:'createCourseSuccess',payload:data.message});
    }catch(error){
        dispatch({
            type:'createCourseFail',
            payload:error.response.data.message,
        })
    }
}
export const deleteCourse  = (id) => async(dispatch) =>{
    try{
        const config={
            withCredentials:true,
        };
        dispatch({type:'deleteCourseRequest'});
        const {data} = await axios.delete(
            `${server}/course/${id}`,
            config
        )
        console.log(id)
        console.log(data);
        dispatch({type:'deleteCourseSuccess',payload:data.message});
    }catch(error){
        console.log(error)
        dispatch({
            type:'deleteCourseFail',
            payload:error.response.data.message,
        })
    }
}
export const addLecture  = (id,formdata) => async(dispatch) =>{
    try{
        const config={
            headers:{
                'Content-type':'multipart/form-data'
        },
            withCredentials:true,
        };
        dispatch({type:'addLectureRequest'});
        const {data} = await axios.post(
            `${server}/course/${id}`,
            formdata,
            config
        )
        console.log(id)
        dispatch({type:'addLectureSuccess',payload:data.message});
    }catch(error){
        dispatch({
            type:'addLectureFail',
            payload:error.response.data.message,
        })
    }
}

export const deleteLecture  = (courseId,lectureId) => async(dispatch) =>{
    try{
        const config={
            withCredentials:true,
        };
        dispatch({type:'deleteLectureRequest'});

        const {data} = await axios.delete(
            `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
            config
        )
        console.log(data);
        dispatch({type:'addLectureSuccess',payload:data.message});
    }catch(error){
        console.log(error)
        dispatch({
            type:'addLectureFail',
            payload:error.response,
        })
    }
}

export const getAllUsers  = () => async(dispatch) =>{
    try{
       
        dispatch({type:'getAllUsersRequest'});

        const {data} = await axios.get(
            `${server}/admin/users`,{
                withCredentials:true
            }
        )
        console.log(data);
        dispatch({type:'getAllUsersSuccess',payload:data.users});
    }catch(error){
        console.log(error)
        dispatch({
            type:'getAllUsersFail',
            payload:error.response,
        })
    }
}


export const updateUserRole  = (id) => async(dispatch) =>{
    try{
       
        dispatch({type:'updateUserRoleRequest'});

        const {data} = await axios.put(
            `${server}/admin/user/${id}`,{},{
                withCredentials:true
            }
        )
        console.log(data);
        dispatch({type:'updateUserRoleSuccess',payload:data.message});
    }catch(error){
        console.log(error)
        dispatch({
            type:'updateUserRoleFail',
            payload:error.response,
        })
    }
}

export const deleteUser  = (id) => async(dispatch) =>{
    try{
       
        dispatch({type:'getAllUsersRequest'});

        const {data} = await axios.delete(
            `${server}/admin/user/${id}`,{
                withCredentials:true
            }
        )
        console.log(data);
        dispatch({type:'getAllUsersSuccess',payload:data.users});
    }catch(error){
        console.log(error)
        dispatch({
            type:'getAllUsersFail',
            payload:error.response,
        })
    }
}



export const getDashboardStats  = (id) => async(dispatch) =>{
    try{
       
        dispatch({type:'getAdminStatsRequest'});

        const {data} = await axios.get(
            `${server}/admin/stats`,{
                withCredentials:true
            }
        )
        console.log(data);
        dispatch({type:'getAdminStatsSuccess',payload:data});
    }catch(error){
        console.log(error)
        dispatch({
            type:'getAdminStatsFail',
            payload:error.response,
        })
    }
}

