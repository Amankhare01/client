import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout/Layout'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Categoryproduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [products, setproduct] = useState([]);
    const [category, setcategory] = useState();

    useEffect(()=>{
        if(params?.slug) getproductbycategory();
    },[params?.slug])
    const getproductbycategory=async(req,res)=>{
        try {
            const {data} = await axios.get(`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/product-category/${params.slug}`)
            setproduct(data?.products);
            setcategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        <h3 className="text-center">{category?.name}</h3>
        <h5 className="text-center">{products?.length} Result Found</h5>
        <div className="row">
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="product-link">
                <div className="col" key={p._id}>
                  <div className="card m-3" style={{ width: "18rem" }}>
                    <div key={p._id} to={`/admin/update-product/${p.slug}`}>
                      <img
                        src={`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/photo-category/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text"> ₹ {p.price}</p>
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default Categoryproduct
