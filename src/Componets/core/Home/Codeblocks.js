import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import "./home.css"

const Codeblocks = ({heading,position,CTCbutton1,CTCbutton2, paragraph,codebloc,gradiant}) => {
  return (
    <div className={`flex flex-${position} gap-4 relative mt-5 flex-col md:flex-row w-full `} >
        {/* leftpart */}
        <div className='md:w-[50%] w-full p-3  md:p-8 flex flex-col gap-4 font-inter'>
            <p className='text-white text-sm md:text:2xl'>
                {heading}
            </p>
            <p className='text-pure-greys-400'>{paragraph}</p>

            <div className='flex gap-3 mt-7'>
                {CTCbutton1}
                {CTCbutton2}
            </div>
            
        </div>
        {/* rightpart */}
        <div className=' w-full md:w-[50%] p-2 md:p-8 text-sm '>
            <div className={`flex md:w-[80%]  p-4 rounded-lg shadow-lg shadowINs gggradiant  z-0`}>
            <div className='w-[10%] flex flex-col text-pure-greys-400 font-inter'>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                
            </div>
            <div className={`w-[90%]  relative text-[13px] md:text-[16px] text-yellow-50`}>
                <div className={gradiant?"g1blur":"g2blur"}>
                    
                </div>
            <TypeAnimation

sequence={[codebloc,1]}
repeat={Infinity}
style={
    {
        whiteSpace:"pre-line",
        display:"block"
    }
}
/>

                
            </div>
                
            </div>
           
          
        </div>

    </div>
  )
}


export default Codeblocks;