import './App.css';
import {Routes, Route } from "react-router-dom";
import Hompage from './Pages/Hompage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Pagenotfound from './Pages/Pagenotfound';
import Policy from './Pages/Policy';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/user/Dashboard';
import AdminRoute from './component/Layout/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Orders from './Pages/user/Orders';
import Profile from './Pages/user/Profile';
import PrivateRoute from './component/Layout/Routes/PrivateRoute';
import Createcategory from './Pages/Admin/Createcategory'
import Createproduct from './Pages/Admin/Createproduct';
import Products from './Pages/Admin/Products';
import Updateproduct from './Pages/Admin/Updateproduct';
import Searchx from './Pages/Searchx';
import Productdetail from './Pages/Productdetail';
import Categories from './Pages/user/Categories';
import Categoryproduct from './Pages/user/Categoryproduct';
import Cartpage from './Cartpage';
import AdminOrders from './Pages/Admin/AdminOrders';
import Updateprod from './Pages/Admin/Updateprod';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Hompage />} />
        <Route path="/Cart" element={<Cartpage />} />
        <Route path="/category/:slug" element={<Categoryproduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:slug" element={<Productdetail />} />
        <Route path="/search" element={<Searchx />} />
        <Route path="/Createproduct" element={<Createproduct/>}/>
        <Route path="/admin/update-product/:slug" element={<Updateproduct/>}/>
        <Route path="/admin/update-prod/:slug" element={<Updateprod/>}/>
        <Route path='/admin/products' element={<Products/>}/>
        <Route path='/Create-category' element={<Createcategory/>}/>
        <Route path='/Aman-admin' element={<AdminDashboard/>}/>
        <Route path='/Profile' element={<Profile/>}>
        </Route>
        <Route path='/users/orders' element={<Orders/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/AdminOrders" element={<AdminOrders />}/>
        <Route path="/dashboard" element={<AdminRoute />}>

        <Route path="admin/" element={<AdminDashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
  );
}

export default App;
