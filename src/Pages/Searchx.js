import React from 'react'
import Layout from '../component/Layout/Layout/Layout'
import { useSearch } from './context/Search'
import { Link } from 'react-router-dom'

const Searchx = () => {
    const [values, setvalues] = useSearch();
  return (
    <Layout title={'search results'}>
      <div className="container">
        <div className="text-center">
            <h1>Search Results</h1>
            <h5>{values?.result.length<1 ? 'No product Found' : `Found ${values?.result.length}`}</h5>
            <div className="d-flex flex-wrap">
            {values?.result.map((p) => (
              <Link
                key={p._id}
                to={`/admin/update-product/${p.slug}`}
                className="product-link"
              >
                <div className="col" key={p._id}>
                  <div className="card m-3" style={{ width: "18rem" }}>
                    <img
                      src={`https://mernstackecommerce-production.up.railway.app/api/v1/product/photo-category/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text"> ₹ {p.price}</p>
                      <button className="btn btn-primary ms-1">
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Searchx
