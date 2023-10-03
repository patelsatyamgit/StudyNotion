import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const initialState={
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    total:localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0,
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    reviews:[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setreviews:(state,action)=>{
                state.reviews=action.payload;
        },
        addToCart:(state,action)=>{
            const course=action.payload;
            const index=state.cart.findIndex((item)=> item._id===course._id);


            if(index>=0){
                //if course already present
                toast.error("course alread in cart");
                return
            }

        
            //push data

            state.cart.push(course);
            //update total and totalitem
            state.total++;
            state.totalItems=parseInt(state.totalItems) + +course.price;

            //updating to localstorage
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

            // show toast success 
            toast.success("Course added to cart");
        },
        removeFromCart:(state,action)=>{
            const courseId=action.payload;
            const index=state.cart.findIndex((item)=> item._id === courseId);

            if(index>=0){
                state.total--;
                state.totalItems-=state.cart[index].price;
                state.cart.splice(index,1);

                // update local Storage

                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("total",JSON.stringify(state.total));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

                // show toast 
                toast.success("Course removed from cart");
            }
        },
        resetCart:(state,value)=>{
 
            // const temp=cart.filter((item)=>)
            state.cart=[];
            state.total=0;
            state.totalItems=0;

            //Update to localstorage
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        },
    },
})

export const {addToCart,removeFromCart,resetCart,setreviews} =cartSlice.actions;
export default cartSlice.reducer;