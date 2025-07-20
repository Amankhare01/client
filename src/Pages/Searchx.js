import React from 'react';
import Layout from '../component/Layout/Layout/Layout';
import { useSearch } from './context/Search';
import { useCart } from './context/Cart'; // import your cart context
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Searchx = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout title="Search Results">
      <div className="container py-4">
        <div className="text-center mb-4">
          <h2>Search Results</h2>
          <h5 className="text-muted">
            {values?.result.length < 1
              ? 'No products found.'
              : `Found ${values.result.length} product(s)`}
          </h5>
        </div>

        <div className="row justify-content-center">
          {values?.result.map((p) => (
            <div key={p._id} className="col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:8080/api/v1/product/photo-category/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    height: '220px',
                    objectFit: 'cover',
                    backgroundColor: '#f4f4f4',
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text small text-truncate">{p.description}</p>
                  <p className="card-text fw-bold">₹ {p.price}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      More Details
                    </button>
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="btn btn-outline-success btn-sm"
                    >
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
  );
};

export default Searchx;
