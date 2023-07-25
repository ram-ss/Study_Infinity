import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"
import ReviewSlider from "../components/common/ReviewSlider"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  )
}

export default Contact




















// import React from 'react'
// import ContactUsForm from '../components/ContactPage/ContactUsForm'
// import Footer from '../components/common/Footer'
// import {HiChatBubbleLeftRight} from 'react-icons/hi2'
// import {BsGlobeEuropeAfrica} from 'react-icons/bs'
// import {BsTelephoneFill} from 'react-icons/bs'

// function Contact() {
//   return (
//     <div>
//         <div className='flex w-11/12 mt-[5.62rem] mx-[7.5rem]    text-richblack-5'>
//             <div className='flex flex-col p-[1.25rem] w-[30%] bg-richblack-800 rounded-lg h-fit gap-[1.5rem]'>
//                 <div className='flex items-start gap-[0.5625rem] '>
//                     <HiChatBubbleLeftRight/>
//                     <div>
//                         <h1 className='text-lg font-semibold text-richblack-5'>Chat on us</h1>
//                         <p className='font-medium text-sm text-richblack-200'>Our friendly team is here to help.</p>
//                         <p className='font-medium text-sm text-richblack-200'>@mail address</p>
//                     </div>
//                 </div>
//                 <div className='flex items-start gap-[0.5625rem] '>
//                     <BsGlobeEuropeAfrica/>
//                     <div>
//                         <h1 className='text-lg font-semibold text-richblack-5'>Chat on us</h1>
//                         <p className='font-medium text-sm text-richblack-200'>Our friendly team is here to help.</p>
//                         <p className='font-medium text-sm text-richblack-200'>@mail address</p>
//                     </div>
//                 </div>
//                 <div className='flex items-start gap-[0.5625rem] '>
//                     <BsTelephoneFill/>
//                     <div>
//                         <h1 className='text-lg font-semibold text-richblack-5'>Chat on us</h1>
//                         <p className='font-medium text-sm text-richblack-200'>Our friendly team is here to help.</p>
//                         <p className='font-medium text-sm text-richblack-200'>@mail address</p>
//                     </div>
//                 </div>
//             </div>
//             <div className='p-[3.25rem] border-[2px] rounded-lg border-richblack-600 w-[50%] flex flex-col items-center justify-center mx-auto '>
//                 <h1 className=' text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Got a Idea? We've got the skills. Let's team up</h1>
//                 <p className='text-richblack-100 my-4 leading-[1.625rem] text-[1rem]'>Tell us more about yourself and what you're got in mind.</p>
//                 <ContactUsForm/>
//             </div>
//         </div>
//         <div className='text-richblack-5 w-full h-[28.75rem]'>
//             Review From Other Learner
//         </div>
//         <div>
//             <Footer/>
//         </div>
//     </div>
//   )
// }

// export default Contact