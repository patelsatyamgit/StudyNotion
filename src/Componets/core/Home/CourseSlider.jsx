import React from 'react'
import { useEffect } from 'react';
import CourseCard from './CatalogCourseCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "../../../App.css";



import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';

const CourseSlider = (course) => {
    const [item,setitem]=useState(null);
    useEffect(()=>{
             setitem(course.course)
    },[course])
 
  return (
    <div className='px-6 py-9 bg-richblack-800 rounded-md'>
        <Swiper breakpoints={{
    300:{
        slidesPerView:1,
    },
    500: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
        loop={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination,Autoplay,Navigation]}
        navigation={true}
        centeredSlides={true}
        className="mySwiper"
        autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}

      >
        {(
                item  &&  item.length > 0 ? item.map((value, index) => (
                  
                            
                    <SwiperSlide key={index}>
                    <CourseCard course={value} />
                    </SwiperSlide>
                  

  )
  ):<span className='text-2xl mx-auto text-richblack-50 font-inter font-bold'>
    No course present for this category
  </span>
  
            )
        }
           
        </Swiper>

    </div>
  )
}

export default CourseSlider;
