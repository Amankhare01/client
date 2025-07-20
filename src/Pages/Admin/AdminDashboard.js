import React from 'react'
import AdminMenu from '../../component/Layout/Layout/AdminMenu';
import Layout from '../../component/Layout/Layout/Layout';

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <h2>Admin Panel</h2>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-3">
            <div className="p-4 bg-light border rounded shadow-sm text-center">
              <h4 className="text-secondary">Please select an option from the menu</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard;
