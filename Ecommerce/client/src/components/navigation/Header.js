import React, {useState} from 'react'
import {Menu} from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import Home from "../../pages/Home";
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";


const { SubMenu, Item } = Menu; // Menu.SubMenu

const Header = () => {
    const [current, setCurrent] = useState("home");
    let dispatch = useDispatch();
    let {user} = useSelector((state) => ({...state})); /*redux state*/
    // access user from state
    let history = useHistory();


    const handleClick = (e) => {
        //console.log(e.key);
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push('/login');
    };
    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            {/* Icons for Navigation components*/}
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link> {/*Link to = "" equals to href ="" (go to another page)*/}
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Item>
            )}

            {/* className = "float-right" to move to right side of Navbar (remember to add Bootstrap first) */}
            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>
            )}




            {user && (
                <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-right">

                    {user && user.role === 'subscriber' && (<Item>
                        <Link to="/user/history">Dashboard</Link>
                    </Item>
                    )}

                    {user && user.role === 'admin' && (<Item>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    )}

                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>


                </SubMenu>
            )}

        </Menu>
    )
}

export default Header;