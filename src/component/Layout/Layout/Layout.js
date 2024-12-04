import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";

const Layout = ({children,description,keywords,author,title}) => {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="author" content={author}/>
                <title>{title}</title>
            </Helmet>
        <Header/>
        <Toaster />
      <main style={{minHeight:"75vh"}}>
      {children }
      </main>
      
      <Footer/>
    </div>
  )
}

export default Layout

Layout.defaultProps ={
  title:"Ecommerce - Welcome for Shop here",
  discription:"Fully Mern Stack Project",
  keywords:"mern,react,node,mongodb,express",
  author:"Aman kharwar",
};