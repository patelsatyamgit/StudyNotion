import React, { useState } from 'react'
import contrycode from "../../../../data/countrycode";
import { useForm } from 'react-hook-form';
import { useSelector,useDispatch } from 'react-redux';
import { updateInfo } from '../../../../services/operations/update';
const EditInfo = () => {
    const [code,setcode]=useState("+91");
    const {register,handleSubmit,reset,formState:{errors}}=useForm();
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const handleformsubmit=async(data)=>{
                    const {countrycode,contactNumber}=data;
                    
                        const codee=countrycode.split(" ");
                        //  const newPhone=codee[0]+"-"+contactNumber;;

            
                    dispatch(updateInfo(data,token,user)).then((result) => {
                        console.log("user",user);
                    })
    }
  return (
    <div className='bg-richblack-800 mt-10 px-2 md:px-8 py-7 rounded-md pb-0   border-[1px] border-richblack-600  '>
        <form onSubmit={handleSubmit(handleformsubmit)} className='flex flex-col '>
            <h1 className='font-inter  text-richblack-5 font-bold text-xl'>Profile Information</h1>
            <div className='grid  grid-cols-1 md:grid-cols-2 mt-5 gap-5 '>
                <div className='flex flex-col gap-1'>
                    <p className='text-richblack-400 font-inter'>FirstName</p>
                     <input  style={{
            boxShadow: "inset 0px -1px 0px rgba(215, 255, 255, 2.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5" name='firstName' type="text" {...register("firstName",{required:true})} defaultValue={user?.firstName} />
                     {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-richblack-400 font-inter'>LastName</p>
                     <input style={{
            boxShadow: "inset 0px -1px 0px rgba(215, 255, 255, 2.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"  name='lastName' type="text" {...register("lastName",{required:true})}  defaultValue={user?.lastName} />
                     {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-richblack-400 font-inter'>Date of Birth</p>
                    <input style={{
            boxShadow: "inset 0px -1px 0px rgba(215, 255, 255, 2.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"  name='dateOfBirth' type="date" {...register("dateOfBirth")} defaultValue={user?.additionalDetails?.dateOfBirth} />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-richblack-400 font-inter'>Gender</p>
                    <div
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(215, 255, 255, 2.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 flex justify-evenly" >
                    <div  className='flex gap-2'>
                        <input type="radio" defaultChecked={user?.additionalDetails?.gender==="Male"} name="gender" id='male' value={'Male'} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("gender",{required:true})} />
                        <label className='text-richblack-400 font-inter' htmlFor="male">Male</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="radio" name="gender" defaultChecked={user?.additionalDetails?.gender==="Female"} id='female' value={'Female'} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("gender")}/>
                        <label className='text-richblack-400 font-inter' htmlFor="female" >Female</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="radio" name="gender" defaultChecked={user?.additionalDetails?.gender==="Other"} id='other' value={'Other'} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded-full" {...register("gender")}   />
                        <label className='text-richblack-400 font-inter' htmlFor="other">Other</label>
                    </div>
                    </div>

                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-richblack-400 font-inter'>Phone Number</p>
                    <div className='flex  w-full  gap-3 '>
                    <div className='text-richblack-5 font-inter px-2 bg-richblack-700 flex items-center gap-3 rounded-md h-fit py-2'>
                        <div>{code}</div>
                        <div>
                            <select   className='w-5 text-richblack-25 bg-richblack-700' name="countrycode" id="code" {...register("countrycode")} >
                                {
                                    contrycode.map((ee)=>{
                                        return <option>{ee.code+" "+ee.country}</option> 
                                    })
                                }

                            </select>
                        </div>
                    </div>
                    <div className='text-richblack-5 font-inter flex flex-col flex-1 '>
                        <input type="number" minLength={"8"} maxLength={"10"} name='contactNumber' style={{
            boxShadow: "inset 0px -1px 0px rgba(215, 255, 255, 2.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"  {...register("contactNumber",{maxLength:"10",minLength:"8"})} defaultValue={user?.additionalDetails?.contactNumber}  />
                        {
                            errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                Mobile number mustbe max 10 & min 8.
                              </span>
                            )
                        }
                    </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-richblack-400 font-inter'>Profession</p>
                   <select style={{
            boxShadow: "inset 0px -1px 0px rgba(215, 255, 255, 2.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"  name="profession" id="pro" {...register("profession")}>
                     <option value="">{user?.additionalDetails?.profession || "choose your profession"}</option>
                    <option value="Devloper">Devloper</option>
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                   </select>
                </div>
            </div>
           <div className='flex w-full justify-end gap-6'>
            <button className='text-richblack-25 bg-richblack-700 mt-16 mb-5 w-fit  px-4 rounded-lg  py-2 ' onClick={(e)=>{
              e.preventDefault();
              reset()
            }}>
                      cancel
            </button>
           <button type='submit' className='text-richblack-900 bg-yellow-300 mt-16 mb-5 w-fit  px-6 rounded-lg  py-2 '>Save</button>
           </div>
        </form>
    </div>
  )
}

export default EditInfo;