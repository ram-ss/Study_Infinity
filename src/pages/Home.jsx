import React from 'react'
import {FaArrowRight} from "react-icons/fa";
import { Link } from 'react-router-dom';
import HilightedText from '../components/core/homepage/HilightedText';
import MyButton from '../components/core/homepage/Button';
import banner from '../assets/Images/banner.mp4';
import DynamicBlock from '../components/core/homepage/DynamicBlock';
import LearningLanguageSection from '../components/core/homepage/LearningLanguageSection';
import TimeLineSection from '../components/core/homepage/TimeLineSection';
import InstsructorSection from '../components/core/homepage/InstsructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/homepage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

function Home() {
  return (
    <div>
        {/* section 1 */}
        <div className="relative mx-auto flex flex-col text-white w-11/12 items-center
         justify-between max-w-maxContent">
            <Link to={"/signup"}>
                <div className="mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
             transition-all duration-200 hover:scale-95 w-fit group shadow-md shadow-richblack-600">
                    <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                     group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
            
            <div className="font-semibold text-center text-4xl mt-7">
                Empower Your Future with
                <HilightedText text={"Coding Skills"}/>
            </div>

            <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className="flex flex-row mt-8 gap-7">
                <MyButton active={true} linkTo={"/signup"}>
                    Learn More
                </MyButton>
                <MyButton active={false} linkTo={"/login"}>
                    Book a Demo
                </MyButton>
            </div>

            <div className="mx-3 my-12 shadow-[20px_20px_0px_#FFFFFF,5px_2px_30px_#03dbfc]">
                <video muted loop autoPlay >
                    <source src={banner} type="video/mp4"/>
                </video>
            </div>

            <div>
                <DynamicBlock
                    position={"lg: flex-row"}
                    heading={
                        <div className='font-semibold text-4xl'>
                            Unlock your
                            <HilightedText text={"coding potential"}/>
                            with our online courses.
                        </div>
                    }
                    subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    myButton1={
                        {
                            children:"Try it Yourself",
                            linkTo:"/signup",
                            active:true
                        }
                    }
                    myButton2={
                        {
                            children:"Learn More",
                            linkTo:"/login",
                            active:false
                        }
                    }
                    codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1><nav><a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    codeColour={"text-yellow-200"}
                />
            </div>

            <div>
                <DynamicBlock
                    position={"lg: flex-row-reverse"}
                    heading={
                        <div className='font-semibold text-4xl '>
                            Start
                            <HilightedText text={"coding in seconds"}/>
                        </div>
                    }
                    subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    myButton1={
                        {
                            children:"Explore Full Catalog",
                            linkTo:"/signup",
                            active:true
                        }
                    }
                    myButton2={
                        {
                            children:"Learn More",
                            linkTo:"/login",
                            active:false
                        }
                    }
                    codeBlock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    codeColour={"text-white"}
                />
            </div>

            <ExploreMore/>        
        </div>
        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 mt-12'>
            <div className=' homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
                    <div className='h-[200px]'></div>

                    <div className='flex flex-row gap-7 text-white'>
                        <MyButton active={true} linkTo={"/signup"}>
                            <div className='flex flex-row items-center gap-2'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </MyButton>
                        <MyButton active={false} linkTo={"/login"}>
                                Learn More
                        </MyButton>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center
            gap-5 justify-between'>
                <div className='flex flex-row gap-[150px] mb-10 mt-10 '>
                    <div className='font-semibold text-4xl w-[45%]'>
                        Get the skills you need for a
                        <HilightedText text={"job that is in demand."}/>
                    </div>

                    <div className='w-[40%] flex flex-col gap-10 items-start'>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <MyButton active={true} linkTo="/signup" >
                            Learn More
                        </MyButton>
                    </div>
                </div>

                 <TimeLineSection/>

                <LearningLanguageSection/>

            </div>

        </div>
        {/* section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter
        text-white bg-richblack-900'>
            <InstsructorSection/>
        </div>

        <p className='text-4xl text-white font-semibold text-center mt-10'>Reviews from other learners</p>

        <ReviewSlider/>
        {/* footer */}
        <Footer/>
    </div>
  )
}

export default Home