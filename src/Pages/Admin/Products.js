import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('https://mernstackecommerce-production.up.railway.app/api/v1/product/get-product');
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message || 'Failed to fetch products');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);
        return (
            <Layout>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">All Product List</h1>
                        <div className="d-flex flex-wrap">
                            {products.map((p) => (
                            <Link key={p._id} to={`/admin/update-product/${p.slug}`} className='product-link' >
                                <div className="col" key={p._id}>
                                    <div className="card m-3 cardbg-1" style={{ width: '18rem' }}>
                                        <img src={`https://mernstackecommerce-production.up.railway.app/api/v1/product/photo-category/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
};

export default Products;
