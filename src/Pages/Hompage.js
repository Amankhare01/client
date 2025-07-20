import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../component/Layout/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../component/Layout/Prices";
import { useCart } from "./context/Cart";
import '../App.css'
const Hompage = () => {
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
        "https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/category/get-category"
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
        `https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/product-list/${page}`
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
        "https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/product-count"
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
        "https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/product-filter",
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
        `https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/product-list/${page}`
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
      <div className="row mt-3" style={{ '--bs-gutter-x': '0' }}>
        <div className="col-md-2">
          <h3 className="text-center">Filter by Category</h3>
          <div className="d-flex flex-column m-4">
            {category?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handlefilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h3 className="text-center">Filter by Prices</h3>
          <div className="d-flex flex-column m-4">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.Array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Product List</h1>
          {/* {JSON.stringify(radio, null, 4)} */}
          <div className="d-flex flex-wrap justify-content-center">
  {products?.map((p) => (
    <div
  key={p._id}
  className="card shadow-sm border-0 m-3"
  style={{
    width: "18rem",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  }}
>
  <Link to={`/product/${p.slug}`}>
    <img
      src={`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/photo-category/${p._id}`}
      alt={p.name}
      style={{
        height: "220px",
        objectFit: "cover",
        width: "100%",
      }}
    />
  </Link>

  <div
    style={{
      padding: "16px",
      background: "linear-gradient(90deg, #b1b1b1ff 50%, #4aa1b5ff 100%)",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <h5 className="fw-semibold" style={{ marginBottom: "6px" }}>{p.name}</h5>
    <p
      className="text-muted small"
      style={{
        marginBottom: "6px",
        minHeight: "40px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {p.description}
    </p>
    <h6 className=" mb-3">₹ {p.price}</h6>

    <div className="d-flex gap-2 mt-auto">
      <button
        className="btn btn-outline-dark w-100"
        onClick={() => navigate(`/product/${p.slug}`)}
      >
        View
      </button>
      <button
        className="btn btn-primary w-100"
        onClick={() => {
          setcart([...cart, p]);
          localStorage.setItem("cart", JSON.stringify([...cart, p]));
          toast.success("Item added to cart");
        }}
      >
        Add
      </button>
    </div>
  </div>
</div>

  ))}
</div>


          <div className="m-2 p-3 text-center">
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
    </Layout>
  );
};

export default Hompage;
