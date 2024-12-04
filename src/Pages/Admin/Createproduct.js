
import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import { Select} from "antd";
import { Navigate } from 'react-router-dom';
import Layout from '../../component/Layout/Layout/Layout';
import AdminMenu from '../../component/Layout/Layout/AdminMenu';

const Createproduct = () => {
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");

    const getallcategories = async () => {
        try {
            const { data } = await axios.get("https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getallcategories();
    }, []);

    const handlecreate = async (e) => {
        e.preventDefault();
        try {
            const productdata = new FormData();
            productdata.append("name", name);
            productdata.append("description", description);
            productdata.append("price", price);
            productdata.append("quantity", quantity);
            productdata.append("photo", photo);
            productdata.append("category", category);
            const { data } = await axios.post("https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/create-product", productdata);
            if (data?.success) {
                toast.success(data?.message);
            }else{
                Navigate('/dashboard/admin/products');
                toast.error("Product created successfully");   
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in creating product");
        }
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
            <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    
                    <div className='col-md-8'>
                    <h1 className='text-center'>Create Product</h1>
                        <Select
                            placeholder="Select A category"
                            size='large'
                            showSearch
                            className='form-select mb-3'
                            onChange={(value) => { setCategory(value) }}
                        >
                            {categories?.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </Select>
                        <div className="mb-3">
                            <label className="btn btn-outline-secondary col-md-12">
                                {photo ? photo.name : "Upload Photo"}
                                <input type="file" name="photo" accept='img/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt={'p.name'} height={"200px"} className='img img-responsiv' />
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <input className='form-control mb-3' type="text" value={name} placeholder='Write a name' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <textarea className='form-control mb-3' type="text" value={description} placeholder='Write a Description' onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <input className='form-control mb-3' type="text" value={price} placeholder='Write Price' onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input className='form-control mb-3' type="text" value={quantity} placeholder='Write quantity' onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <select className='form-select mb-3' size="large" placeholder="please select shipping" onChange={(e) => setShipping(e.target.value)} value={shipping}>
                                <option value="" disabled selected>Select Shipping</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <button className='btn btn-primary' onClick={handlecreate}>Create Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Createproduct;
