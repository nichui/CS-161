import React, {useState, useEffect} from 'react';
import { auth } from "../../firebase";
import { toast } from 'react-toastify';
import {useDispatch} from "react-redux";
import { createUser } from "../../functions/auth";

const RegisterUser = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    var   [name, setName] = useState('');

    //const {user} = useSelector(state => ({...state}));

    let dispatch = useDispatch();


    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
        /*console.log(window.location.href);
        console.log(window.localStorage.getItem("emailForRegistration"));*/
    }, [history]);
    //props.history

    const handleSubmit = async (e) => {
        e.preventDefault();
        //validation
        if(!email || !password){
            toast.error('Email and password is required')
            return;
        }
        if(!name) {
            setName(email.split('@')[0])
            name = email.split('@')[0];
        }


        if(password.length < 6){
            toast.error('Password must be at least 6 characters long');
            return;
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            //console.log("RESULT", result);
            if(result.user.emailVerified){
                //remove user email from local storage
                window.localStorage.removeItem("emailForRegistration");

                // get user id token
                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult()
                // redux store
                console.log('user', user, 'idTokenResult', idTokenResult);

                createUser(idTokenResult.token, {name, role: "subscriber"}).then(
                    (res) => {
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
                    }
                ).catch(err => console.log(err));
                // redirect
                history.push('/')
            }
        } catch(error){
            console.log(error);
            toast.error(error.message);
        }
    };

    const completeRegistrationForm = () =>
        <form onSubmit={handleSubmit}>
            <input type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full name"
                autoFocus
            />
            
            <input type="email"
                className = "form-control"
                value = {email}
                disabled
            />

            <input type="password"
                className = "form-control"
                value = {password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br/>

            <button type="submit" className="btn btn-raised">
                Complete Registration
            </button>
        </form>




    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>

                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;