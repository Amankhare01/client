import React from 'react'
import Layout from '../component/Layout/Layout/Layout'

const Policy = () => {
  return (
    
    <Layout title={"Ecommerce - Policy page"}>
      <div className='p-3'>
      <center>
      <h1>Policy Page</h1>
      </center>
    
    <h2>Privacy Policy</h2>
    <p>
        Our website respects your privacy and is committed to protecting it. Our Privacy Policy outlines how your personal information is collected, used, and protected when you use our website.
        <a href="/privacy-policy">Read our full Privacy Policy</a>
    </p>
    
    <h2>Terms of Service</h2>
    <p>
        By using our website, you agree to abide by our Terms of Service. These terms govern your use of our website and the services we offer.
        <a href="/terms-of-service">Read our full Terms of Service</a>
    </p>
    
    <h2>Return Policy</h2>
    <p>
        We want you to be completely satisfied with your purchase. If you are not satisfied for any reason, you may return the item within 30 days for a full refund.
        <a href="/return-policy">Read our full Return Policy</a>
    </p>
      </div>
    </Layout>
  )
}

export default Policy
