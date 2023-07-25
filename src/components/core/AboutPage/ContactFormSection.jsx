import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center justify-center mx-auto'>
      <h1 className=' text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>
        Get in Touch
      </h1>
      <p className='text-richblack-100 my-4 leading-[1.625rem] text-[1rem]'>
        We'd love to here for you, Please fill out this form.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
