import React, { useEffect, useState } from "react";
import Layout from "./component/Layout/Layout/Layout";
import { useAuth } from "./Pages/context/Auth";
import { useCart } from "./Pages/context/Cart";
// import 'braintree-web-drop-in-react/dist/styles.css';
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Cartpage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");

  const totalprice = () => {
    let total = 0;
    try {
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const removeProduct = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance?.requestPaymentMethod();
      const { data } = await axios.post(
        "https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/braintree/payments",
        { nonce, cart }
      );
      setLoading(false);
      console.log("Payment Done");
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/users/orders");
      toast.success("Payment Successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">
              {`Hi, Mr ${auth?.token && auth?.users?.name}`}
            </h1>
            <h5 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your cart is empty"}
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cart?.map((p) => (
              <div className="row m-2 p-4 card flex-row bg-secondary cartgd-2" key={p._id}>
                <div className="col-md-4 ">
                  <img
                    src={`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/photo-category/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "162px", width: "120px" }}
                  />
                </div>
                <div className="col-md-8">
                  <p className="b">{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeProduct(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalprice()}</h4>
            Address : {auth?.users?.address}
          </div>
        </div>
      <div className="row mt-2">
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              className="btn btn-primary m-2"
              onClick={handlePayment}
              disabled={loading || !instance || !auth?.users?.address}
            >
              {loading ? "Processing" : "Make Payment"}
            </button>
          </>
        )}
      </div>
      </div>
    </Layout>
  );
};

export default Cartpage;
