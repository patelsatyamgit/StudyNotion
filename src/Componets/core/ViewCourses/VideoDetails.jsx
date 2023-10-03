import React, { useEffect, useRef, useState } from 'react'
import { Player } from 'video-react';

import { HiIdentification } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../Home/Button';
import { updateCourseProgress } from '../../../services/operations/course';
import { setActivesubsection, setCompletedLectures } from '../../../slices/viewCourseSlice';
// import "node_modules/video-react/dist/video-react.css";

const VideoDetails = () => {
  const playRef=useRef();
  const [videoEnded,setvideoEnded]=useState(false);
  const navigate = useNavigate();
  const [loading,setloading]=useState(false);
  const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures}=useSelector((state)=>state.viewCourse)
  const location=useLocation();
  const [videoData,setVideoData]=useState([]);
  const [screenFlag,setscreenFlag]=useState(false);
  const [currentVideo,setCurrentVideo]=useState(0)
  var {courseId,sectionId,subsectionId}=useParams();
  const [video,setvideo]=useState("");
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);
  useEffect(()=>{
    // console.log("................")
    if(videoData?.length > 0 ){
            const currentvideoIndex=videoData.findIndex((subsec)=> subsec._id===subsectionId);
            setCurrentVideo(currentvideoIndex)
            // console.log("index",currentVideo)
            setvideo(videoData[currentVideo]?.videoUrl);
    }
    else{
      let arr=[]
      for(var i=0; i< courseSectionData.length; i++){
        for(var j=0; j<courseSectionData[i].subSection.length; j++){
             arr.push(courseSectionData[i].subSection[j]);

        }
      }
      setVideoData(arr);

    }
  },[location.pathname,subsectionId,currentVideo,videoData])


  const handleLectureCompletion=async()=>{

          try {
                const result=await updateCourseProgress({courseId:courseId,subsectionId:subsectionId},token)
                dispatch(setCompletedLectures([...completedLectures ,subsectionId]));
          } catch (error) {

            console.log(error);
            
          }

  }
  useEffect(()=>{
    let arr=[]
    for(var i=0; i< courseSectionData.length; i++){
      for(var j=0; j<courseSectionData[i].subSection.length; j++){
           arr.push(courseSectionData[i].subSection[j]);
      }
    }
    setVideoData(arr);
    if(videoData?.length > 0 ){

    
      const currentvideoIndex=videoData.findIndex((subsec)=> subsec._id===subsectionId);
      setCurrentVideo(currentvideoIndex)
      setvideo(videoData[currentVideo]?.videoUrl);

}
    // console.log("videoData",videoData,arr)

  },[])
  return (
    <div className='-ml-7 mt-2 flex justify-between relative gap-3 flex-col md:flex-row items-center'>
      <Player
      ref={playRef}
      playsInline
      poster={courseEntireData?.thumbnail}
      onEnded={()=> setvideoEnded(true) }
    src={video} aspectRatio={`${screenFlag?"14:7":"16:7"}`}  height={100} >



{
      videoEnded && (
        <div
        style={{
          backgroundImage:
            "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
        }}
        className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
      >
        {

                  !completedLectures.includes(subsectionId) && 
                  <button disabled={loading}
                  onClick={() => handleLectureCompletion()} className='px-3 py-2 bg-yellow-50 text-richblack-800 font-bold text-sm rounded-lg'>
                    {
                      !loading ? "Mark As Completed" : "Loading..."
                    }

                  </button>

        }
        <button
             disabled={loading}
             onClick={() => {
               if (playRef?.current) {
                 // set the current time of the video to 0
                 playRef?.current?.seek(0)
                 setvideoEnded(false)
               
               }
             }}

             className='px-2 font-bold text-sm py-2 bg-yellow-50 text-richblack-800 rounded-lg mt-2'
        >
                Rewatch
        </button>
        <div className="mt-4 flex min-w-[250px] justify-center gap-x-4 text-xl">
          {currentVideo!==0 && (
            <button
              disabled={loading}
              onClick={()=> {
                navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${videoData[currentVideo-1]._id}`)
                setvideoEnded(false);
                dispatch(setActivesubsection(videoData[currentVideo-1]._id))
                
              }}
              className='px-2 font-bold text-sm py-2 bg-yellow-50 text-richblack-800 rounded-lg mt-2'
            >
              Prev
            </button>
          )}
          {  currentVideo !== totalNoOfLectures-1  && (
            <button
              disabled={loading}
              onClick={()=> {
                navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${videoData[currentVideo+1]._id}`)
                setvideoEnded(false);
                dispatch(setActivesubsection(videoData[currentVideo+1]._id))
                
              }}
              className='px-2 font-bold text-sm py-2 bg-yellow-50 text-richblack-800 rounded-lg mt-2'
            >
              Next
            </button>
          )}
        </div>
      </div>
      )
    }



    </Player>
    


    <button className='bg-transparent hover:bg-[#00ff00] px-3 py-1 text-sm rounded-lg absolute top-14 left-0' onClick={()=>setscreenFlag(!screenFlag)}>{screenFlag?"less Screen":"Full Screen"}</button>



    



 {
  screenFlag ?"":(
    <div className='bg-richblack-400 min-h-[300px] h-fit py-5 px-5 border-[1px] border-r-richblack-200 w-fit'>
                <p className='text-2xl font-bold font-inter text-richblack-50'>Description</p>
               <p className='text-richblack-100'> {videoData[currentVideo]?.description}</p>
              </div> 

  )
 }           

    </div>
  )
}
export default VideoDetails;
