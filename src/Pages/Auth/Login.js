import React from 'react'
import axios from "axios"
import {useNavigate, useLocation} from 'react-router-dom'
import toast from 'react-hot-toast';
import {useState} from 'react'
import {useAuth} from '../context/Auth.js';
import Layout from '../../component/Layout/Layout/Layout.js';
const Login = () => {
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth , setAuth] = useAuth();
  const handlesubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("https://mernstackecommerce-production.up.railway.app/api/v1/auth/login",{email,password});
      if(res && res.data.success){
        toast.success(res.data.message)
        setAuth({
          ...auth,
          users: res.data.users,
          token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state || "/")
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
      <h1>Login page</h1>
  <div className="mb-3">
    <input type="email" required value={email} onChange={(e)=> setemail(e.target.value)} className="form-control" id="exampleInputemail" aria-describedby="emailHelp" placeholder='Enter Email' />
  </div>
  <div>
    <input type="password" required value={[password]} onChange={(e)=> setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Password'/>
  </div>
  <center>
  <button type="submit"  className="btn btn-primary m-2">Login</button>
  </center>
</form>

    </div>
    </Layout>
  )
}

export default Login
