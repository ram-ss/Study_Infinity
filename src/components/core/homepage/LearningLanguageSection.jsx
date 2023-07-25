import React from 'react'
import HilightedText from './HilightedText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLesson from '../../../assets/Images/Plan_your_lessons.png'
import Button from './Button'

function LearningLanguageSection() {
  return (
    <div className='mt-[130px]'>
        <div className='flex flex-col gap-5 items-center'>
            <div className='font-semibold text-4xl  text-center'>
                Your swiss knife for
                <HilightedText text="learning any language"/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img src={knowYourProgress} className=' object-contain -mr-32'/>
                <img src={compareWithOthers} className=' object-contain'/>
                <img src={planYourLesson} className=' object-contain -ml-36' />
            </div>

            <div className='w-fit mb-[50px]'>
                <Button linkTo="/signup" active={true}>
                    Learn More
                </Button>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection