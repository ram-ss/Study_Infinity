import React from 'react'
import MyButton from './Button';
import {FaArrowRight} from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

function DynamicBlock({position,heading,subHeading,myButton1,myButton2,codeBlock,codeColour,backgroundGradient}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-20`}>
        <div className="w-[50%] flex flex-col gap-8">
            {heading}
            <div className=" text-richblack-300 font-bold ">
                {subHeading}
            </div>
            <div className="flex gap-7 mt-7">
                <MyButton active={myButton1.active} linkTo={myButton1.linkTo}>
                    <div className="flex gap-2 items-center">
                        {myButton1.children}
                        <FaArrowRight/>
                    </div>
                </MyButton>
                <MyButton active={myButton2.active} linkTo={myButton2.linkTo}>
                    {myButton2.children}
                </MyButton>
            </div>
        </div>

        <div className="flex flex-row w-[100%] py-4 text-10[px] h-fit lg:w-[500px]">
            {/* bg gradient */}
            <div className="w-[10%] text-center flex flex-col text-richblack-400 font-bold font-inter">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono
             pr-2 ${codeColour}`}>
                <TypeAnimation
                    style={{whiteSpace:"pre-line",display:"block"}}
                    sequence={[codeBlock,2000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                />
            </div>
        </div>

    </div>
  )
}

export default DynamicBlock