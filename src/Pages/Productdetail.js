import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./context/Cart";
import toast from "react-hot-toast";

const Productdetail = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    if (product && Object.keys(product).length > 0) {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      toast.success("Item added to cart");
    }
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5">
            <img
              src={`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/photo-category/${product._id}`}
              className="img-fluid rounded shadow-sm"
              alt={product.name}
              style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
            />
          </div>
          <div className="col-md-6"  >
            <div className="card p-4 shadow-sm border-0" style={{background: "#dcd8d881"}}>
              <h2 className="mb-3 text-primary">Product Details</h2>
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p>
                <strong>Category:</strong> {product?.category?.name}
              </p>
              <button
                className="btn btn-dark mt-3 px-4 py-2"
                onClick={addToCart}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Productdetail;
