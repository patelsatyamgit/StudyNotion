import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uploadProfile } from '../../../services/operations/update';
import { useRef } from 'react';
import EditAbout from './Setting/EditAbout';
import EditInfo from './Setting/EditInfo';
import {FiUpload} from "react-icons/fi"
import EditPassword from './Setting/EditPassword';
import DeleteProfile from './Setting/DeleteProfile';
 const Setting = () => {
  const {user}=useSelector((state)=>state.profile);
  const [Changestate,setchangestate]=useState(false);
  const [imagefile,setImagefile]=useState(null);
  const {token} =useSelector((state)=>state.auth);

  const [previewfile,setPreviewfile]=useState(null);


  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const onchangeHandler=(event)=>{
    const file = event.target.files[0];
    // console.log("file",file)
    if(file){
      setImagefile(file);
      previewFile(file);
    }
  }
  const previewFile=(file)=>{
             const reader=new FileReader();
             reader.readAsDataURL(file);
             reader.onloadend=()=>{
              setPreviewfile(reader.result)
             }
  }
  const {profilepicture}=useSelector((state)=>state.profile);
  const dispatch=useDispatch();
  const handleSubmit=(e)=>{
    try{
                e.preventDefault();
                const formdata=new FormData();
                formdata.set("displayPicture",imagefile);
               dispatch(uploadProfile(formdata,token)).then((ee) => {
               
                setchangestate(false);
                setImagefile(null);
                const objj={...user,image:ee.data.data.image};
          
                localStorage.setItem('user',JSON.stringify(objj));
              })
            } catch (error) {
              console.log("ERROR MESSAGE - ", error.message)
            };
  }
  return (
    <div className='md:px-6 py-5' >
      <h1 className='text-richblack-25 font-inter font-bold text-2xl '>Edit Profile</h1>
      <div className=' pl-2 md:pl-16 w-11/12 mt-6'>
        <div className='bg-richblack-800 rounded-sm px-4 py-7 flex gap-5   border-[1px] border-richblack-600  '>
          <div>
            <img className=' w-[80px] h-[80px] rounded-full hover:scale-150 transition-all duration-200' src={previewfile ||user?.image} alt="" />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-richblack-5 font-inter'>Change profile picture</p>
            <div className='flex gap-6'>
              <div>
             {
              !Changestate?(
                    <button className='bg-yellow-300 px-2 py-1 rounded-lg text-richblack-8000' onClick={()=>setchangestate(true)}>Change</button>
              ):(
                  <div>
                   <form onSubmit={handleSubmit}>
                        <input ref={fileInputRef} required className='w-[93px] hidden' 
                        type="file" accept="image/jpeg, image/png" onChange={onchangeHandler}  />
                        <button onClick={handleClick} className='bg-yellow-50 text-richblack-900 px-6 rounded-lg py-2 flex gap-2 items-center'>
                               Select
                               <FiUpload/>
                        </button>
                          <p className='text-pink-400 font-inter font-bold'>{imagefile?(imagefile.name):""}</p>
                          <div className='flex gap-2 mt-2'>
                            <button  type='submit' className='bg-yellow-300 px-2 py-2 rounded-lg text-richblack-8000 h-fit'>Ok</button>
                            <button className='bg-yellow-300 px-2 py-2 rounded-lg text-richblack-8000 h-fit' onClick={()=>{
                              setchangestate(false);
                              setImagefile(null);
                              setPreviewfile(null);
                            }}>cancel</button>
                          </div>
                   </form>

                  </div>
              )
             }
              </div>
              <button className='bg-yellow-300 px-2 py-1 rounded-lg text-richblack-8000 h-fit'>Remove</button>
            </div>
          </div>
        </div>

        {/* edit about */}

        <EditAbout/>

        {/* edit profile  */}

        <EditInfo/>

        {/* edit password  */}
        <EditPassword/>

        {/* Delete profile  */}

        <DeleteProfile/>

      </div>
    </div>
  )
}
export default Setting;
