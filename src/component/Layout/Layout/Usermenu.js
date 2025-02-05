import React from 'react'
import { NavLink } from 'react-router-dom'
const Usermenu = () => {
  return (
      <div className='text-center'>
      <div className="list-group">
        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action show">Profile</NavLink>
        <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action show">Orders</NavLink>
      </div>
    </div>
  )
}

export default Usermenu
