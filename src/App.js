import "./App.css";
import { Route,Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Homepage";
import Navbar from "./common/Navbar";
import Contactus from "./Pages/Contactus";
import OpenRoute from "./Componets/core/Auth/OpenRoute";
import ResetPasswordToken from "./Pages/ResetPasswordToken";
import Updatepassword from "./Pages/Updatepassword";
import VarifyEmail from "./Pages/VarifyEmail";
import About from "./Pages/About";
import Errorpage404 from "./Pages/Errorpage404";
import Dashboard from "./Pages/Dashboard";
import Myprofile from "./Componets/core/Dashboard/Myprofile";
import InstructorDesboard from "./Componets/core/Dashboard/Instructor/InstructorDesboard"
import EnrolledCourses from "./Componets/core/Dashboard/EnrolledCourses";
import PurchaseHistory from "./Componets/core/Dashboard/PurchaseHistory";
import WishList from "./Componets/core/Dashboard/WishList";
import Setting from "./Componets/core/Dashboard/Setting";
import PrivateRoute from "./Componets/core/Auth/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constant";
import Addcourse from "./Componets/core/Dashboard/Addcourse";
import MyCourses from "./Componets/core/Dashboard/Instructor/MyCourses";
import CatalogCoursesPage from "./Pages/CatalogCoursesPage"
import CoursePurchasepage from "./Pages/CoursePurchasepage";
import { useEffect } from "react";
import { logout } from "./services/operations/authAPI";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Componets/core/ViewCourses/VideoDetails"
function App() {
  const {user}=useSelector((state)=>state.profile)
  const {timeout,token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{

    const timenow=Date.now();
    // console.log(localStorage);
 
  return (
   <div className="relative">
    <Navbar/>
    <Routes>
      <Route path="catelog/:categoryName" element={<CatalogCoursesPage/>}></Route>
      
       <Route path="courses/:courseId" element={<CoursePurchasepage/>}></Route>
      
      
      <Route path="/" element={<Home/>}></Route>
       <Route path="/login" element={
        <OpenRoute>
          <Login/>
        </OpenRoute>
       }>
    </Route>
       <Route path="/forgot-password" element={
        <OpenRoute>
          <ResetPasswordToken/>
        </OpenRoute>
       }>
    </Route>
    <Route path="/signup" element={
      <OpenRoute>
        <Signup/>
      </OpenRoute>
    }>
    </Route>
    <Route path="/contact" element={<Contactus/>}>
    </Route>
    <Route path="/update-password/:id" element={<Updatepassword/>}>
    </Route>
    <Route path="/verify-email" element={<VarifyEmail/>}>
    </Route>
    <Route path="/about" element={<About/>}>
    </Route>
    <Route path="*" element={<Errorpage404/>}>
    </Route>
    <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT &&  (
            <>

              <Route path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId" element={<VideoDetails/>}></Route>
            
            </>
          )
        }

    </Route>
    <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path="/dashboard/my-profile" element={<Myprofile/>}>
          </Route>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&(
              <>
                      <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}>
                  </Route>
                  <Route path="/dashboard/purchase-history" element={<PurchaseHistory/>}>
                  </Route>
                        <Route path="/dashboard/wish-list" element={<WishList/>}>
                </Route>
                    
              </>
            )
          }
          {

            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                    <Route path="/dashboard/add-course" element={<Addcourse/>}>
                    </Route>
                    <Route path="/dashboard/instructor" element={<InstructorDesboard/>}>
                    </Route>
                    <Route path="/dashboard/My-courses" element={<MyCourses/>}>
                    </Route>
              </>
            )
          }
        
          <Route path="/dashboard/setting" element={<Setting/>}>
          </Route>

    </Route>
    </Routes>
    
   </div>
  );
})

}

export default App;
