import axios from "axios";

//get all the categories
export const getSubs = async () =>
    // send request to backend to get categories
    await axios.get(`${process.env.REACT_APP_API}/subs`, {}, );

// parameter is slug instead of id
export const getSub = async (slug) =>
    // send request to backend to get categories
    await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`); // url
// based on slug to find category(places), protected route => we have to send token also
export const removeSub = async (slug, authtoken) =>
    // send request to backend to get categories
    await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers : {
            authtoken
        }
    });

export const updateSub = async (slug, sub, authtoken) =>
    // send request to backend to get categories
    await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub ,{
        headers : {
            authtoken
        }});

export const createSub = async (sub, authtoken) =>
    // send request to backend to get categories
    await axios.post(`${process.env.REACT_APP_API}/sub`, sub,{
        headers : {
            authtoken
        }});







