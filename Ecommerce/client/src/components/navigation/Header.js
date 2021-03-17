import React, {useState} from 'react'
import {Menu, Badge} from 'antd';
import {
    HomeOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShopOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons'; 
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";


const { SubMenu, Item } = Menu; // Menu.SubMenu

const Header = () => {
    const style = {
        backgroundColor: "#d0dbd1",
        fontFamily: "Verdana",
        
    };
    
    const [current, setCurrent] = useState("home");
    let dispatch = useDispatch();
    let {user, cart} = useSelector((state) => ({...state})); /*redux state*/
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
            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register" className="float-right">Register</Link>
                </Item>
            )}

            {/* className = "float-right" to move to right side of Navbar (remember to add Bootstrap first) */}
            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>
            )}
            <Item key="home" className="float-left" icon={<HomeOutlined style={{ fontSize: '16px', color: '#3d8a44' }}/>}>
                <Link to="/">Home</Link> {/*Link to = "" equals to href ="" (go to another page)*/}
            </Item>

            <Item key="shop" className="float-left" icon={<ShoppingOutlined style={{ fontSize: '16px', color: '#3d8a44' }}/>}>
                <Link to="/shop">Shop</Link> {/*Link to = "" equals to href ="" (go to another page)*/}
            </Item>

            <Item key="cart" icon={<ShoppingOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        Cart
                    </Badge>
                </Link> {/*Link to = "" equals to href ="" (go to another page)*/}
            </Item>




            {user && (
                <SubMenu
                    key="SubMenu"
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split('@')[0]}
                    className="float-right">

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

            <span className="float-right p-1">
                <Search />
            </span>
        </Menu>
    )
}

export default Header;