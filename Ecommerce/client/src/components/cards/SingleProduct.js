import React, {useState} from 'react'
import {Card, Tabs, Tooltip} from 'antd'
import {Link} from 'react-router-dom'
import {CarryOutTwoTone, HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import Default from'../../images/Default.jpg';
import ProductListItems from './ProductListItems';
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import {showAverage} from "../../functions/rating";
import _ from 'lodash';
import {useSelector, useDispatch} from "react-redux";
import {addToWishlist} from "../../functions/user";
import {toast} from "react-toastify";
import {useHistory} from 'react-router-dom'

import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const{TabPane} = Tabs;

const {Meta} = Card;

// this is children component of Product page
const SingleProduct = ({product, onStarClick, star}) => {
    const [reservation, setReservation] = useState(null);
    const [tooltip, setTooltip] = useState('Click to add');
    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch()
    // router
    let history = useHistory();
    const {title, images, description, _id} = product;

    const handleAddToCart = () => {
        if (!reservation){
            toast.error("Please select a time for your reservation.")
        }
        else{
        // create cart array
            let cart = []
            if(typeof window !== 'undefined'){
                // if cart is in localstorage GET it
                if(localStorage.getItem('cart')){
                    cart = JSON.parse(localStorage.getItem('cart'));
                }
                const newCartItem = {
                    ...product,
                    count: 1,
                    reservation: reservation
                }
                const isItemInCart = cart.filter(x => x._id === newCartItem._id && isSameReservation(x.reservation, newCartItem.reservation))
                if (isItemInCart.length === 0){
                    cart.push(newCartItem);
                }else {
                    toast.error("This item is already in your cart.");
                }
              
                // remove duplicates
                // let unique = _.uniqWith(cart, _.isEqual)
                // save to local storage
                // console.log('unique', unique)
                localStorage.setItem('cart', JSON.stringify(cart));
                // show tooltip
                setTooltip("Added");

                // add to redux state
                dispatch({
                    type: "ADD_TO_CART",
                    payload: cart,
                })

                // show cart items in side drawer
                dispatch({
                    type: "SET_VISIBLE",
                    payload: true,
                })
            }
        }
    }

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
            console.log('ADDED TO WISHLIST', res.data);
            toast.success('Added to wishlist')
            history.push('/user/wishlist');
        });
    };
    const isSameReservation = (res1, res2) => {
        console.log(res1);
        console.log(res2);
        return res1.selectedDate === res2.selectedDate && 
                res1.timeRange[0] === res2.timeRange[0] && 
                res1.timeRange[1] === res2.timeRange[1]
    }
    const style = {
        color: "#008000",
    };



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
                    <TabPane tab="More" key="2">
                        Call us on xxx-xxx-xxxx to learn more about this product.
                    </TabPane>
                </Tabs>
            </div>




            <div className="clo-md-5" style={{ position: "relative", left: "100px" }}>
                <h1 className="p-3" style={{ backgroundColor: "#d0dbd1" }}>
                    {title}
                </h1>

                {product && product.ratings && product.ratings.length > 0
                    ? showAverage(product)
                    : <div className="text-center pt-1 pb-3">No rating yet</div>}


                <Card style={{ width: "400px" }}
                    actions = {[
                        /*<>
                            <ShoppingCartOutlined className="text-success" /><br/>
                            Add to Cart
                        </>*/
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart} style={{ color: "#000000" }}>
                                <ShoppingCartOutlined style={style}/> <br/> Add to Cart
                            </a>
                        </Tooltip>,
                        <a onClick={handleAddToWishlist} style={{ color: "#000000" }}>
                            <HeartOutlined className="text-danger" /><br/>
                            Add to Wishlist
                        </a>,
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
                    <ProductListItems product={product} setReservation={setReservation}/>
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
