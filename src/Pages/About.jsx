import React from 'react'
// import HIghlightedText from '../Componets/core/Home/HIghlightedText';
import banner1 from "../assets/Images/aboutus1.webp"
import banner2 from "../assets/Images/aboutus2.webp"
import banner3 from "../assets/Images/aboutus3.webp"
import founding from "../assets/Images/FoundingStory.png"
import "../App.css"
import { BiSolidQuoteAltRight,BiSolidQuoteAltLeft } from 'react-icons/bi';
import { Stat } from '../data/Statdata';
import { GridData } from '../data/aboutgrid';
import ContactusForm from '../Componets/core/ContactusForm';
import UsersReview from '../Componets/core/Home/UsersReview';
 const About = () => {
  return (
    <div className='w-full pt-16 '>
        {/* section one  */}
        <section className='w-full bg-richblack-700  flex items-center flex-col gap-4 relative '>
            <p className='text-richblack-400 mt-20 text-sm text-center'>About us</p>

            <div className=' w-[90%] md:w-[600px] flex flex-col gap-3 pb-[200px]'>
                <h1 className='text-richblack-50 text-center text-2xl font-inter font-bold'>Driving Innovation in Online Education for a <p className='text-blue-100'>Brighter Future</p></h1>
                
                <p className='text-richblack-400 text-center font-inter text-sm'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </div>
            <div className='flex flex-wrap md:flex-row gap-4 md:mt-4  md:absolute justify-center  md:-bottom-24'>
                <img alt='ok' className='h-[250px]' src={banner1}/>
                <img  alt='ok' className='h-[250px] shadowINs' src={banner2}/>
                <img alt='0k' className='h-[250px]' src={banner3}/>
            </div>

        </section>
        {/* section two  */}
        <section  className='w-full bg-richblack-900 border-b-[1px]'>
            <h3 className=' text-2xl font-inter font-bold text-richblack-50 lg:w-7/12 text-center mx-auto pt-36 pb-10'>
                <sup className='text-richblack-600 text-3xl'> <BiSolidQuoteAltLeft className='inline'/></sup>
                We are passionate about revolutionizing the way we learn. Our innovative platform <span className='text-blue-200'>combines technology</span>,<span className='text-brown-50 px-[1px]'>expertise</span>and community to create an <span className='text-yellow-200'>unparalleled educational experience</span>
                <sup className='text-richblack-600 text-3xl'><BiSolidQuoteAltRight className='inline'/></sup>
            </h3>
        </section>
        {/* section three  */}
        <section className='w-full bg-richblack-900'>
            <div className='w-11/12 max-w-maxContent flex flex-col md:flex-row gap-20  mx-auto py-7 pt-10'>
                <div className='px-10 md:w-[50%]'>
                    <h1 className='text-2xl textgradi font-inter font-bold'>Our Founding Story</h1>
                    <p className='text-sm text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className='text-sm mt-3 text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>

                </div>
                <div className='md:w-[50%] flex items-center justify-center relative '>
                    <img src={founding} className='h-[200px]' alt="foundingimage" />
                    <div className='g5blur'></div>
                </div>

            </div>
            <div className='w-11/12 max-w-maxContent flex flex-col md:flex-row gap-20  mx-auto py-7'>
                <div className='md:w-[50%] px-10'>
                    <h1 className='text-2xl text-brown-400 font-inter font-bold'>Our Vision</h1>
                    <p className='text-sm text-richblack-400'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>
                <div className='md:w-[50%] px-10'>
                    <h1 className='text-2xl text-blue-200 font-inter font-bold'>Our Mission</h1>
                    <p className='text-richblack-400 text-sm'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>

            </div>
        </section>
        {/* section four  */}
        <section className='w-full bg-richblack-700'>
            <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-around py-6'>
                {
                    Stat.map((item,index)=>{
                          return <div>
                                  <h2 className='text-2xl text-richblack-5 font-bold font-inter'>{item.count}</h2>
                                  <p className='text-sm text-richblack-400'>{item.about}</p>
                          </div>
                    })
                }
            </div>
        </section>
        {/* section five */}
        <section className='w-full bg-richblack-900 '>
            <div className='grid lg:grid-cols-4 w-11/12 max-w-maxContent mx-auto py-12'>
                <div className='col-span-2 text-white'>
                    <h2 className='text-richblack-25 font-inter font-bold text-xl'>Word-Class Learning for</h2>
                    <h2 className='text-xl text-blue-200 font-inter font-bold'>Anyone, Anywhere</h2>
                    <p className='text-sm text-richblack-400'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>

                    <button className='bg-yellow-200 px-4 py-2 rounded-xl text-black font-inter mt-7 font-bold mb-3'>Learn More</button>
                </div>
                {
                    GridData.map((item,index)=>{
                        return <div key={index} className={`${item.id%2===0?"bg-richblack-800":"bg-richblack-600"} text-white ${item.id==3?"col-start-2":""} flex flex-col  gap-6 px-6 py-4 h-[200px]`}>
                               <h2 className='text-center text-richblack-50 '>{item.title}</h2>
                               <p className='text-richblack-300 text-sm'>{item.description}</p>
                        </div>
                    })
                }

            </div>
        </section>
        <UsersReview/>
        {/* section six  */}
        <section className='w-full bg-richblack-900'>

            <ContactusForm/>

        </section>

    </div>
  )
}
export default About;