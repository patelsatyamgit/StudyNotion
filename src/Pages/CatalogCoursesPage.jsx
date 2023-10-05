import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { useParams,useLocation } from 'react-router-dom';
import { getcategoryDetails } from '../services/operations/catalogCategoryDetails';
import Footeger from "../common/Footeger"
import CourseSlider from '../Componets/core/Home/CourseSlider';
import CourseCard  from '../Componets/core/Home/CatalogCourseCard';
const CatalogCoursesPage = () => {
  const [categoYA,setcategories]=useState([]);
  const location=useLocation();
  const [selectedCategory,setSelectedCategory]=useState(null);
  const [categoryIdv,setcategoryId]=useState(null);
  const {categoryName}=useParams();
  const [fetchedCouses,setFetchcourse]=useState(null);
  const [loading,setloading]=useState(false);
  const fetchCategy= async()=>{
    try {

      const result= await apiConnector("GET",categories.CATEGORIES_API);
      if(result!=null){
        setcategories(result.data.data);
      }
      
    } catch (error) {
      toast.error("error");
    }
  }
  useEffect(()=>{
    fetchCategy();
    const selected=categoYA.filter((cate)=>cate.name===categoryName.replace("-"," "));

    setSelectedCategory(selected[0]);
    setcategoryId(selectedCategory && selectedCategory._id);
  },[,categoryName,categoYA,location.pathName])

  useEffect(()=>{
       
    if(categoryIdv!==null){
      
      const  getCategorySpecificCourse=async()=>{
        try {
          setloading(true);
          const result=await getcategoryDetails(categoryIdv)
          setFetchcourse(result);
          setloading(false)

        } catch (error) {
          setFetchcourse(null);
          setcategoryId(null)
          toast.error("error..catalofg")
          
        }
        setloading(false);
      }
      getCategorySpecificCourse();
    
    }
    
 
  },[,categoryIdv,categoryName,location.pathName])
  
  return (
    <div className='w-full min-h-screen bg-richblack-900 text-black pt-[10vh]'>
      {/* first section */}
      <div className='bg-richblack-700 py-14 px-10 flex flex-col gap-3'>

        <p className='text-richblack-400'>Home/Catalog/<span className='text-yellow-200 font-inter'>{selectedCategory?.name}</span></p>
        <p className='text-richblack-25 font-inter text-xl font-bold'>{selectedCategory?.name}</p>
        <p className='text-richblack-200'>{selectedCategory?.description}</p>

      </div>
      {/* section two  */}
      <div className='px-5 py-5 flex flex-col gap-5'>
      <div>
      <h3 className='text-richblack-25 font-bold text-3xl font-inter'>Courses to get you started</h3>
        <div className='flex gap-3 w-full py-1 border-b-[1px] border-richblack-600 text-richblack-300 mb-10'>
          <p>Most Populer</p>
          <p>New</p>
        </div>
        {/* selectedCourse  */}
        {
            loading ?  <div className='w-full flex items-center justify-center'>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div> : <CourseSlider course={fetchedCouses && fetchedCouses.seclectedCategoryCourses && fetchedCouses.seclectedCategoryCourses.course} />
        }

      </div>
      {/* different course  */}
      <div className='flex flex-col gap-5'>
      <h3 className='text-richblack-25 font-bold text-3xl font-inter border-b-[2px] border-richblack-300 py-3'>Top Courses IN Different Category</h3>
        
        {/* selectedCourse  */}
      {

                  
        loading ?  <div className='w-full flex items-center justify-center'>
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div> :  <CourseSlider course={fetchedCouses && fetchedCouses.differentCategoryData}   />

      }
       

      </div>
        {/* show all courses  */}
       <h1 className='text-richblack-25 font-inter text-3xl font-bold py-4 border-b-[2px] border-richblack-300'>All courses</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-richblack-800 py-8'>
                     {

              loading ?  <div className='w-full flex items-center justify-center'>
              <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div> :(
                      fetchedCouses && fetchedCouses.allCourses.length > 0 ? fetchedCouses.allCourses.map((item,index)=>(
                        <div key={index}>
                         <CourseCard course={item}/>
                          
                        </div>
                        
            
                      )):<span>No course found</span>
              )
                      }
                  
          
        </div>

      </div>
      <Footeger/>
    </div>
  )
}
export default CatalogCoursesPage;
