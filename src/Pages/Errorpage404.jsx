import React from 'react'
import errorimage from "../assets/Images/404jpeg.jpeg";
import { Link } from 'react-router-dom';

const Errorpage404 = () => {
  return (
    <div className='w-full h-[100vh] bg-richblack-800 flex justify-center items-center pt-[10vh]'>
        <div className='flex flex-col justify-center gap-5'>
            <img className='h-[300px] rounded-xl '  src={errorimage} alt='Page Not Found error'/>
            <Link to={"/"} className='bg-yellow-200 text-black px-5 py-2 rounded-xl text-center hover:bg-yellow-5 hover:text-richblack-700'>
                  Go to home page
            </Link>
        </div>

    </div>
  )
}
export default Errorpage404;
