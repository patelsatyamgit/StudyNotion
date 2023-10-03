import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { useRef,useEffect } from 'react';

import "video-react/dist/video-react.css"
import { Player } from "video-react"
import { useSelector } from 'react-redux';
const Upload = (
    {
        name,
        label,
        register,
        setValue,
        errors,
        video=false,
        viewData=null,
        editData=null,
    }
) => {

    const inputRef =useRef();
    const {course}=useSelector((state)=>state.course);
    const[selectedfile,setSelectedFile]=useState(null);
    const[previewSourse,setpreviewSourse]=useState(viewData ? viewData : editData ? editData:"")


    const onDrop=(acceptedFiles)=>{
        const file=acceptedFiles[0];
        if(file){
            previewFile(file);
            setSelectedFile(file);
        }
    }
   const {getRootProps,getInputProps,isDragActive}=useDropzone({
    accept:!video?{"image/*":[".jpeg",'.jpg','.png']}
    : {"video/*": [".mp4"]},
    onDrop,

   })
   const previewFile = (file) => {
    // console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setpreviewSourse(reader.result)
    }
   
  }
  useEffect(() => {
    register(name, { required: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    setValue(name, selectedfile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedfile, setValue])

  return (
    <div className='flex flex-col space-y-2'>
        <label htmlFor="name" className='text-richblack-50'>
            {label} {!viewData && <sup className='text-pink-200'>*</sup>}
        </label>

        <div className={`${isDragActive?"bg-richblack-600":"bg-richblack-700"} flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-dotted border-richblack-500`}>

            {
                previewSourse?(
                    <div className='flex w-full flex-col p-6'>
                        {
                            !video?(
                                <img src={previewSourse}
                                alt='Preview'
                                className='h-full w-full rounded-md object-cover'/>
                            ):(
                                <Player aspectRatio='16:9' playsInline src={previewSourse}/>

                            )
                        }

                        {
                            !viewData && (
                                <button
                                type='button'
                                onClick={()=>{
                                    setpreviewSourse(null);
                                    setSelectedFile(null);
                                    setValue(name,null)
                                }}
                                className='mt-3 text-richblack-400 underline'
                                >
                                 Cancel
                                </button>
                            )
                        }
                        
                    </div>
                ):(
                    <div className='flex w-full flex-col items-center p-6' {...getRootProps()}>


                        <input {...getInputProps()} ref={inputRef} name={name
                        } />
                        <div className='grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800'>
                            <FiUploadCloud className='text-2xl text-yellow-50'/>
                        </div>
                        <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
                        
                    </div>
                )
            }

        </div>
        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                {label} is required
              </span>
            )
        }

    </div>
  )
}

export default Upload;