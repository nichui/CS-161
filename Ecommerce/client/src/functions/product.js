import axios from "axios";

export const createProduct = async (product, authtoken) =>
    // send request to backend to get categories
    await axios.post(`${process.env.REACT_APP_API}/product`, product,{
        headers : {
            authtoken,
        },
    });