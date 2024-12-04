import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div>
      <div className="list-group">
        <NavLink to="/Create-category" className="list-group-item list-group-item-action show">Create category</NavLink>
        <NavLink to="/Createproduct" className="list-group-item list-group-item-action show">Create Product</NavLink>
        <NavLink to="/admin/update-prod/:slug" className="list-group-item list-group-item-action show">Update Product</NavLink>
        <NavLink to="/AdminOrders" className="list-group-item list-group-item-action show">Orders</NavLink>

      </div>
    </div>
  );
};

export default AdminMenu;
