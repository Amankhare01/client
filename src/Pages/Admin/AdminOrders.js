import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout/Layout'
import AdminMenu from '../../component/Layout/Layout/AdminMenu'
import { useAuth } from "../context/Auth";
import axios from "axios";
import moment from "moment";
import {Select} from "antd"
const {Option} = Select
const AdminOrders = () => {
    const [status,setStatus]=useState(["Not Process","Processing","Shipped","Deliverd","Cancel"]);
    const [changestatus, setchangestatus] = useState("");
    const [orders, setorders] = useState();
    const [auth, setauth] = useAuth();
    const getorders = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/auth/all-orders"
        );
        setorders(data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (auth?.token) getorders();
    }, [auth?.token]);


  const handleChange=async(orderId,value)=>{
    try {
      const {data} = await axios.put(`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/auth/order-status/${orderId}`,{
        status:value,
      });
      getorders();
    } catch (error) {
      console.log(error)
    }
  }  
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-8">
            <h2 className='text-center'>All Orders</h2>
            {orders?.map((o, i) => {
          return (
            <div key={i} className="p-5 r-5">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payments</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody key={i}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                        <Select bordered={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>
                            {status.map((s,i)=>(
                                <Option key={i} value={s}>
                                    {s}
                                </Option>
                            ))
                            }
                        </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>
                      {moment(o?.createAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                    <td>{o?.payments.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {o?.products?.map((p, i) => (
                  <div className="row m-2 p-4 card flex-row bg-secondary cartgd-2">
                    <div className="col-md-4 ">
                      <img
                        src={`https://mern-stack-ecommerce-0vdj.onrender.com/v1/product/photo-category/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ height: "162px", width: "120px" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="b">{p.name}</p>
                      <p>{p.description}</p>
                      <p>Price : {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default AdminOrders;
