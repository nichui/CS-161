import axios from "axios";

//get all the categories
export const getCategories = async () =>
    // send request to backend to get categories
    await axios.get(`${process.env.REACT_APP_API}/categories`, {}, );

// parameter is slug instead of id
export const getCategory = async (slug) =>
    // send request to backend to get categories
    await axios.get(`${process.env.REACT_APP_API}/category/${slug}`); // url
// based on slug to find category(places), protected route => we have to send token also
export const removeCategory = async (slug, authtoken) =>
    // send request to backend to get categories
    await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers : {
            authtoken
        }
    });

export const updateCategory = async (slug, category, authtoken) =>
    // send request to backend to get categories
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category ,{
        headers : {
            authtoken
        }});

export const createCategory = async (category, authtoken) =>
    // send request to backend to get categories
    await axios.post(`${process.env.REACT_APP_API}/category`, category,{
        headers : {
            authtoken
        }});

export const getCategorySubs = async (_id) =>
    // send request to backend to get categories
    await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`); // url








