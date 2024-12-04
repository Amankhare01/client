import React from 'react'
import Layout from '../component/Layout/Layout/Layout'
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className='c12'>
        <div className='container1'>
          <img src="contact.jpg" alt="" />
        </div>
        <div className='dt12'>
          {/* <center> */}
          <h1 className='bg-dark text-light p-3'>Contact Us</h1>
          <p><b>Phone:</b>7800024774</p>
          <p><b>Email:</b>amankhare.aa@gmail.com</p>
          <p><b>Address:</b>Bkt, Lucknow(U.P)</p>
          {/* </center> */}
        </div>
      </div>
    </Layout>
  )
}

export default Contact
