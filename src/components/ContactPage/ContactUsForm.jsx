import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
    <div className='w-full h-[2rem]'></div>    
    <div className='flex flex-col gap-[1.375rem]'>
            <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname'
                    className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'
                    >First Name</label>
                    <input  
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 form-style'
                        {...register("firstname", {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span className='mt-1 text-[12px] text-yellow-100'>
                                Please enter Your name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname'
                    className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'
                    >Last Name</label>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 form-style'
                        placeholder='Enter Last name'
                        {...register("lastname")}
                    />
                    
                </div>

            </div>


            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email'
                className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'
                >Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 form-style'
                    placeholder='Enter email Address'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span className='mt-1 text-[12px] text-yellow-100'>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phoneNo */}
            <div className='flex flex-col'>

                <label htmlFor='phonenumber'>Phone Number</label>

                <div className='flex flex-row gap-1'>
                    {/* dropdown */}
                   
                        <select
                            name='dropdown'
                            id="dropdown"
                            // className='bg-yellow-50 w-[80px]'
                            className='w-[80px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 form-style'
                            {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                        
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            // className='text-black  w-[calc(100%-90px)]'
                            className='w-[calc(100%-90px)] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 form-style'
                            {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                        />
                  
                </div>
                {
                    errors.phoneNo && (
                        <span className='mt-1 text-[12px] text-yellow-100'>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>

            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    // className='text-black'
                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 form-style'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span className='mt-1 text-[12px] text-yellow-100'>
                            PLease enter your message.
                        </span>
                    )
                }
            </div>
                
            <button type='submit'
            className='mt-6 w-full rounded-[8px] bg-yellow-50 p-[12px] font-medium text-richblack-900'>
                    Send Message
            </button>
    </div>

    </form>
  )
}

export default ContactUsForm
