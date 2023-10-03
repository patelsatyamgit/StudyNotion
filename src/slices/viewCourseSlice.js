import { createSlice } from "@reduxjs/toolkit";


const initialState={
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNoOfLectures:0,
    Activesubsection:"",
}

const viewCourseSlice =createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setActivesubsection:(state,value)=>{
            state.Activesubsection=value.payload;
        },
        setCourseSectionData :(state,value)=>{
            state.courseSectionData=value.payload
        },
        setCourseEntireData :(state,value)=>{
            state.courseEntireData=value.payload
        },
        setCompletedLectures :(state,value)=>{
            state.completedLectures=value.payload
        },
        setTotalNoOfLectures:(state,value)=>{
            state.totalNoOfLectures=value.payload
        } ,
        updateCompleteLectures:(state,value)=>{
           state.completedLectures= [...state.completedLectures,value.payload]
    },
}
})

export const {setCompletedLectures,setCourseEntireData,setCourseSectionData,setTotalNoOfLectures,updateCompleteLectures,setActivesubsection} =viewCourseSlice.actions

export default viewCourseSlice.reducer