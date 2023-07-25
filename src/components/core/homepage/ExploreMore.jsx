import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HilightedText from './HilightedText';
import CourseCard from './CourseCard';

const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
]
function ExploreMore() {
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);
    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=> course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div>
        <div className='text-4xl font-semibold text-center '>
            Unlock the
            <HilightedText text="Power of Code"/>
        </div>

        <p className=' text-richblack-300 text-[16px] font-semibold mt-3 text-center'>Learn to Build Anything You Can Imagine</p>

        <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100
      px-1 py-1 shadow-sm shadow-richblack-600'>
            {
                tabsName.map((element,index)=>{
                    return (
                        <div className={`text-[16px] flex flex-row items-center gap-2
                        ${currentTab===element?"bg-richblack-900 text-richblack-5 font-medium":
                        " text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                        hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                        key={index}
                        onClick={() => setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-[150px]'></div>

        <div className='absolute flex flex-row gap-10 justify-between w-full left-3 bottom-[-7%]'>
            {
                courses.map(  (element, index) => {
                return (
                    <CourseCard 
                    key={index}
                    cardData = {element}
                    currentCard = {currentCard}
                    setCurrentCard = {setCurrentCard}
                    />
                )
            } )
            }
        </div>

    </div>
  )
}

export default ExploreMore