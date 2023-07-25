import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HilightedText from './HilightedText'
import Button from './Button'
import {FaArrowRight} from "react-icons/fa";

function InstsructorSection() {
  return (
    <div className='mt-16'>
        <div className=' flex flex-row items-center gap-20'>
            <div className='w-[50%]'>
                <img src={Instructor} className='object-cover h-fit shadow-[-20px_-20px_0px_#FFFFFF]'/>
            </div>

            <div className='flex flex-col gap-10 w-[50%]'>
                <div className=' font-semibold text-4xl text-white w-[50%]'>
                    Become an
                    <HilightedText text="instructor"/>
                </div>
                <div className=' text-richblack-300 font-medium text-[16px] w-[80%]'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </div>
                <div className='w-fit'>
                    <Button active={true} linkTo="/signup">
                        <div className='flex flex-row items-center gap-2'>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstsructorSection