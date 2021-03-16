import React, {useState} from 'react'
import {Card, Tabs, Tooltip} from 'antd'
import {Link} from 'react-router-dom'
import {HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import Default from'../../images/Default.jpg';
import ProductListItems from './ProductListItems';
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import {showAverage} from "../../functions/rating";
import _ from 'lodash';
import {useSelector, useDispatch} from "react-redux";

import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const{TabPane} = Tabs;

const {Meta} = Card;

// this is children component of Product page
const SingleProduct = ({product, onStarClick, star}) => {
    const [tooltip, setTooltip] = useState('Click to add');
    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch()
    const {title, address, city, state, zipcode, images, description, email, phone, _id} = product;

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
            })

            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            })
        }
    }
    return(
        <>

            <div className="col-md-7">
                {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
                </Carousel> :
                    (<Card
                        cover={
                            <img
                                src={Default}
                                className="mb-3 card-image"
                            />

                        }
                    >

                    </Card>)
                }
                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="Contact Info" key="2">
                        Contact us on {email} or {phone} to learn more about this product.
                    </TabPane>
                </Tabs>
            </div>




            <div className="clo-md-5">
                <h1 className="bg-info p-3">
                    {title}
                </h1>

                <h6 className="p-2">
                    {address} <br />
                    {city} {state} {zipcode}
                </h6>
                
                {product && product.ratings && product.ratings.length > 0
                    ? showAverage(product)
                    : <div className="text-center pt-1 pb-3">No rating yet</div>}


                <Card
                    actions = {[
                        /*<>
                            <ShoppingCartOutlined className="text-success" /><br/>
                            Add to Cart
                        </>*/
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger"/> <br/> Add to Cart
                            </a>
                        </Tooltip>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /><br/>
                            Add to Wishlist
                        </Link>,
                        <RatingModal>
                            <StarRatings
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="green"

                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
