import React, {useState} from 'react';
import {Card, Tooltip} from 'antd';
import {DeleteOutlined, EditOutlined, EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import Default from '../../images/Default.jpg';
import { Link } from "react-router-dom";
import {showAverage} from "../../functions/rating";
import _ from 'lodash';
import {useSelector, useDispatch} from "react-redux";


const {Meta} = Card;


const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState('Click to add');
    //destructure
    const {images, title, description, slug, price} = product;
    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch()


    const handleAddToCart = () => {

        // create cart array
        let cart = []
        if(typeof window !== 'undefined'){
            // if cart is in localstorage GET it
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual)
            // save to local storage
            // console.log('unique', unique)
            localStorage.setItem('cart', JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");

            // add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            })
        }
    }

    const textStyle = {
        color: "#000000",
    }

    const iconStyle = {
        color: "#008000",
    };


    return(
    <>
    <Card style={{ border: '2px solid' }}
        cover={
        <img
            src={images && images.length ? images[0].url : Default}
            style={{height: "150px", objectFit: "cover"}}
            className="p-1"
        />
    }

        actions={[
            <Link to={`/product/${slug}`} style={textStyle}>
                <EyeOutlined style={iconStyle}/> <br/> View Location
            </Link>,
            // <Tooltip title={tooltip}>
            //     <a onClick={handleAddToCart} disabled={product.quantity < 1} style={textStyle}>
            //         <ShoppingCartOutlined style={iconStyle}/> <br/>
            //         {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
            //     </a>
            // </Tooltip>
        ]}
        >
            
        <Meta
            title={`${title} - $${price}`}
            
            description={`${description && description.substring(0, 50)}...`}
        />
        {product && product.ratings && product.ratings.length > 0
            ? showAverage(product)
            : <div className="text-center pt-1 pb-3">No rating yet</div>}
    </Card>
    
        </>
)};

export default ProductCard;