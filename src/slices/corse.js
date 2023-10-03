import { createSlice } from "@reduxjs/toolkit";

const initialstate={
    step:1,
    course:null,
    editCourse:false,
    paymentloading:false,
}

const courseSlice =createSlice(
    {
        name:"course",
        initialState:initialstate,
        reducers:{
            setStep(state,value){
                state.step=value.payload;
            },
            setCourse(state,value){
                 state.course=value.payload;
            },
            setEditCourse(state,value){
                state.editCourse=value.payload;
            },
            setResetCourseInfo(state){
                state.step=1;
                state.course=null;
                state.editCourse=null;
            },
            setpaymentloading(state,value){
                state.paymentloading=value.payload;
            }

            
        }
    }
)

export const {setStep,setCourse,setEditCourse,setResetCourseInfo,setpaymentloading}=courseSlice.actions;
export default courseSlice.reducer;