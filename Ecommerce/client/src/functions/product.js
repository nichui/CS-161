import axios from "axios";

export const createProduct = async (product, authtoken) =>
    // send request to backend to get categories
    await axios.post(`${process.env.REACT_APP_API}/product`, product,{
        headers : {
            authtoken,
        },
    });

export const getProductsByCount = async (count) =>
    // send request to backend to get categories
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`, {}, );

export const removeProduct = async (slug, authtoken) =>
    // send request to backend to get categories
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers : {
            authtoken,
        },
    });

export const getProduct = async (slug) =>
    // send request to backend to get categories
    await axios.get(`${process.env.REACT_APP_API}/product/${slug}`, {}, );

export const updateProduct = async (slug, product, authtoken) =>
    // send request to backend to get categories
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product,{
        headers : {
            authtoken,
        },
    });

export const getProducts = async (sort, order, limit) =>
    // send request to backend to get categories
    await axios.post(`${process.env.REACT_APP_API}/products`, {
        sort,
        order,
        limit
    });