import React from 'react';
import ModalImage from 'react-modal-image'
import Default from '../../images/Default.jpg';
import {useDispatch} from "react-redux";


const ProductCardInCheckout = ({p}) => {
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'Whole Year'];
    let dispatch = useDispatch();
    const handleSeasonChange = e => {
        console.log('Season changed', e.target.value);

        let cart = []
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.map((product, i) => {
                if(product._id === p._id){
                    cart[i].season = e.target.value;
                }
            });

            //console.log('card update season', cart)
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }
    return(
        <tbody>
            <tr>
                <td>
                    <div style={{width: "100px", height: "auto"}}>
                        {p.images.length ? (
                            <ModalImage
                                small={p.images[0].url}
                                large={p.images[0].url}
                            />
                            ) : (
                            <ModalImage
                                small={Default}
                                large={Default}
                            />
                        )}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>$ {p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select
                        onChange={handleSeasonChange}
                        name="season"
                        className="form-control"
                        id="">
                        {p.season ? <option value={p.season}>
                            {p.season}
                        </option> : <option>
                            Select
                        </option>}
                        {seasons.filter((s) => s !== p.season).map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </td>
                <td>{p.count}</td>
                <td>Shipping Icon</td>
                <td>Delete Icon</td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout