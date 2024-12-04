import React from 'react'
import Layout from '../../component/Layout/Layout/Layout'
import { Link } from 'react-router-dom'
import Usecategory from '../../Hooks/Usecategory'

const Categories = () => {
    const categories = Usecategory();
  return (
    <Layout>
      <div className="container">
        <div className="row">
            {categories?.map((c)=>(
                <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                    <Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link>
                </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories
