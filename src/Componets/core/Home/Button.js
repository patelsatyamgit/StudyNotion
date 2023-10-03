import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,active,linkto}) => {
  return (
    <div>
        <Link to={linkto}>
            <div className={`px-1  ${active?"bg-yellow-200 hover:bg-yellow-300":"bg-richblack-800 text-white hover:bg-richblack-700"} text-sm md:text-[17px] px-3 rounded-md py-2 shadow-md flex items-center justify-center gap-3`}>
                {children}
            </div>
        </Link>

    </div>
  )
}

export default Button;