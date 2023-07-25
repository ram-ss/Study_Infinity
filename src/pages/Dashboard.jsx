import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar'

function Dashboard() {
  const {loading:authLoading}=useSelector((state)=>state.auth);
  const {loading:profileLoading}=useSelector((state)=>state.profile);
  if(profileLoading || authLoading){
    return <div>loading...</div>
  }
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar/>
        <div className='overflow-auto flex-1 h-[calc(100vh-3.5rem)]'>
            <div className='mx-auto w-11/12 py-10 max-w[1000px]'>
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard