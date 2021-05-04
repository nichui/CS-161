import React, {useState} from 'react'
import {Menu, Badge} from 'antd';
import Icons from '../icons/Icons'
import {
    HomeOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShopOutlined,
    InfoCircleOutlined,
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

    const styleText = {
        fontSize: "12px",
        color: "white",
        fontWeight: "bold",
    }

    const styleIcon = {
        color: "white",
    };

    return(
        
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{ fontFamily: "Arial", backgroundColor: "#6ecfff" }}>
            {/* Icons for Navigation components*/}
            {!user && (
                <Item key="register" icon={<UserAddOutlined />} style={styleIcon} className="float-right">
                    <Link to="/register" className="float-right" style={styleText}>REGISTER</Link>
                </Item>
            )}

            {/* className = "float-right" to move to right side of Navbar (remember to add Bootstrap first) */}
            {!user && (
                <Item key="login" icon={<UserOutlined />} style={styleIcon} className="float-right">
                    <Link to="/login" style={styleText}>LOGIN</Link>
                </Item>
            )}
            
            {/* <Item key="home" className="float-left" icon={<HomeOutlined/>}>
                <Link to="/">Home</Link> {/*Link to = "" equals to href ="" (go to another page)*
            </Item> 
            */}

            <Item key="home" className="float-left">
                <Link className="app-title" to="/">
                    <img className="app-logo" src={Icons.Beans} />
                    Got a Spot
                </Link>

            </Item>
            
            <Item key="about" className="float-left" style={styleIcon} icon={<InfoCircleOutlined />}>
                <Link to="/about" style={styleText}>ABOUT US</Link> {/*Link to = "" equals to href ="" (go to another page)*/}
            </Item>

            <Item key="shop" className="float-left" style={styleIcon} icon={<ShoppingOutlined/>}>
                <Link to="/shop" style={styleText}>SHOP</Link> {/*Link to = "" equals to href ="" (go to another page)*/}
            </Item>

            <Item key="cart" style={styleIcon} icon={<ShoppingOutlined />}>
                <Link to="/cart" style={styleText}> CART
                    <Badge count={cart.length} offset={[6, 0]}>
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
