import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from '../../../Pages/context/Auth';
import toast from 'react-hot-toast';
import Usecategory from '../../../Hooks/Usecategory';
import { useCart } from '../../../Pages/context/Cart';
import Searchinput from '../form/Searchinput';
const Header = () => {
  const [cart] = useCart();
  const[auth,setAuth] = useAuth();
  const categories = Usecategory();
  const handlelogout = ()=>{
    setAuth({
      ...auth,
      users:null,
      token:'',
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfuly");
  };
  return (
    <div>
  <nav  className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <NavLink to={"/"} className="navbar-brand"><FaCartShopping />  Ecommerce</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <Searchinput/>
          <li className="nav-item">
            <NavLink to={"/About"} className="nav-link active" aria-current="page">About</NavLink>
          </li>
          <li className="nav-item dropdown">
  <Link className="nav-link active dropdown-toggle" to={'/categories'}data-bs-toggle="dropdown">
    Category
  </Link>
  {categories?.map(c=>(
    <ul className="dropdown-menu">
    <li><NavLink className="nav-link active" to={'/categories'}>All Categories</NavLink></li>
    <li><NavLink className="nav-link active" to={`/category/${c.slug}`}>{c.name}</NavLink></li>
  </ul>
  ))}
</li>

          {
            !auth.users ? (<><li className="nav-item">
            <NavLink className="nav-link active" to={"/Register"}>Register</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" to={"/Login"}>Login</NavLink>
          </li></>) : (<>
            <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {auth?.users?.name}
          </NavLink>
          <ul className="dropdown-menu">
            {/* <li><NavLink className="nav-link active" to={`/Dashboard/${auth?.users?.role === 1 ? "Admin" : "user"}`}>Dashboard</NavLink></li> */}
            {/* <li><NavLink to={'/AdminDashboard'} className="nav-link active">AdminDashboard</NavLink></li> */}
            <li><NavLink to={'/admin/products'} className="nav-link active">All-Products</NavLink></li>
            {/* <li><NavLink to={'/Create-category'} className="nav-link active">Create Category</NavLink></li> */}
            {/* <li><NavLink to={'/Createproduct'} className="nav-link active">Create Product</NavLink></li> */}
            <li><NavLink to={'/Profile'} className="nav-link active">Profile</NavLink></li>
            <li><NavLink to={'/users/orders'} className="nav-link active">Orders</NavLink></li>
            <li><NavLink onClick={handlelogout} className="nav-link active" to={"/Login"}>Logout</NavLink></li>
          </ul>
        </li></>)
          }
          <li className="nav-item">
            <NavLink className="nav-link active" to={"/Cart"}>Cart {cart?.length}</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

  )
}

export default Header

// {`/Dashboard/${auth?.users?.role === 1 ? 'admin' : 'user'}`}