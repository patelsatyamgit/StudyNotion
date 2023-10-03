import React from 'react'
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"
import { useState } from 'react'
import { useEffect } from 'react'
import { GiConsoleController } from 'react-icons/gi'
Chart.register(...registerables)

const VisualizeData = ({courseData}) => {


    const [currChart,setcurrChart]=useState("Student");
    const generateRandomColors= ()=>{
       
        const colors=[]
        for(let i=0; i<courseData.length; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.floor(Math.random() *256))},${Math.floor(Math.random() *256)})`
                colors.push(color);
        }
        // console.log(colors);

        return colors
    }
    const chartDataStudent ={
        labels : courseData?.map((course) => course.courseName),
        datasets:[
            {
                data:courseData?.map((course)=> course.studentEnrolled),
                backgroundColor:generateRandomColors(courseData?.length)
            }
        ]
        
    }
    const chartDataIncome ={
        labels : courseData?.map((course) => course.courseName),
        datasets:[
            {
                data:courseData?.map((course)=> course.totalIncome),
                backgroundColor:generateRandomColors()
            }
        ]
        
    }
    const options = {
        maintainAspectRatio: false,
      }

      useEffect(()=>{
            //  console.log("hhhhhhhhhhhh",chartDataStudent);
      },[])
  return (
    <div className='px-5 py-2'>
        <p className='text-richblack-5 font-bold font-inter text-xl'>Visualize</p>
        <div className='my-2 flex gap-3'>
            <button onClick={()=>{
                setcurrChart("Student")
            }} className={`${currChart=="Student"?"bg-richblack-900":"bg-richblack-500"} 
            hover:bg-richblack-700  text-richblack-25 rounded-lg px-2 py-1`}>Student</button>
            <button onClick={()=>{
                setcurrChart("Income")
            }} className={`${currChart=="Income"?"bg-richblack-900":"bg-richblack-500"} 
            hover:bg-richblack-700  text-richblack-25 rounded-lg px-2 py-1`}>Income</button>
        </div>
        <div className='h-72'>
                <Pie
                data={currChart === "Student" ? chartDataStudent : chartDataIncome}
                options={options}
                />
        </div>
    </div>
  )
}

export default VisualizeData;
