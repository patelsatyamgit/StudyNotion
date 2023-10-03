import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Componets/core/Dashboard/Sidebar';
import ConfirmationModule from '../Componets/core/Dashboard/ConfirmationModule';
import { AiOutlineDoubleRight,AiOutlineDoubleLeft } from 'react-icons/ai';

const Dashboard = () => {
  const [open,setOpen]=useState(false);
  const HandleOpen=(data )=>{
    setOpen(data);
    // setOpenn(open);
  }
  const[flag,setflag]=useState(false);
  return (
    <div className='flex flex-row w-full  pt-[10vh] relative'>
      <button onClick={()=>setflag(!flag)} className=' text-yellow-100 md:scale-0 fixed -left-1 top-[12vh] text-2xl z-50'>
       {
        flag? <AiOutlineDoubleLeft/>:<AiOutlineDoubleRight/>
       } 
      </button>
       <div className={`md:w-[15%] z-40 bg-richblack-700 h-[90vh] fixed transition-all duration-200 ${flag ?"w-[50%] bg-opacity-75 pt-10  ":"scale-0"} md:bg-opacity-100 md:pt-0 md:scale-100`}>
             <Sidebar modleOpen={HandleOpen}/>
       </div>
       <div className='z-10 md:flex-1 w-full pt-[2vh] bg-richblack-900 min-h-[90vh] md:pl-[18%]  '>
           <Outlet/>
       </div>
       {
        open? (<ConfirmationModule set={setOpen}/>):""

       }
    </div>
  )
}

export default Dashboard;