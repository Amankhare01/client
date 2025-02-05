import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./context/Cart";
import toast from "react-hot-toast";
const Productdetail = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [products, setProduct] = useState([]);
  const [product, setProducts] = useState({});
  useEffect(() => {
    if (params?.slug) getproduct();
  }, [params?.slug]);

  const getproduct = async () => {
    try {
      const { data } = await axios.get(
        `https://mernstackecommerce-production.up.railway.app/api/v1/product/get-product/${params.slug}`
      );
      setProducts(data?.product);
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
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://mernstackecommerce-production.up.railway.app/api/v1/product/photo-category/${product._id}`}
            className="card-img-top pd1"
            alt={product.name}
          />
        </div>
        <div className="col-md-5 m-2">
          <h1>Product Detail</h1>
          <h6>Name : <b>{product.name}</b></h6>
          <h6>Description : <b>{product.description}</b></h6>
          <h6>Price : <b>{product.price}</b>
          </h6>
          <h6>Category : <b>{product.category && product?.category?.name}</b></h6>
  <button
    className="btn btn-secondary ms-1"
    onClick={addToCart}
  >
    Add to Cart
  </button>
        </div>
      </div>
    </Layout>
  );
};
export default Productdetail;
