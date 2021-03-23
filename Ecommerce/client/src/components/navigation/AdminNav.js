import React from 'react';
import { Link } from 'react-router-dom';

const styleText = {
    color: "black",
};

const AdminNav = () => (
    <nav>
        <ul className="nav flex-column nav-pills" style={{ backgroundColor: "#d0dbd1" }}>
            <li className="nav-item">
                <Link to="/admin/dashboard" style={styleText} className="nav-link">Dashboard</Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/product" style={styleText} className="nav-link">Product</Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/products" style={styleText} className="nav-link">Products</Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/category" style={styleText} className="nav-link">Category</Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/sub" style={styleText} className="nav-link">Sub Category</Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/coupon" style={styleText} className="nav-link">Coupon</Link>
            </li>

            <li className="nav-item">
                <Link to="/user/password" style={styleText} className="nav-link">Password</Link>
            </li>




        </ul>
    </nav>
);

export default AdminNav;