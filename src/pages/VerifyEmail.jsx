import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowBack } from 'react-icons/bi';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {RxCounterClockwiseClock} from 'react-icons/rx'

function VerifyEmail() {
    const {signupData,loading}=useSelector((state)=>state.auth);
    const [otp,setOtp]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }=signupData;
        dispatch(signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
            ));
    }
    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[]);
    
    
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {
            loading?(<div>Loading...</div>):(
                <div className='max-w-[31.75rem] p-4 lg:p-8'>
                    <h1 className=' text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify email</h1>
                    <p className='text-richblack-100 my-4 leading-[1.625rem] text-[1.125rem]'>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit}>
                        <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props}
                        placeholder='-'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                        />}
                        containerStyle={{
                            justifyContent: "space-between",
                            gap: "0 6px",
                        }}
                        />
                        <button type='submit' 
                        className='mt-6 w-full rounded-[8px] bg-yellow-50 p-[12px] font-medium text-richblack-900'
                        >
                           Verify email
                        </button>
                    </form>
                    <div className='flex justify-between items-end'>
                        <div className='mt-6 flex items-center justify-center'>
                            <Link to="/login">
                                <p className='flex items-center justify-start text-richblack-5 gap-x-2'>
                                    <BiArrowBack/>
                                    back to login</p>
                            </Link>
                        </div>
                        <button
                        onClick={()=>{dispatch(sendOtp(signupData.email))}}
                        className='text-[#47A5C5] flex items-center justify-center gap-x-2'
                        >
                            <RxCounterClockwiseClock/>
                            resend it
                        </button>
                    </div>    
                </div>    
            )
        }
    </div>
  )
}

export default VerifyEmail