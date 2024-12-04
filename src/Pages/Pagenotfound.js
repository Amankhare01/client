import React from 'react'
import Layout from '../component/Layout/Layout/Layout'
import { Link } from 'react-router-dom'
const Pagenotfound = () => {
  return (
    <Layout title={"Sorry - You should go back"}>
      <center className='mt-5 px-50 fs-50'>
      <h1 className='fw-bolder bold fs-50'>Error 401</h1>
      <h2>This Page is currenlt Unavailable</h2>
      <Link to={"/"} className='btn1'>Go Home</Link>
      </center>
    </Layout>
  )
}

export default Pagenotfound
