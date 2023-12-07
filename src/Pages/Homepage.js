import React, { useEffect } from 'react'
import {FiArrowRight} from "react-icons/fi";
import "../App.css"
import Footeger from '../common/Footeger';
import ReactStars from "react-rating-stars-component";
import TimeLineSection from '../Componets/core/Home/TimeLineSection';
import ExploreMore from '../Componets/core/Home/ExploreMore';
import LearningSection from '../Componets/core/Home/LearningSection';
import { InstructorSection } from '../Componets/core/Home/InstructorSection';
import { Link } from 'react-router-dom';
import Button from "../Componets/core/Home/Button"
import HIghlightedText from "../Componets/core/Home/HIghlightedText"
import video from "../assets/Images/banner.mp4"
import Codeblocks from '../Componets/core/Home/Codeblocks';
import { getAllReviews } from '../services/operations/course';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "../App.css";
import UsersReview from '../Componets/core/Home/UsersReview';
import { useDispatch,useSelector } from 'react-redux';
import { setreviews } from '../slices/cartSlice';

function Homepage() {
    const dispatch=useDispatch();
  const reviews=async()=>{
        try {
            const result=await getAllReviews();
            // console.log("reviews",result);
            dispatch(setreviews(result));
        } catch (error) {
            console.log(error);
        }
       
    }
    useEffect(()=>{
        reviews();
    },[])
   const {loading}=useSelector((state)=>state.auth);
    const getEffectiveReview=(arr)=>{
                const temp=arr.split(" ");
                const len=temp.length;
                if(len>20){
                    return temp.slice(0,20).join(" ");
                }
                else{
                    return temp.join();
                }
    }
  return (
      !loading ? <div className="w-full  min-h-screen bg-richblack-900 relative overflow-x-hidden pt-[10vh]">
        {/* part one  */}
       
        <div className='w-[90%] lg:w-4/5 mx-auto mt-10 relative'>
        <div className='py-4 '>
        <Link to={"/signup"}>
        <div className='flex  items-center w-fit mx-auto gap-4  font-semibold rounded-xl px-4 py-1 bg-richblack-800 text-sm md:text-xl text-pure-greys-300 shadow-blue-400 group hover:bg-richblack-700'>
            <div className='group-hover:text-white'>
                Become an Instructor
            </div>
            <FiArrowRight className='group-hover:text-white'/>
        </div>

        </Link>
        
        </div>

        <div className='flex flex-col text-center gap-5 '>
            <h1 className='text-white text-xl md:text-2xl  mx-auto font-inter '>Empower Your Future with<p className='flex gap-4'> {<HIghlightedText text={"Coding-Skills"}/>}</p></h1>
            <p className='text-pure-greys-400 mx-auto md:max-w-[64%] font-inter text-sm text-start md:text-center'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
            <div className='flex gap-4 w-fit mx-auto'>
                <Button active={true} linkto={"/signup"}>
                    Learn More
                </Button>
                <Button active={false} linkto={"/login"}>
                    Take a Demo
                </Button>
            </div>
        </div>
        
        {/* videosection  */}

      
        <div className='lg:w-[70%] w-[90%] mx-auto mt-10 relative'>
            <div className='w-full bg-white h-full absolute -right-3 -bottom-3 z-10'>
                
            </div>
            <div className='z-20 relative shadowINs'>
            <video muted loop autoPlay  >
                <source src={video} type='video/mp4'></source>
            </video>
                
            </div>
           
        </div>
            
            {/* codeblocks  */}
            <Codeblocks

            position={"row"}
            heading={
                <span className=' font-bold text-xl md:text-2xl'>
                    <p className=' flex gap-3 '>
                    Unlock You <HIghlightedText text={"coding potential"} />
                    </p>
                    with our online courses.
                </span>
            }
            gradiant={true}
            paragraph={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

            CTCbutton1={<Button active={true} linkto={"/signup"}>Try It YourSelf {<FiArrowRight/>}</Button>}

            CTCbutton2={<Button linkto={"/login"} active={false}>Learn More</Button>}

            codebloc={`<!DOCTYPE html>\n<html>\nhead><title>Example</ \ntitle><linkerel="stylesheet"href="styles.css">\n /head>\nbody>\nh1><ahreff="/">Header</a>\n /h1>\nnav><ahef="one/">One</a><ahref="tow/">Two</\n a><href="three/">Three</a>\n /nav>`}



        />
        <Codeblocks


position={"row-reverse"}
gradiant={false}
heading={
    <span className='text-2xl font-bold'>
        <h1 className=' flex gap-3'>
        Start <HIghlightedText text={"coding in seconds"} />
        </h1>
        with our online courses.
    </span>
}

paragraph={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

CTCbutton1={<Button active={true} linkto={"/signup"}>Continue Lesson {<FiArrowRight/>}</Button>}

CTCbutton2={<Button linkto={"/login"} active={false}>Learn More</Button>}

codebloc={'<!DOCTYPE html>\n<html>\nhead><title>Example</ \ntitle><linkerel="stylesheet"href="styles.css">\n /head>\nbody>\nh1><ahreff="/">Header</a>\n /h1>\nnav><ahef="one/">One</a><ahref="tow/">Two</\n a><href="three/">Three</a>\n /nav>'}



/>
     
     <ExploreMore/>

        </div>
        {/* Part two  */}
        <div className='bg-richblack-5 '>
            <div className=' w-11/12 max-w-maxContent mx-auto '>
                <div className='crossbackground w-full py-24  flex '>
                    <div className=' mx-auto flex gap-6 mt-10 '>
                    <Button active={true} linkto={"/login"}>
                    Explore Full Catalog 
                    <FiArrowRight/>
                </Button>
                <Button active={false} linkto={"/signup"}>
                    Learn More
                </Button>
                </div>
                        
                    </div>
                
                {/* TimeLine Section  */}
                <TimeLineSection/>
                {/* Learning Section  */}
                <LearningSection/>
                
            </div>
        </div>
        {/* Part three  */}
        <div className='w-11/12 max-w-maxContent font-inter mx-auto'>
            <InstructorSection/>

            {/* <div className='text-center text-white mb-8 mt-8'>
                    <h1 className='text-2xl font-inter font-bold mb-10'>Reviews from other learner</h1>
                <Swiper
                     slidesPerView={3}
                     loop={true}
                     spaceBetween={30}
                     modules={[Autoplay,Navigation]}
                     navigation={true}
                     centeredSlides={true}
                     className="mySwiper"
                     autoplay={{
                         delay: 3000,
                         disableOnInteraction: false,
                       }}
                
                >

                    {
                        reviewss?.map((item,index)=>(
                            <SwiperSlide key={index}>
                                <div className='bg-richblack-800 rounded-sm py-4 px-4'>
                                    <div className='flex gap-5 '>
                                        <img src={item?.user?.image ? item?.user?.image :`https://api.dicebear.com/5.x/initials/svg?seed=${item?.user?.firstName} ${item?.user?.lastName}`} className='w-[60px] h-[60px] rounded-full'/>
                                        <div className='felx flex-col justify-start items-start'>
                                        <h4 className='text-richblack-25 font-bold text-xl text-start'>{item?.user?.firstName}</h4>
                                        <p>{item?.course?.courseName}</p>
                                    </div>
                                    </div>
                                    <div className='text-start font-inter text-richblack-300 text-sm py-5 h-[66px] my-5'>
                                        {
                                           getEffectiveReview(item?.review)
                                        }
                                    </div>
                                    <div className='flex gap-3 items-center py-2'>
                                        <p>{item?.rating}</p>
                                        <ReactStars
                                        count={5}
                                        edit={false}
                                        value={item?.rating}
                                        onChange={()=>{}}
                                        size={24}
                                        activeColor="#ffd700"
                                        
                                        >

                                        </ReactStars>
                                    </div>
                                    
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
                
            </div> */}
            <UsersReview/>

            {/* reviews  */}
        </div>
        {/* Part four  */}
        <div className='w-full bg-richblack-800 py-10'>
        <div className='w-11/12 max-w-maxContent font-inter mx-auto'>
            <Footeger/>
        </div>
        </div>
       
       
    </div> : <div>
        ok
    </div>
  )
}

export default Homepage
