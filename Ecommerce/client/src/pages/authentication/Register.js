import React, {useState, useEffect} from 'react';
import { auth } from "../../firebase";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const Register = ({history}) => {
    const [email, setEmail] = useState('');
    const {user} = useSelector(state => ({...state}));
    const { REACT_APP_REGISTER_VENDOR_REDIRECT_URL } = process.env;

    useEffect(() => {
        if(user && user.token){
            history.push('/');
        }
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log('ENV ---->', process.env.REACT_APP_REGISTER_REDIRECT_URL)
        const config = {
            url: REACT_APP_REGISTER_VENDOR_REDIRECT_URL,
            handleCodeInApp: true
        }
        try{
            await auth.sendSignInLinkToEmail(email, config)
            toast.success(`Email is sent to ${email}. Click the link to complete your registration.`
            );
        }
        catch (error) {
            toast.error('Invalid Email Form. Please try again!!!');
        }

        // Save user email is local storage
        window.localStorage.setItem('emailForRegistration', email)
        // clear state
        setEmail("");
    };

    const handleClick = async (e) => {
        e.preventDefault();
        //console.log('ENV ---->', process.env.REACT_APP_REGISTER_REDIRECT_URL)
        const config = {
            url: process.env.REACT_APP_REGISTER_USER_REDIRECT_URL,
            handleCodeInApp: true
        }
        try{
            await auth.sendSignInLinkToEmail(email, config)
            toast.success(`Email is sent to ${email}. Click the link to complete your registration.`
            );
        }
        catch (error) {
            toast.error('Invalid Email Form. Please try again!!!');
        }

        // Save user email is local storage
        window.localStorage.setItem('emailForRegistration', email)
        // clear state
        setEmail("");
    };

    const registerForm = () => <form onSubmit={handleSubmit}>
        <input type="email"
               className = "form-control"
               value = {email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder= "Your Email"
               autoFocus
        />
        <br/>
        <div>
        <button type="submit" className="btn btn-raised">
            Register as vendor
        </button>
        <button type="button" className="btn btn-raised" onClick={handleClick}>
            Register as user
        </button>
        </div>
    </form>




    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>

                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;