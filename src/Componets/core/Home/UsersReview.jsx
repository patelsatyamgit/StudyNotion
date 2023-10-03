import React from 'react'

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "../../../App.css";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';

const UsersReview = () => {


   const {reviews}=useSelector((state)=>state.cart)
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
    <div className='text-center text-white py-6 bg-richblack-900'>
    <h1 className='text-2xl font-inter font-bold mb-10'>Reviews from other learner</h1>
<Swiper
breakpoints={{
    300:{
        slidesPerView:1,
    },
    600: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
     loop={true}
     spaceBetween={30}
     modules={[Autoplay,Navigation,Pagination]}
     navigation={true}
     pagination={true}
     centeredSlides={true}
     className="mySwiper"
     autoplay={{
         delay: 3000,
         disableOnInteraction: false,
       }}
       
       

>

    {
        reviews?.map((item,index)=>(
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

</div>
  )
}


export default UsersReview;