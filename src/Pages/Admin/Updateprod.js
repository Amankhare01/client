import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import Layout from "../../component/Layout/Layout/Layout";
import { Prices } from "../../component/Layout/Prices";
import { useCart } from "../context/Cart";
import AdminMenu from "../../component/Layout/Layout/AdminMenu";
const Updateprod = () => {
  const [cart, setcart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setcategories] = useState([]);
  const [chacked, setchacked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(1);

  const getallcategories = async () => {
    try {
      const { data } = await axios.get(
        "https://mernstackecommerce-production.up.railway.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setcategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallcategories();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `https://mernstackecommerce-production.up.railway.app/api/v1/product/product-list/${page}`
      );
      setloading(false);
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      setloading(false);
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://mernstackecommerce-production.up.railway.app/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handlefilter = (value, id) => {
    let all = [...chacked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setchacked(all);
  };

  useEffect(() => {
    if (!chacked.length || !radio.length) getAllProducts();
  }, [chacked.length, radio.length]);
  useEffect(() => {
    if (chacked.length || radio.length) filterproduct();
  }, [chacked, radio]);
  const filterproduct = async () => {
    try {
      const {
        data,
      } = await axios.post(
        "https://mernstackecommerce-production.up.railway.app/api/v1/product/product-filter",
        { chacked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);

  const loadmore = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `https://mernstackecommerce-production.up.railway.app/api/v1/product/product-list/${page}`
      );
      setloading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  return (
    <Layout title={"All Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Product List</h1>
            {/* {JSON.stringify(radio, null, 4)} */}
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="product-link">
                  <div className="col" key={p._id}>
                    <div
                      className="card m-3 cardbg-1"
                      style={{ width: "18rem" }}
                    >
                      <Link key={p._id} to={`/admin/update-product/${p.slug}`}>
                        <img
                          src={`https://mernstackecommerce-production.up.railway.app/api/v1/product/photo-category/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                      </Link>
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
                        <button
                          className="btn btn-secondary ms-1"
                          onClick={() => {
                            setcart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item added in cart");
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setpage(page + 1);
                  }}
                >
                  {loading ? "loading..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Updateprod;
