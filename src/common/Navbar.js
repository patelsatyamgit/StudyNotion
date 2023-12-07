import React, { useEffect, useState } from 'react'
import logo from "../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../data/navbar-links'
import { Link } from 'react-router-dom'
import {FiChevronDown} from "react-icons/fi"
import {BiSolidCartAdd} from "react-icons/bi";
import {GiHamburgerMenu} from "react-icons/gi"
import { useSelector,useDispatch } from 'react-redux'
// import { setLoading } from '../slices/authSlice'

import ProfileDropDown from '../Componets/core/Auth/ProfileDropDown'
    import {apiConnector} from '../services/apiconnector'
    import { categories } from '../services/apis'
import { TbCarTurbine } from 'react-icons/tb'
import {ImCross} from "react-icons/im"

 const Navbar = () => {
     const dispatch=useDispatch();
    const {token}=useSelector((state)=> state.auth)
    const {user}=useSelector((state)=> state.profile);
    const {total}=useSelector((state)=> state.cart);

    const [subLinks,setSubLink]=useState([]);
    const [currentCategory,setCurrentCategory]=useState("")
    const {CATEGORIES_API}=categories;
    const [activeHamberger,setactiveHamberger]=useState(false);
  
    const fetchSublinks= async()=>{
      
        dispatch(setLoading(true));
        try {
            const result=await apiConnector("GET",CATEGORIES_API);
            // console.log("Printing sublinks results:",result.data.data);
            setSubLink(result.data.data);

        } catch (error) {
            console.log("Could not fetch the Category list",error);
        }
        dispatch(setLoading(false));
    }
    useEffect(()=>{
        fetchSublinks();  
    },[])
   
  return (
     <div className='relative w-full '>
           <div className='bg-richblack-700 w-full z-50  border-b-[1px] border-pure-greys-600 fixed '>
            <div className='w-11/12 max-w-maxContent mx-auto flex justify-between h-[10vh] items-center'>
        
            <Link to={"/"}>
                <img src={logo} loading='lazy' width={160} height={42}/>
            </Link>
        <div className=' gap-9 hidden md:flex'>
            {
                NavbarLinks.map((element,index)=>{
                        return <Link to={element?.path} key={index} onClick={()=>{
                            setCurrentCategory(element.title)
                        }}>
                        <div className={`flex   text-pure-greys-100 relative `}>
                            <p className={`${currentCategory==element.title?"text-yellow-50":""}`}>{element.title}</p>
                            
                            {element.title=="Catalog"?(
                                <div className='text-lg group relative'>
                                    <button type="" >
                                    <FiChevronDown/>
                                    </button>
                                    <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                 top-[-70%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px] z-50'>

                                <div className='absolute left-[40%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`/catelog/${subLink.name.replace(" ","-")}`} key={index}>
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>
                                 
                                </div>
                            ):""
                            
                        }
                        </div>
                        </Link>
                })
            }
            
        </div>
          {/* Login/SignUp/Dashboard */}
          <div className='md:flex gap-x-4 items-center hidden'>
            

{
    user && user.accountType != "Instructor" && (
        <Link to="/dashboard/wish-list" className='relative text-2xl text-white'>
            
            <BiSolidCartAdd />
            {
                total > 0 && (
                    <span className='bg-yellow-5 w-4 h-4 absolute text-richblack-700 text-[13px] text-center rounded-full flex items-center justify-center top-4 -right-3 animate-bounce'>
                        <p>{total}</p>
                    </span>
                )
            }
        </Link>
    )
}
{
    token === null && (
        <Link to="/login">
            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                Log in
            </button>
        </Link>
    )
}
{
    token === null && (
        <Link to="/signup">
            <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                Sign Up
            </button>
        </Link>
    )
}
{
    token !== null && <ProfileDropDown />
}
{/* <ProfileDropDown/> */}

</div>
          <div className='md:hidden'>
            <button type="button" className='text-richblack-25 text-2xl transition-all duration-200' onClick={()=>setactiveHamberger(!activeHamberger)}>
                {
                    !activeHamberger ?
                    <GiHamburgerMenu/>:
                    <ImCross/>
                }
            </button>
          </div>
       {
        activeHamberger ?(
            <div className='w-fit px-4 h-screen bg-richblack-600 bg-opacity-95 absolute top-[10vh] right-0 md:hidden'>
            <div className='flex justify-between items-center '>
              
  
              {
                  user && user.accountType != "Instructor" && (
                      <Link to="/dashboard/wish-list" className='relative text-2xl text-white' onClick={()=>setactiveHamberger(false)}>
                          
                          <BiSolidCartAdd />
                          {
                              total > 0 && (
                                  <span className='bg-yellow-5 w-4 h-4 absolute text-richblack-700 text-[13px] text-center rounded-full flex items-center justify-center top-4 -right-3 animate-bounce'>
                                      <p>{total}</p>
                                  </span>
                              )
                          }
                      </Link>
                  )
              }
              {
                  token === null && (
                      <Link to="/login">
                          <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md' onClick={()=>setactiveHamberger(false)}>
                              Log in
                          </button>
                      </Link>
                  )
              }
              {
                  token === null && (
                      <Link to="/signup" onClick={()=>setactiveHamberger(false)}>
                          <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                              Sign Up
                          </button>
                      </Link>
                  )
              }
              {
                  token !== null && <ProfileDropDown />
              }
              {/* <ProfileDropDown/> */}
              
              </div>
         {
          user &&  <h1 className='text-richblack-50 text-xl py-5 font-bold  border-b-[2px] border-richblack-900 '>{user.firstName +" "+ user.lastName}</h1>
  
         }
              <div className='py-4'>
                  
  
              <div className=' gap-9 flex flex-col'>
              {
                  NavbarLinks.map((element,index)=>{
                          return <Link to={element?.path} key={index} onClick={()=>{
                              setCurrentCategory(element.title)
                              setactiveHamberger(false);
                          }}>
                          <div className={`flex   text-pure-greys-100 relative `}>
                              <p className={`${currentCategory==element.title?"text-yellow-50":""}`}>{element.title}</p>
                              
                              {element.title=="Catalog"?(
                                  <div className='text-lg group relative'>
                                      <button type="" >
                                      <FiChevronDown/>
                                      </button>
                                      <div className='invisible absolute left-[30%]
                                      translate-x-[-50%] translate-y-[30%]
                                   top-[-50%]
                                  flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                  opacity-0 transition-all duration-200 group-hover:visible
                                  group-hover:opacity-100 lg:w-[300px] z-50'>
  
                                  <div className='absolute left-[40%] top-0
                                  translate-x-[80%]
                                  translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                  </div>
  
                                  {
                                      subLinks.length ? (
                                              subLinks.map( (subLink, index) => (
                                                  <Link to={`/catelog/${subLink.name.replace(" ","-")}`} key={index}>
                                                      <p>{subLink.name}</p>
                                                  </Link>
                                              ) )
                                      ) : (<div></div>)
                                  }
  
                                  </div>
                                   
                                  </div>
                              ):""
                              
                          }
                          </div>
                          </Link>
                  })
              }
              
          </div>
              </div>
  
  
            </div>

        ):""
       }

    </div>
        </div>
     </div>
  )
}
export default Navbar;
