import React, {useState} from 'react';
import UserNav from '../../components/navigation/UserNav';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {load} from "dotenv";
import {Button} from "reactstrap";


const Password = () => {
    const[password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // make sure page doesn't reload.
        setLoading(true)
        //console.log(password);

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success('Password updated');
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.message);
            });
    };

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="">Your Password</label>
                <input type="password"
                       onChange={e => setPassword(e.target.value)}
                       className="form-control"
                       placeholder="Enter new password"
                       disabled={loading}
                       value = {password}
                />
                <Button style={{ color: "black" }} className="btn btn-primary" disabled={!password || password.length < 6 || loading}>
                    Submit
                </Button>
            </div>
        </form>
    )
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading</h4>) : (<h4>Password Update</h4>)}

                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
};

export default Password;