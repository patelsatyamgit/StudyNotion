import React, { useEffect, useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { useSelector} from 'react-redux';
import {TbLogout2} from "react-icons/tb"

const Sidebar = ({modleOpen}) => {

    const {user}=useSelector((state)=>state.profile);
    const [open,setOpen]=useState(false);
    useEffect(()=>{
        modleOpen(open);
    },[open])
  return (
    <div className='flex flex-col text-richblack-25 md:text-richblack-200 w-full justify-center pt-6 z-50 '>
        <div className=' flex flex-col gap-3'>
        {
            sidebarLinks.map((item)=>{

              if(item.type && user?.accountType!==item.type){
               
                return null;
              }
                return(<div key={item.id}><SidebarLink e={item}/>
                
                 </div>)
         })
        }
        </div>
        <div className='w-[90%] h-[1px] mx-auto bg-richblack-500 my-6'></div>
        <div className='flex flex-col  gap-2'>
            <SidebarLink e={{id:3,name:"Setting",icon:"VscGear",path:"/dashboard/setting"}}/>
            <button onClick={()=> setOpen(!open)} className='flex  gap-5 items-center pl-1'>
                <TbLogout2/>
                <p>Log Out</p>
            </button>
        </div>
    </div>
  )
}

export default Sidebar;