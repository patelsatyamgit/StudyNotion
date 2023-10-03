import React from 'react'
import { NavLink } from 'react-router-dom';
import * as Icons from "react-icons/vsc"
import { matchPath,useLocation } from 'react-router-dom';


const SidebarLink = ({e}) => {
    const Icon=Icons[e.icon];
    const location=useLocation();
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }
  return (
    <NavLink to={e.path} className={`flex gap-4 items-center pl-2 ${matchRoute(e.path)?"text-yellow-50 bg-yellow-300 bg-opacity-30 py-1 border-l-4":""}`}>
        <div className=''>
            <Icon/>
        </div>
       <div>
        {
            e.name
        }
       </div>
    </NavLink>

  )
}

export default SidebarLink;