import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import GetAvgRating from '../../../utils/avgRating';
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../slices/cartSlice';

const WishList = () => {
  const{cart,totalItems}=useSelector((state)=>state.cart)
  const dispatch=useDispatch();
  useEffect(()=>{
    // console.log(cart);

  },[])
  return (
    <div className='py-4 mt-6 w-11/12 mx-auto'>
      <h1 className='text-richblack-25 font-inter font-bold text-2xl mt-5
      '>Wish List</h1>
      <p className='text-richblack-400 py-2 border-b-[1px] border-richblack-500'>{cart?.length} Courses in Cart</p>
      <div className='flex gap-3 flex-col md:flex-row'>
        <div className='sm:w-[70%] flex flex-col gap-3 py-3'>
          {
            cart && cart.map((item,index)=>(
              <div className='flex gap-5 flex-col sm:flex-row'>
                <img src={item.thumbnail} className='w-[300px] rounded-xl' alt="thumbnail" />
                <div>
                  <h3 className='text-richblack-25 font-bold text-xl'>{item?.courseName}</h3>
                  <p className='text-richblack-400 font-inter'>{item?.courseDescription.substring(0,30)}</p>
                  <div className='flex gap-2 items-center flex-wrap'>
            <p className='text-yellow-200 font-bold'>{GetAvgRating(item?.ratingAndReview)}</p>
             <ReactStars
                   count={5}
                   value={GetAvgRating(item?.ratingAndReview)}
                   
                   size={25}
                   edit={false}
                  activeColor="#ffd700"
                  half={true}
             
             />
            <p className='text-richblack-300'>{item?.ratingAndReview?.length} Review</p>
            <p className='text-richblack-300'>(EnrolledStudent- {item?.studentsEnrolled?.length}) </p>
             
             
          
                   </div>
                   <p className='font-inter font-bold text-caribbeangreen-100'>{item?.price}</p>
                   <button className='text-[#ff0000] px-2 py-1 border bottom-[#ff0000] rounded-lg flex mt-5' onClick={()=>{
                        dispatch(removeFromCart(item._id));
                   }}>Remove</button>
                </div>
              </div>
            ))
          }
        </div>
        <div className='flex-1'>
            <div className='flex flex-col bg-richblack-700 py-6 border border-richblack-200 mt-5 gap-5 px-4 rounded-lg'>
                <p className='text-richblack-400'>Total:</p>
                <h1  className='text-yellow-200 font-bold text-2xl'>{totalItems}</h1>
                <button className='bg-yellow-200 px-6 py-1 rounded-md w-[80%] mx-auto'>Buy Now</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default  WishList;