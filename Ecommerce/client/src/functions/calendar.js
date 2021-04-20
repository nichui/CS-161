import axios from "axios";

//get all the categories
export const getCalendars = async () =>
    // send request to backend to get categories
    await axios.get(`${process.env.REACT_APP_API}/calendars`, {}, );

// parameter is slug instead of id
export const getCalendar = async (slug) =>
    // send request to backend to get categories
    await axios.get(`${process.env.REACT_APP_API}/calendar/${slug}`); // url
// based on slug to find category(places), protected route => we have to send token also
export const removeCalendar = async (slug, authtoken) =>
    // send request to backend to get categories
    await axios.delete(`${process.env.REACT_APP_API}/calendar/${slug}`, {
        headers : {
            authtoken
        }
    });

export const updateCalendar = async (slug, calendar, authtoken) =>
    // send request to backend to get categories
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, calendar,{
        headers : {
            authtoken
        }});

export const createCalendar = async (calendar, authtoken) =>
    // send request to backend to get categories
    await axios.post(`${process.env.REACT_APP_API}/calendar`, calendar,{
        headers : {
            authtoken
        }});









