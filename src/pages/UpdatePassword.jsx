import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

function UpdatePassword() {
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    })
    const location=useLocation();
    const dispatch=useDispatch();
    const {loading}=useSelector((state)=>state.auth);
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const token=location.pathname.split('/').at(-1);
    const handleOnChange=(e)=>{
        setFormData((pre)=>({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }
    const navigate=useNavigate();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(resetPassword(formData.password,formData.confirmPassword,token,navigate));
    }
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {loading?(<div>Loading... </div>):(
            <div className='max-w-[500px] p-4 lg:p-8'>
                <h1 className=' text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Choose  new password</h1>
                <p className='text-richblack-100 my-4 leading-[1.625rem] text-[1.125rem]'>Almost done. Enter your new password and youre all set.</p>
                <form onSubmit={handleOnSubmit}
                className=' flex flex-col gap-[1.25rem]'
                >
                    <label htmlFor="" className='w-full relative'>
                        <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>New password <sup className='text-pink-200'>*</sup></p>
                        <input 
                        required
                        type={showPassword?"text":"password"}
                        name='password'
                        value={formData.password}
                        onChange={handleOnChange}
                        placeholder='Password'
                        className=' w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 form-style'
                        />
                        <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>
                    </label>
                    <label htmlFor="" className='w-full relative'>
                        <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>Confirm new password <sup className='text-pink-200'>*</sup></p>
                        <input 
                        required
                        type={showConfirmPassword?"text":"password"}
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleOnChange}
                        placeholder='Confirm Password'
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 form-style'
                        />
                        <span
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showConfirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>
                    </label>
                    <button type='submit' 
                    className='mt-6 w-full rounded-[8px] bg-yellow-50 p-[12px] font-medium text-richblack-900'
                    >
                        Reset Password
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
        )}
    </div>
  )
}

export default UpdatePassword