import logo from './logo.svg';
/*import './App.css';*/
import React, {useEffect} from "react";
import {Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./pages/authentication/ForgotPassword";

import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Home from './pages/Home';
import Header from './components/navigation/Header';
import RegisterUser from './pages/authentication/RegisterUser';
import RegisterVendor from './pages/authentication/RegisterVendor';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoutes';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from './components/routes/AdminRoute';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideDrawer from "./components/drawer/SideDrawer";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
import Payment from "./pages/Payment";


import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import {createOrUpdateUser, currentUser} from "./functions/auth";


/*/!*import mongoose*!/
const mongoose = require("mongoose");
/!*import dotenv*!/
const dotenv = require("dotenv");
dotenv.config();*/

/*/!*database connection*!/
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true})
    .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});*/


const App = () => {
    const dispatch = useDispatch();

    // to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if(user){
                const idTokenResult = await user.getIdTokenResult()
                //console.log("user", user);

                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });
        // cleanup
        return () => unsubscribe();
    }, [dispatch]);
    return (
        <>
            <Header/>
            <SideDrawer />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/register/user" component={RegisterUser} />
                <Route exact path="/register/vendor" component={RegisterVendor} />
                <Route exact path="/forgot/password" component={ForgotPassword} />
                <UserRoute exact path="/user/history" component={History} />
                <UserRoute exact path="/user/password" component={Password} />
                <UserRoute exact path="/user/wishlist" component={Wishlist} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/admin/category" component={CategoryCreate} />
                <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
                <AdminRoute exact path="/admin/sub" component={SubCreate} />
                <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
                <AdminRoute exact path="/admin/product" component={ProductCreate} />
                <AdminRoute exact path="/admin/products" component={AllProducts} />
                <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
                <Route exact path="/product/:slug" component={Product} />
                <Route exact path="/category/:slug" component={CategoryHome} />
                <Route exact path="/sub/:slug" component={SubHome} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />
                <UserRoute exact path="/checkout" component={Checkout} />
                <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
                <UserRoute exact path="/payment" component={Payment} />


            </Switch>
        </>

    );
}



export default App;
