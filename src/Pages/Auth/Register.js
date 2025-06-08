import React from 'react'
import {useState} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import Layout from '../../component/Layout/Layout/Layout';
function Register() {
  const [name,setname] = useState("");
  const [email,setemail] = useState("");
  const [phone,setphone] = useState("");
  const [address,setaddress] = useState("");
  const [password,setpassword] = useState("");
  const navigate = useNavigate();
//submit function
  const handlesubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("https://mern-stack-ecommerce-0vdj.onrender.com/api/v1/auth/register",{name,email,phone,address,password});
      if(res && res.data.success){
        toast.success(res.data.message)
        navigate("/login")
      }else{
        toast.error(res.data.message)
      }
    }catch(error){
      console.log(error);
      toast.error('Something went wrong');
    }
  }
  return (
    <Layout>
        <div className='form1' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
<form onSubmit={handlesubmit}>
      <h1>Register page</h1>
  <div className="mb-3">
    <input type="text" required value={name} onChange={(e)=> setname(e.target.value)} className="form-control" id="exampleInputname" aria-describedby="emailHelp" placeholder='Enter Full Name' />
  </div>
  <div className="mb-3">
    <input type="email" required value={email} onChange={(e)=> setemail(e.target.value)} className="form-control" id="exampleInputemail" aria-describedby="emailHelp" placeholder='Enter Email' />
  </div>
  <div className="mb-3">
    <input type="tel" required value={phone} onChange={(e)=> setphone(e.target.value)} className="form-control" id="exampleInputphone" aria-describedby="emailHelp" placeholder='Enter Your Phone Number' />
  </div>
  <div className="mb-3">
    <input type="string" required value={address} onChange={(e)=> setaddress(e.target.value)} className="form-control" id="exampleInputaddress" aria-describedby="emailHelp" placeholder='Enter Your Address' />
  </div>
  <div className="mb-3">
    <input type="password" required value={[password]} onChange={(e)=> setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Password'/>
  </div>
  <center>
  <button type="submit"  className="btn btn-primary">Register</button>
  </center>
</form>

    </div>
    </Layout>
  )
}

export default Register
