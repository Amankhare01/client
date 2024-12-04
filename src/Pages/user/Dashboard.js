import React from 'react'
import Layout from '../../component/Layout/Layout/Layout';
import Usermenu from '../../component/Layout/Layout/Usermenu';
import { useAuth } from '../context/Auth';
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
        <div className="container-fluid p-3 m-3"></div>
        <div className="row">
            <div className="col-md-3">
                <Usermenu/>
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h1>{auth?.users?.name}</h1>
                <h1>{auth?.users?.email}</h1>
                <h1>{auth?.users?.phone}</h1>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard;