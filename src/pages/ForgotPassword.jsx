import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import {BiArrowBack} from 'react-icons/bi'

function ForgotPassword() {
    const [email,setEmail]=useState("");
    const [emailSent,setEmailSent]=useState(false);
    const {loading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {
            loading ? (
                <div>loading.....</div>
            ):( 
                <div className='max-w-[500px] p-4 lg:p-8'>
                    <h1 className=' text-richblack-5 font-semibold text-[1.125rem] leading-[2.375rem]'>
                        {!emailSent?"Reset Your Password":"Check Your Email"}
                    </h1>
                    <p className='text-richblack-100 my-4 leading-[1.625rem] text-[1.125rem]'>
                        {!emailSent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        :`We have sent the reset email to ${email}
                        `}
                    </p>
                    <form onSubmit={handleSubmit}>
                        {
                            !emailSent && (
                                <label htmlFor="" className='w-full'>
                                    <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>Email Address <sup className='text-pink-200'>*</sup></p>
                                    <input type="email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder='enter you mail address' 
                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 form-style'/>
                                </label>)
                        }
                        <button type='submit' className='mt-6 w-full rounded-[8px] bg-yellow-50 p-[12px] font-medium text-richblack-900'>
                            {!emailSent?"reset password":"resend email"}
                        </button>
                    </form>
                    <div className='mt-6 flex items-center justify-center'>
                        <Link to="/login">
                            <p className='flex items-center justify-start text-richblack-5 gap-x-2'>
                                <BiArrowBack/>
                                back to login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword