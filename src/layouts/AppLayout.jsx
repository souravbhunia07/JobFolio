import React from 'react'
import { Outlet } from 'react-router-dom'
import '../App.css';

const AppLayout = () => {
  return (
    <div>
      <div className='grid-background'>

      </div>
      <Outlet />
    </div>
  )
}

export default AppLayout