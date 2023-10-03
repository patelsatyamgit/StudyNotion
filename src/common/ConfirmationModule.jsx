import React from 'react'

const ConfirmationModule = ({dataModule}) => {
  return (
    <div className={`${dataModule?"fixed inset-0 z-50 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm":""}`}>


       {
        dataModule && (
            <div className='w-fit h-fit px-6 py-5 bg-richblack-900 flex flex-col gap-4 rounded-md border-[1px] border-richblack-400'>
            <h1 className='text-richblack-5 font-inter font-bold text-2xl'>{dataModule.text1}</h1>
            <p className='text-richblack-400'>{dataModule.text2}</p>

            <div className='flex gap-3'>
                <button className=' px-3 py-1 rounded-md bg-yellow-200 text-black' onClick={dataModule.btn1Handler }>
                         {dataModule.btn1text}
                </button>
                <button className=' px-3 py-1 rounded-md bg-richblack-500 text-black' onClick={dataModule.btn2Handler}>
                           {dataModule.btn2Text}
                </button>
            </div>
        </div>
        )
       }

    </div>
  )
}

export default ConfirmationModule;
