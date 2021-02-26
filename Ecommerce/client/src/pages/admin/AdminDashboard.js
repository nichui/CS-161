import React from 'react'
import AdminNav from '../../components/navigation/AdminNav'
//import UserNav from "../../components/navigation/UserNav";

const AdminDashboard = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">Admin Dashboard page</div>
            </div>
        </div>
    );
};

export default AdminDashboard;