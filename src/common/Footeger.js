import React from 'react'

import logo from "../assets/Logo/Logo-Full-Light.png"
import { FooterLink1,FooterLink2 } from '../data/footer-links'
import { BsHeart } from 'react-icons/bs'
import { BiCopyright } from 'react-icons/bi'
// import { useSelector } from 'react-redux'
// import { useLocation } from 'react-router-dom'
const Footeger = () => {
 
  return (
    <div className='mt-10 '>
            <div className='  flex flex-wrap  justify-center gap-9 relative'>
            <div className='flex flex-col gap-4'>
                <img alt='demo' className='w-[150px]' src={logo} />
                <div className='flex flex-col gap-3'>
                    <h2 className='text-pure-greys-100 font-bold font-inter'>{FooterLink1[0].title}</h2>
                    {
                        FooterLink1[0].links.map((item,index)=>{
                         return <a href={item.link} className='text-pure-greys-400 text-sm font-inter hover:underline'>{item.title}</a>
                        })
                    }
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                   <div className='flex flex-col gap-3'>
                   <h2 className='text-pure-greys-100 font-bold font-inter'>{FooterLink1[1].title}</h2>
                    {
                        FooterLink1[1].links.map((item,index)=>{
                         return <a href={item.link} className='text-pure-greys-400 text-sm font-inter hover:underline'>{item.title}</a>
                        })
                    }
                   </div>

<div className='flex flex-col gap-3'>
                    <h2 className='text-pure-greys-100 font-bold font-inter'>{FooterLink1[2].title}</h2>
                    {
                        FooterLink1[2].links.map((item,index)=>{
                         return <a href={item.link} className='text-pure-greys-400 text-sm font-inter hover:underline'>{item.title}</a>
                        })
                    }
                </div>
                </div>
              
          
                
            <div className='flex flex-col gap-3'>
                    
                    <div className='flex flex-col gap-3'>
                    <h2 className='text-pure-greys-100 font-bold font-inter'>{FooterLink1[3].title}</h2>
                    {
                        FooterLink1[3].links.map((item,index)=>{
                         return <a href={item.link} className='text-pure-greys-400 text-sm font-inter hover:underline'>{item.title}</a>
                        })
                    }
                        
                    </div>
                    <div className='flex flex-col gap-3'>
                    <h2 className='text-pure-greys-100 font-bold font-inter'>{FooterLink1[4].title}</h2>
                    {
                        FooterLink1[4].links.map((item,index)=>{
                         return <a href={item.link} className='text-pure-greys-400 text-sm font-inter hover:underline'>{item.title}</a>
                        })
                    } 
                 </div> 
                </div>
                <div className='w-[1px] h- bg-richblack-700'>
            
           </div>
               
       
            <div className='flex flex-col gap-3'>
                    <h2 className='text-pure-greys-100 font-bold font-inter'>{FooterLink2[0].title}</h2>
                    {
                        FooterLink2[0].links.map((item,index)=>{
                         return <a href={item.link} className='text-pure-greys-400 text-sm font-inter hover:underline'>{item.title}</a>
                        })
                    } 
                 </div> 
                
           
            <div className='flex flex-col gap-3'>
                    <h2 className='text-pure-greys-100 font-bold font-inter'>{FooterLink2[1].title}</h2>
                    {
                        FooterLink2[1].links.map((item,index)=>{
                         return <a href={item.link} className='text-pure-greys-400 text-sm font-inter hover:underline'>{item.title}</a>
                        })
                    } 
                 </div> 
        
       
            <div className='flex flex-col gap-3'>
                    <h2 className='text-pure-greys-100 font-bold font-inter'>{FooterLink2[2].title}</h2>
                    {
                        FooterLink2[2].links.map((item,index)=>{
                         return <a href={item.link} className='text-pure-greys-400 text-sm font-inter hover:underline'>{item.title}</a>
                        })
                    } 
                 </div> 

             
       
            </div>
            <div className='w-full h-[1px] bg-richblack-600 mt-7 '>
                
            </div>
            <div className='text-pure-greys-500 flex flex-wrap justify-between mt-10'>
                <div className='flex gap-2 text-sm'>
                    <p>Privacy</p>
                    <p></p>
                    <p>Cookie Policy</p>
                    <p></p>
                    <p>Terms</p>
                </div>
                <div className='flex gap-2 justify-center items-center text-sm'>
                    <p>Made with</p>
                    <BsHeart className='text-pink-400'/>
                    <p>CodeHelp</p>
                    <BiCopyright/>
                    <p>{new Date().getFullYear()}</p>
                    <p>Studynotion</p>
                    
                </div>
            </div>
        </div>
   
  )
}

export default Footeger;
