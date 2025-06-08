import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import Categoryform from "../../component/Layout/form/Categoryform";
import {Modal} from 'antd';
import AdminMenu from "../../component/Layout/Layout/AdminMenu";
const Createcategory = () => {

    const [categories, setcategories] = useState([]);
    const [name, setname] = useState("");
    const [visible,setvisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [update, setUpdated] = useState("");

    const handleonsubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://mern-stack-ecommerce-0vdj.onrender.com/v1/category/create-category', {name});
            if (data?.success) {
                toast.success(`${name} is Created`)
                setname("");
                getallcategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form")
        }
    }
    const getallcategories = async () => {
        try {
            const { data } = await axios.get("https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/category/get-category");
            if (data?.success) {
                setcategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category")
        }
    }
    useEffect(() => {
        getallcategories();
    }, []);

    // Handle Update
    const handleupdate = async(e)=>{
        e.preventDefault();
        try{
            const {data}= await axios.put(`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/category/update-category/${selected._id}`,{name:update});
            if(data.success){
                toast.success(`${update} is Updated`);
                setSelected(null);
                setUpdated("");
                setvisible(false);
                getallcategories();
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error("Something went wrong")
        }
    }
    const handledelete = async(pid)=>{
        try{
            const {data}= await axios.delete(`https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/category/delete-category/${pid}`,{name:update});
            if(data.success){
                toast.success("Category is deleted");
                getallcategories();
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error("Something went wrong")
        }
    }

    return (

        <Layout title={"Dashboard - Create Category"}>

            <div className="container-fluid m-3 p-3">

                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-8">

                        <h1 className="text-center">Manage Category</h1>
                        <div className="p-3 w-40">
                            <Categoryform handleonsubmit={handleonsubmit} value={name} setValue={setname} />
                        </div>
                        <div className="w-65">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => {
                                        return (
                                            <tr>
                                                <td  key={c.id}>{c.name}</td>
                                                <td><button className="btn btn-primary ms-2" onClick={()=>{setvisible(true); setUpdated(c.name); setSelected(c);}}>Edit</button></td>
                                                <td><button className="btn btn-danger ms-2" onClick={()=>{handledelete(c._id)}}>Delete</button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                        onCancel={()=>setvisible(false)}
                        footer={null}
                        visible={visible}><Categoryform value={update} setValue={setUpdated} handleonsubmit={handleupdate}/></Modal>
                    </div>

                </div>

            </div>

        </Layout>

    );
}
export default Createcategory;