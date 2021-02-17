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
import RegisterComplete from './pages/authentication/RegisterComplete';

import {auth} from './firebase'
import {useDispatch} from 'react-redux'


const App = () => {
    const dispatch = useDispatch();
    /*
    /!*import mongoose*!/
    const mongoose = require("mongoose");
    /!*import dotenv*!/
    const dotenv = require("dotenv");
    dotenv.config();

    /!*database connection*!/
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true})
        .then(() => console.log("DB Connected"));

    mongoose.connection.on("error", err => {
        console.log(`DB connection error: ${err.message}`);
    });*/

    // to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if(user){
                const idTokenResult = await user.getIdTokenResult()
                console.log("user", user);
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    },
                });
            }
        });
        // cleanup
        return () => unsubscribe();
    }, [])
    return (
        <>
            <Header/>
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/register/complete" component={RegisterComplete} />
                <Route exact path="/forgot/password" component={ForgotPassword} />
            </Switch>
        </>




    );
}



export default App;
