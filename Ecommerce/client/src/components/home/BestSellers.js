import React, {useEffect, useState} from 'react'
/*import './App.css';*/
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import {getProducts} from "../../functions/product";

const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true);

        getProducts('sold', 'desc', 3) // get newly added products
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            });
    };


    return (
        <>




            <div className="container">
                {
                    loading ? (
                        <LoadingCard count={3} />
                    ) : (
                        <div className="row">
                            {products.map((product) => (
                                <div key={product._id} className="col-md-4">
                                    <ProductCard product={product}/>
                                </div>
                            ))}
                        </div>)}
            </div>
        </>
    )};




export default BestSellers;