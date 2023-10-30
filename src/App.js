import React, { useEffect } from 'react';
import { BrowserRouter as Router,Routes , Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Header from './components/layout/header/Header.js';
import Courses from './components/Courses/Courses.jsx';
import Footer from './components/layout/footer/Footer.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import ForgetPassword from './components/Auth/ForgetPassword.jsx';
import ResetPassword from './components/Auth/ResetPassword.jsx';
import Contact from './components/Contact/Contact.jsx';
import Request from './components/Request/Request.jsx';
import About from './components/About/About.jsx';
import Subscribe from './components/Payments/Subscribe.jsx';
import NotFound from './components/Payments/NotFound.jsx';
import PaymentSuccess from './components/Payments/PaymentFail.jsx';
import PaymentFail from './components/Payments/PaymentSuccess.jsx';
import CoursePage from './components/CoursePage/CoursePage.jsx';
import Profile from './components/Profile/Profile.jsx';
import ChangePassword from './components/Profile/ChangePassword.jsx';
import UpdateProfile from './components/Profile/UpdateProfile.jsx';
import Dashboard from './components/Admin/Dashboard/Dashboard.jsx';
import CreateCourse from "./components/Admin/CreateCourse/CreateCourse.js"
import AdminCourses from './components/Admin/AdminCourses/AdminCourses.jsx';
import Users from './components/Admin/Users/Users.jsx';
import { useDispatch, useSelector } from 'react-redux';
import toast,{Toaster} from "react-hot-toast"
import { loadUser } from './redux/actions/user.js';
import {ProtectedRoute} from "protected-route-react"
import Loader from './components/layout/loader/Loader.jsx';

function App() {

  const {isAuthenticated,user,message,error,loading} = useSelector(state=>state.user)
  const dispatch = useDispatch();
  useEffect(()=>{
      if(error){
        toast.error(error);
        dispatch({type:'clearError'})
      }
      if(message){
        toast.success(error);
        dispatch({type:'clearMessage'})
      }

    // eslint-disable-next-line      
    },[dispatch,error,message])
    useEffect(()=>{
      dispatch(loadUser())
  },[dispatch])

   
  return (
   <Router>
    {loading?(
      <Loader />
    ):(
      <>
      <Header isAuthenticated={isAuthenticated} user={user} />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/login" element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
          <Register />
        </ProtectedRoute>} />
        <Route path="/forgetpassword" element={
          <ProtectedRoute 
          isAuthenticated={!isAuthenticated}
          >
            <ForgetPassword />
          </ProtectedRoute>
        } />
        <Route path="/resetpassword/:token" element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
            <ResetPassword />
          </ProtectedRoute>
        } />
        <Route path='/contact' element={<Contact />} />
        <Route path="/request" element={<Request />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={
          <Subscribe user={user} />
        } />
        <Route path="/*" element={<NotFound />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/course/:id" element={
           <CoursePage user={user} />
        }  />
        <Route path="/changepassword" element={<ChangePassword />}  />
        <Route path="/updateprofile" element={
          <UpdateProfile user={user} />
        } />
        <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
          <Profile user={user} />
        </ProtectedRoute>} />
  
        {/* Admin Dashboard */}
          <Route path="admin/dashboard" 
        
          element={
            <Dashboard />
          
          } />
        <Route path="/admin/createcourse" element={<CreateCourse />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/users" element={<Users />} />
       </Routes>
      <Footer />
      <Toaster />
      </>
    )}
    
   </Router>

  );
}

export default App;
