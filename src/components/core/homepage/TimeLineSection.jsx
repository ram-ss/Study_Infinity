import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"

function TimeLineSection() {
    const timeLineData=[
        {
            logo:Logo1,
            heading:"Leadership",
            description:"Fully committed to the success company"
        },
        {
            logo:Logo2,
            heading:"Responsibility",
            description:"Students will always be our top priority"
        },
        {
            logo:Logo3,
            heading:"Flexibility",
            description:"The ability to switch is an important skills"
        },
        {
            logo:Logo4,
            heading:"Solve the problem",
            description:"Code your way to a solution"
        }
    ]
  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>
            <div className='flex flex-col w-[45%] gap-5'>
                {
                    timeLineData.map((element,index)=>{
                        return (
                            <>
                            <div className='flex flex-row gap-6' key={index}>
                                <div className='flex bg-white items-center w-[50px] h-[50px] justify-center rounded-full'>
                                    <img src={element.logo} alt=""/>
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className='text-[18px] font-semibold'>{element.heading}</h2>
                                    <p className='text-base'>{element.description}</p>
                                </div>
                            </div>
                            {
                                    index<3 && <div className=' bg-richblack-100 h-10 w-[1px] p-0 ml-5 border-dotted'>
                                        </div>
                            }
                            </>
                        )
                    })
                }
            </div>

            <div className=' relative shadow-[20px_20px_0px_#FFFFFF,-2px_2px_30px_#03dbfc]'>
                <img src={TimeLineImage} alt="" className=' object-cover h-fit' />

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-6
                 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-row items-center gap-5 px-7 border-r border-caribbeangreen-300'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-sm text-caribbeangreen-300'>Years of Experience</p>
                    </div>

                    <div className='flex flex-row items-center gap-5 px-7'>
                        <p className='text-3xl font-bold'>25</p>
                        <p className='text-sm text-caribbeangreen-300'>Types of Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection