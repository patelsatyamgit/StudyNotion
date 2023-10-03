import React from 'react'
import { useState } from 'react';
import { getCourseDetails } from '../services/operations/course';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import GetAvgRating from '../utils/avgRating';
import ReactStars from "react-rating-stars-component";
import {  BiSolidVideos } from 'react-icons/bi';
import {FaRegShareSquare} from "react-icons/fa"
import Footeger from "../common/Footeger"
import CopyToClipboard from 'react-copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import toast from 'react-hot-toast';
import ConfirmationModule from '../common/ConfirmationModule';
import { BuyCourse } from '../services/operations/userFiture';

const CoursePurchasepage = () => {
    const[course,setcourse]=useState(null);
    const{user}=useSelector((state)=>state.profile);
    const {courseId}=useParams();
    const {token} =useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const[state,setStateflag]=useState(false);
    const location=useLocation();
    const navigate=useNavigate();
    const [averageRating,setAverageRating]=useState(0);
    const [confirstmationModule,setConfirmation]=useState(null);
    const hadleByCourse=()=>{
        if(user){
            BuyCourse(token,[courseId],user,navigate,dispatch);
            return;
        }

        setConfirmation({
            text1:"You are not logged IN",
            text2:"Please login to Puchase a course",
            btn1text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=> navigate("/login"),
            btn2Handler:()=> setConfirmation(null)
        })
         

    }
    const getcourseDetailsf=async()=>{

        try {
            const result=await getCourseDetails({course_id:courseId})
            if(result){
                setcourse(result[0]);
            }
            setAverageRating(GetAvgRating(result[0].ratingAndReview))
            // console.log("result----",result[0]);
            
        } catch (error) {
            console.log(error);
        }
    }
    const ifAlreadyPurchase=()=>{
        if(course?.studentsEnrolled?.includes(user?._id)){
            return true;
        }
        return false
    }
    useEffect(()=>{
            getcourseDetailsf();
            // console.log("okk",ifAlreadyPurchase());
    },[])
  
  return (
    <div className='w-full bg-richblack-900 '>
        <div className='md:w-11/12 w-[98%]  min-h-screen pt-[10vh] bg-richblack-900 relative mx-auto'>
        {/* FIRST SECTION  */}
        <section className='bg-richblack-800 w-full font-inter py-20 px-4 flex flex-col gap-5 relative'>
            <div className=' w-[90%] md:w-[60%] flex flex-col gap-2'>
                <h2 className='font-bold text-2xl text-richblack-5'>{course?.courseName}</h2>
                <p className='text-richblack-300 '>{course?.courseDescription}</p>
                <div className='flex gap-2 flex-wrap items-center'>
            <p className='text-yellow-200 font-bold'>{averageRating}</p>
             <ReactStars
                   count={5}
                   value={averageRating}
                   
                   size={25}
                   edit={false}
                  activeColor="#ffd700"
                  half={true}
             
             />
            <p className='text-richblack-300'>{course?.ratingAndReview?.length} Review</p>
            <p className='text-richblack-300'>(EnrolledStudent- {course?.studentsEnrolled?.length}) </p>
             
             
          
          </div>
               <p className='text-richblack-300'>Created By- {course?.instructor?.firstName+" "+course?.instructor?.lastName}</p>

               <p className='text-richblack-300'>Created at June 6, 2023 | 1:33 PM</p>
            </div>

            {/* paymentsection  */}
            <div className=' w-[90%] md:w-[350px] bg-richblack-700 rounded-lg pb-10 md:absolute right-3 -bottom-44'>
                <img src={course?.thumbnail} alt="" />
                <div className='flex flex-col justify-center  items-center gap-3'>
                    <p className='text-richblack-25 font-bold font-inter text-2xl mt-2'>Rs.{course?.price}</p>
                    <button className='bg-yellow-200 py-1 w-[80%] mx-auto rounded-md' type='button' onClick={hadleByCourse}>Buy Now</button>
                    <button  className='bg-richblack-800 py-1 w-[80%] mx-auto text-richblack-100 rounded-md' type='button' onClick={()=> {
                      user ? ifAlreadyPurchase() ? toast.success("Your have Purchased this course" ) :dispatch(addToCart(course)): toast.success("First loging then add")
                        
                    }}>Add to Cart</button>
                </div>
                <p className='text-center text-richblack-300 text-sm'>30-Day Money-Back Guarantee</p>
                <CopyToClipboard text={window.location.href}
                 onCopy={() => {
                    setStateflag(true)
                    const myTimeout = setTimeout(myGreeting, 2000);

                function myGreeting() {
                        setStateflag(false)
                }
                 }}>
                <p  type='button' className='flex gap-1 mx-auto text-richblack-100 mt-3 justify-center relative w-fit cursor-pointer'><FaRegShareSquare/> Share
                {state ? <span className='absolute -right-7 bg-pink-100 rounded-lg text-[10px] px-1 top-6' style={{color: 'red'}}>Copied.</span> : null}
                </p>
                
                </CopyToClipboard>
                
               
            </div>
           
        </section>
        {/* section two  */}
        <section className='bg-richblack-900 w-11/12 mx-auto py-10  border-b-[2px] pb-5 border-richblack-25'>
            <div className='px-3 py-4 flex flex-col gap-3 border-[1px] border-richblack-50 md:w-[60%]'>
                <h3 className='font-inter font-bold text-richblack-25 text-2xl'>What you'll learn</h3>
                <p className='text-richblack-300 font-inter'>{course?.whatYouWillLearn[0]}</p>
            </div>
            <div className='mt-5  flex flex-col gap-3'>
                <h3 className='font-bold text-richblack-25 text-2xl font-inter'>Course Content</h3>
                <p className='text-richblack-300'>{course?.courseContent?.length} sections {course?.courseContent[0]?.subSection?.length} lectures</p>

                <div>
                    <details className='md:w-[60%] border-[1px] border-richblack-100'>
                        <summary className='w-full bg-richblack-600 py-5 px-3 outline-none text-richblack-100 font-inter font-bold'>
                        Here you can see content of this course
                        </summary>
                        <div className='pl-4'>
                          {
                            course && course.courseContent && course.courseContent.map((item,index)=>(
                                <details key={index}>
                                    <summary className='w-full  py-5 px-3 outline-none text-richblack-100 font-inter font-bold border-b-[1px] border-richblack-200' >{item.sectionName}</summary>
                                    {
                                       course && course?.courseContent && course?.courseContent[0]?.subSection.map((item,index)=>(
                                        
                                           <div className='w-full  py-5 px-3 outline-none text-richblack-100 font-inter font-bold flex gap-2 items-center' key={index}>
                                              <BiSolidVideos/>  {item.title}
                                           </div>
                                       ))
                                    }
                                </details>
                            )

                            )
                          }
                        </div>
                            
                    </details>
                </div>
            </div>

            <h1 className='mt-5 text-richblack-25 font-inter font-bold text-2xl'>
                Author
            </h1>
            <div className='flex gap-3 items-center mt-5'>
            <img src={course?.instructor?.image} className='w-[50px] rounded-full' alt="" />
            <h3 className='text-richblack-25 font-bold text-xl '>{course?.instructor?.firstName+" "+course?.instructor?.lastName}</h3>
            </div>

        </section>
        <Footeger/>
      {
        confirstmationModule && <ConfirmationModule dataModule={confirstmationModule}/>
      }
    </div>
    </div>
    
  )
}

export default CoursePurchasepage;