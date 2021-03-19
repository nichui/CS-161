import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {Link} from 'react-router-dom'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import {userCart} from '../functions/user';


const Cart = ({history}) => {
    const {cart, user} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    // [1,2] 100 + 200 = 300
    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
    },0);
    };

    const saveOrderToDb = () => {
        //console.log('cart', JSON.stringify(cart, null, 4));
        userCart(cart, user.token)
            .then((res) => {
                console.log('CART POST RES', res)
                if(res.data.ok){
                    history.push("/checkout");
                }
            })
            .catch(err => console.log("cart save err", err));
        history.push("/checkout");
    };

    const style = {
        backgroundColor: "#d0dbd1",
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
                    <th scope="col" style={style}> Season</th>
                    <th scope="col" style={style}>Count</th>
                    <th scope="col" style={style}>Shipping</th>
                    <th scope="col" style={style}>Remove</th>
                </tr>
            </thead>

            {cart.map((p) => (
                <ProductCardInCheckout key={p._id} p={p} />
            ))}
        </table>
    )

    const buttonStyle = {
        color: '#008000',
        padding: '5px',
    };



    return(
        <div className="container-fluid pt-2">


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
                                <p>{c.title} x {c.count} ticket(s) = ${c.price * c.count}</p>
                            </p>
                        </div>
                    ))}
                    <hr/>
                    Total: <b>${getTotal()}</b>
                    <hr/>
                    {
                        user ? (
                            <button
                                onClick={saveOrderToDb}
                                className="btn btn-sm btn-primary mt-2"
                                disabled = {!cart.length}
                            >
                                Proceed to Checkout
                            </button>
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