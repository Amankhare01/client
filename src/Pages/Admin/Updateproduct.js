import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import { Select} from "antd";
import {useNavigate, useParams } from 'react-router-dom';
import Layout from '../../component/Layout/Layout/Layout';

const Updateproduct = () => {
    const Navigate = useNavigate();
    const [id,setId] = useState();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");

    const getsingleproduct =async()=>{
        try{
            const {data} = await axios.get(`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name)
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            setCategory(data.product.category._id)
        }catch(error){
            console.log(error)
        }
    };
    useEffect(()=>{
        getsingleproduct();
        //eslint-disable-next-line
    },[]);

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

    const handleupdate = async (e) => {
        e.preventDefault();
        try {
            const productdata = new FormData();
            productdata.append("name", name);
            productdata.append("description", description);
            productdata.append("price", price);
            productdata.append("quantity", quantity);
            photo && productdata.append("photo", photo);
            productdata.append("category", category);
            const { data } = await axios.put(`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/update-product/${id}`,productdata);
            if (data.success) {
                toast.success(data.message);
            }else{
                toast.error("Product update successfully");   
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in updating product");
        }
    };

    const handledelete=async()=>{
        try{
            let answer = window.prompt("Are you sure to delete this product");
            if (!answer) return;
            const {data} = await axios.delete(`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/del-product/${id}`);
            toast.success(data.message)
            Navigate('/admin/products')
        }catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }
    }
  return (
    <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <h1>Update Product</h1>
                    <div className='m-1 w-75'>
                        <Select
                            placeholder="Select A category"
                            size='large'
                            value={category}
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
                            {photo ? (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt={'p.name'} height={"200px"} className='img img-responsiv' />
                                </div>
                            ):(<div className="text-center">
                            <img src={`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/product/photo-category/${id}`} alt={'p.name'} height={"200px"} className='img img-responsiv' />
                        </div>)}
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
                            <select className='form-select mb-3' size="large" placeholder="please select shipping" onChange={(e) => setShipping(e.target.value)} value={shipping ? "Yes" : "No"}>
                                <option value="" disabled selected>Select Shipping</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <button className='btn btn-primary' onClick={handleupdate}>Update Product</button>
                        </div>
                    </div>
                        <div className="mb-3">
                            <button className='btn btn-danger' onClick={handledelete}>Delete Product</button>
                        </div>
                </div>
            </div>
        </Layout>
  )
}

export default Updateproduct
