import React, { useEffect, useState } from 'react'
import {FiChevronDown} from "react-icons/fi"
import Footeger from '../common/Footeger';
import {TbMessages} from "react-icons/tb"
import {GiWorld} from "react-icons/gi"
import {MdWifiCalling2} from "react-icons/md"
import Button from '../Componets/core/Home/Button';
import searchingalfa from '../data/SearchingAlfa';
import countrycode from '../data/countrycode';
import UsersReview from '../Componets/core/Home/UsersReview';
 const Contactus = () => {
  const [currentCity,setcurrentcity]=useState("+91")
  const [currentTab,setcurrentTab]=useState(searchingalfa[0].title)
  const [selector,setselector]=useState(false);
  const [cities,setcities]=useState(countrycode);

   function citySorting(){
     
       if(currentTab!=[searchingalfa[0].title])
       {
        const ans=countrycode.filter((element)=> element.country.charAt(0)==currentTab );
        setcities(ans)
       }
       else{
           setcities(countrycode);
       }
   }

   useEffect(()=>{
              citySorting();
   },
   [currentTab])


  return (
    <div className='bg-richblack-900 overflow-x-hidden pt-20'>
      <div className='w-11/12 max-w-maxContent mx-auto'>
        {/* first section  */}
        <div className='flex flex-col md:flex-row gap-4 justify-around mt-10 mb-20 '>
          {/* left  */}
          <div className='bg-richblack-800 p-5 flex flex-col gap-5 rounded-lg h-fit'>
            <div className='flex gap-4 '>
              <div className='text-richblack-200 text-xl'>
                <TbMessages/>
              </div>
              <div>
                <h3 className='text-richblack-200 font-inter font-bold'>Chat on us</h3>
                <p className='text-richblack-400 font-inter text-[12px]'>Our friendly team is here to help</p>
                <p className='text-richblack-400 font-inter text-[12px]'>@mail.com</p>
              </div>
              
            </div>
            <div className='flex gap-4'>
              <div className='text-richblack-200 text-xl'>
                <GiWorld/>
              </div>
              <div>
                <h3 className='text-richblack-200 font-inter font-bold'>Visit us</h3>
                <p className='text-richblack-400 font-inter text-[12px]'>Come and say hello at our office HQ</p>
                <p className='text-richblack-400 font-inter text-[12px]'>Here is the location/address</p>
              </div>
              
            </div>
            <div className='flex gap-4'>
              <div className='text-richblack-200 text-xl'>
                <MdWifiCalling2/>
              </div>
              <div>
                <h3 className='text-richblack-200 font-inter font-bold'>Call us</h3>
                <p className='text-richblack-400 font-inter text-[12px]'>Mon-Fri From 8am to 5pm</p>
                <p className='text-richblack-400 font-inter text-[12px]'>+91-1234567892</p>
              </div>
              
            </div>
          </div>
          {/* right  */}
          <div className='flex flex-col gap-4 '>
            <div>
            <h1 className='text-richblack-5 text-2xl font-bold font-inter'>Got Idea? We've got the skills. Let's team up</h1>
            <p className='text-richblack-500'>Tell us more about yourself and what you're got in mind</p>
            </div>
            <div className='flex gap-3'>
              <div className='w-[50%]'>
                <p className='text-richblack-50 font-inter text-[14px]'>First Name</p>
                <input type='text' placeholder='Enter first name' className='w-full bg-richblack-800 rounded-xl px-3 py-1 placeholder:text-sm text-richblack-50 outline-none font-inter '/>
              </div>
              <div className='w-[50%]'>
              <p className='text-richblack-50 font-inter text-[14px]'>Last Name</p>
                <input type='text' placeholder='Enter last name' className='w-full bg-richblack-800 rounded-xl px-3 py-1 placeholder:text-sm outline-none text-richblack-50 font-inter'/>
              </div>
            </div>
            <div>
              <p className='text-richblack-50 font-inter text-[14px]'>Email Address</p>
              <input type='email' placeholder='Enter email address' className='w-full bg-richblack-800 rounded-xl px-3 py-1 placeholder:text-sm outline-none text-richblack-50 font-inter'/>
            </div>
            <div className='flex flex-col gap-2 cursor-pointer'>
              <p className='text-richblack-50 font-inter text-[14px] '>Phone Number</p>
              <div className='flex gap-5'>
                <div className='bg-richblack-800 px-2 text-center flex items-center text-richblack-50 rounded-lg gap-2 relative' onClick={
                    ()=>{
                         selector?setselector(false):setselector(true);
                    }
                  }
                  >
                  <div className='relative'>
                    {currentCity}
                  </div>
                  <div className='relative' >
                    <FiChevronDown/>
                  </div>
                  <div className={`absolute w-[250px] h-[290px] bg-richblack-700 top-[125%] rounded-lg ${selector?"scale-100":"scale-0"} z-50  px-4 flex flex-col gap-1`}>

                  <div className='flex flex-wrap gap-[4.5px] bg-richblack-700 relative'>
                              {
                                searchingalfa.map((element,index)=>{
                                  return <p className={`px-[2.44px] text-[10px] rounded-lg ${element.title==currentTab?"bg-richblack-900 text-white":"bg-richblack-600"}`}
                                  onClick={(event)=>{
                                    event.stopPropagation();
                                    setcurrentTab(element.title)
                                  }}>{element.title}</p>
                                })
                              }

                            </div>
                      <div className='flex
                      flex-col text-richblack-25  justify-start  relative h-full gap-1 transition-all duration-200 py-3 overflow-y-scroll snap-normal '>
                         
                      {
                        cities.map((element,index)=>(
                          <div key={index} className=' flex justify-between font-inter ' onClick={()=>{
                            setcurrentcity(element.code)
                          }}>
                           
                                 <p>{element.country.substring(0,15)}</p>
                                 <p className='text-center font-bold text-white '>{element.code}</p>
                          </div>
                              
                        ) )
                      }

                        
                      </div>



                    {/* <div className='absolute w-[50px] h-[50px] bg-richblack-50 top-[-2%] left-[11%] rotate-45 -z-50'>
                      
                    </div> */}
                    
                  </div>
                </div>
                <div>
                  <input type='text' maxLength={10}   pattern="\d{10}" placeholder='1234567891' className='w-full bg-richblack-800 rounded-xl px-3 py-1 placeholder:text-sm outline-none text-richblack-50 font-inter' />
                </div>
              </div>
            </div>
            <div>
              <p className='text-richblack-50 font-inter text-[14px]'>Message</p>
              <div>
                <textarea rows="4" className='w-full bg-richblack-800 rounded-xl px-3 py-1 placeholder:text-sm outline-none text-richblack-50 font-inter' placeholder='Enter your message here...'/>
              </div>
            </div>
          <Button active={true} linkto={""}>
            Send Message
          </Button>
          </div>
        </div>
        <UsersReview/>
      </div>
        <Footeger/>
    </div>
  )
}

export default Contactus;