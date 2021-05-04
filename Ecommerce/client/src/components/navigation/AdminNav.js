import React from 'react';
import { NavLink } from 'react-router-dom';

const styleText = {
    color: "black",
};

const AdminNav = () => (
    <>
        <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200"
            rel="stylesheet"
            />
        <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
            rel="stylesheet"
            />
    <nav>
        <ul className="nav flex-column" style={{ backgroundColor: "#d7eaf5" }}>
            <li className="nav-item">
                <NavLink activeStyle={{ fontWeight: "bold" }}
                  to="/admin/dashboard" style={styleText} className="nav-link">Dashboard</NavLink>
            </li>

            <li className="nav-item">
                <NavLink activeStyle={{ fontWeight: "bold" }}
                to="/admin/product" style={styleText} className="nav-link"> Create Product</NavLink>
            </li>

            <li className="nav-item">
                <NavLink activeStyle={{ fontWeight: "bold" }}
                to="/admin/products" style={styleText} className="nav-link">Products</NavLink>
            </li>

            <li className="nav-item">
                <NavLink activeStyle={{ fontWeight: "bold" }}
                to="/admin/category" style={styleText} className="nav-link">Category</NavLink>
            </li>

            <li className="nav-item">
                <NavLink activeStyle={{ fontWeight: "bold" }}
                to="/admin/sub" style={styleText} className="nav-link">Sub Category</NavLink>
            </li>

            <li className="nav-item">
                <NavLink activeStyle={{ fontWeight: "bold" }}
                to="/admin/coupon" style={styleText} className="nav-link">Coupon</NavLink>
            </li>
            <li className="nav-item">
                <Link to="/admin/calendar" className="nav-link">Calendar</Link>
            </li>
            <li className="nav-item">
                <NavLink activeStyle={{ fontWeight: "bold" }}
                to="/user/password" style={styleText} className="nav-link">Password</NavLink>
            </li>




        </ul>
    </nav>
    </>
);

export default AdminNav;