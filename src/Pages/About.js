import React from 'react'
import Layout from '../component/Layout/Layout/Layout'
const About = () => {
  return (
    <Layout title={"Ecommerce - About page"}>
      <h1 className='text-center'>About - us</h1>
    <div className='container-fluid m-1 p-3'>
      <p className='text-center'>
        <b>Welcome to my Ecommerce!</b>
      </p>
      <p>
        Our journey began with a simple idea: to bring the best of the world to your doorstep. We started small, with a
        passion for quality and a commitment to customer satisfaction. Today, we're proud to say that we've grown into a
        trusted online destination for shoppers worldwide.
      </p>
      <p>
        What sets us apart is our dedication to excellence. We work tirelessly to source products that meet our
        stringent quality standards, ensuring that every item you purchase is a masterpiece in its own right. From
        fashion to electronics, home decor to beauty essentials, we've got something for everyone.
      </p>
      <p>
        But our commitment goes beyond just products. We strive to create a shopping experience that is seamless and
        enjoyable. Our user-friendly website is designed to make your browsing and purchasing experience a breeze, and
        our customer service team is always on hand to help with any questions or concerns you may have.
      </p>
      <p>
        We also believe in giving back to the community. That's why we partner with local artisans and craftsmen to
        bring you unique, handmade products that support local economies and traditions.
      </p>
      <p>
        Thank you for choosing my Ecommerce. We're excited to embark on this journey with you, and we
        look forward to serving you for years to come.
      </p>
      <p>Happy shopping!</p>
    </div>
    </Layout>
  )
}

export default About
