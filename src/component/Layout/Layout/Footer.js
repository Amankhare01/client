import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='bg-dark text-light p-1'>
      <h1 className='text-center'>All Right Reserved</h1>
      <p className='text-center mt-2'>
        <Link to={"/About"}>About |</Link>
        <Link to={"/Contact"}>Contact |</Link>
        <Link to={"/Policy"}>Policy</Link>
      </p>
      <center>
      <p>&copy; 2024 Your E-commerce Website</p>
      </center>
    </div>
  )
}

export default Footer
