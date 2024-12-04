import React from 'react'
import AdminMenu from '../../component/Layout/Layout/AdminMenu';
import Layout from '../../component/Layout/Layout/Layout';

const AdminDashboard = () => {
  return (
    <Layout>
        <div className="container-fluid m-5">
          <h2>Admin Panel</h2>
          <div className="row">
            <div className="col-md-3"><AdminMenu/></div>
            <div className="col-md-3">content</div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard;