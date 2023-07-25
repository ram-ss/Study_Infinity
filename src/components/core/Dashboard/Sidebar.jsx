import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links';
import {logout} from '../../../services/operations/authAPI'
import { useSelector,useDispatch } from 'react-redux';
import { VscSignOut } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"
import SidebarLink from './SidebarLink';
import ConfirmationModal from "../../common/ConfirmationModal"

function Sidebar() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const {loading:authLoading}=useSelector((state)=>state.auth);
  const {user,loading:profileLoading}=useSelector((state)=>state.profile);
  const [confirmationModal,setConfirmationModal]=useState(null);

  if(authLoading || profileLoading){
    return <div>Loading</div>
  }
  return (
   <div> 
    <div>
      <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
      bg-richblack-800 py-10 h-[calc(100vh-3.5rem)]'>
        <div className='flex flex-col'>
          {
            sidebarLinks.map((link)=>{
              // console.log(link.type,user?.accountType);
              if(link.type && user?.accountType !== link.type){
                return null;
              }
              return <SidebarLink key={link.id} link={link} iconName={link.icon}/>
            })
          }
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col"></div>
        <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
        <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
      </div>
    </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
   </div> 
  )
}

export default Sidebar