import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    timeout:localStorage.getItem("timeout")? Number.parseInt(localStorage.getItem("timeout")): 0,
    signupData:null,
    loading:false,
    token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null,
}

const authSlice =createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state,value){
            state.signupData=value.payload;
        },
        setLoading(state,value){
            state.loading=value.payload;
        },
        setToken(state,value){
            state.token=value.payload;
        },
        setTimeout(state,value){
            state.timeout=value.payload;
        }
    }
});

export const {setSignupData,setLoading,setToken,setTimeout}=authSlice.actions;

export default authSlice.reducer;