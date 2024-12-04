import React from 'react'
import Layout from '../../component/Layout/Layout/Layout'
import { useAuth } from '../context/Auth'
const Profile = () => {
  const [auth] = useAuth();
  return (
    <Layout>
        <div className="container-fluid p-3 m-3"></div>
        <div className="row">
            <div className="col-md-3">
            </div>
            <div className="col-md-9"></div>
            <h2 className='text-center'>Profile</h2>
            <div className="mx-auto col-md-9">
            <div className="container">
  <div className="card mx-auto mt-5" style={{ width: "38rem" }}>
    <div className="card-body">
      <h5 className="card-title text-center">User Information</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"><strong>Name:</strong> {auth?.users?.name}</li>
        <li className="list-group-item"><strong>Email:</strong> {auth?.users?.email}</li>
        <li className="list-group-item"><strong>Phone:</strong> {auth?.users?.phone}</li>
        <li className="list-group-item"><strong>Address:</strong> {auth?.users?.address}</li>
      </ul>
    </div>
  </div>
</div>

            </div>
        </div>
    </Layout>
  )
}

export default Profile
