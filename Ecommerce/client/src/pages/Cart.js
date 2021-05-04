import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import {toast} from 'react-toastify';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import {userCart} from '../functions/user';


const Cart = ({history}) => {
    const {cart, user} = useSelector((state) => ({...state}));
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // [1,2] 100 + 200 = 300
    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        },0);
    };

    const saveOrderToDb = () => {
        setLoading(true);
        userCart(cart, user.token)
            .then((res) => {
                console.log('user/cart/ POST response', res)
                if(res.data.ok){
                    setLoading(false);
                    history.push("/checkout");
                }
            })
            .catch(err => {console.log("Server error. Please contact administration"); setLoading(false);});
    };

    const style = {
        backgroundColor: "#d7eaf5",
        color: '#000000',
    };

    const showCartItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col" style={style}>Image</th>
                    <th scope="col" style={style}>Title</th>
                    <th scope="col" style={style}>Price</th>
                    <th scope="col" style={style}>Brand</th>
                    <th scope="col" style={style}>Date and Time</th>
                    <th scope="col" style={style}>Count</th>
                    <th scope="col" style={style}>Shipping</th>
                    <th scope="col" style={style}>Remove</th>
                </tr>
            </thead>

            {cart.map((p, index) => (
                <ProductCardInCheckout key={p._id + index} p={p} />
            ))}
        </table>
    )

    const buttonStyle = {
        color: '#008000',
        padding: '5px',
    };



    return(
        <div className="container-fluid pt-2">
            <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200"
            rel="stylesheet"
            />
        <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
            rel="stylesheet"
            />

            <div className="row">
                <div className="col-md-8">
                    <h4> Cart / {cart.length} Product</h4>
                    {!cart.length ?
                        (
                            <p>
                                No products in cart. <Link to="/shop">Continue Shopping.</Link>
                            </p>
                        )
                        :
                        (
                            showCartItems()
                        )}
                </div>

                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr/>
                    <p>Products</p>
                    {cart.map((c,i) => (
                        <div key={i}>
                            <p>
                                <p>{c.title} {"("}{c.reservation.selectedDate.split(',')[0]}{")"} x {c.count} ticket(s) = ${c.price * c.count}</p>
                            </p>
                        </div>
                    ))}
                    <hr/>
                    Total: <b>${getTotal().toFixed(2)}</b>
                    <hr/>
                    {
                        user ? (
                            <Button
                                onClick={saveOrderToDb}
                                type="primary"
                                loading={loading}
                                // className="btn btn-sm btn-primary mt-2"
                                // style={{ border: '3px solid' }}
                                disabled = {!cart.length}
                            >
                                Proceed to Checkout
                            </Button>
                        ) : (
                            <button className="btn btn-sm btn-primary mt-2" style={{ border: '3px solid' }}>
                                <Link to={{
                                        pathname: "/login",
                                        state: { from: "cart"},
                                    }} style={buttonStyle}
                                >
                                    Login to Checkout
                                </Link>
                            </button>
                        )
                    }
                </div>
            </div>
    </div>
    );
};

export default Cart;