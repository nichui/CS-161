import axios from "axios";

//end-point
export const createUser = async (authtoken, info) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-user`, { info }, {
        headers: {
            authtoken,
        },
    });
};

export const currentUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`
        , {},
        {
        headers: {
            authtoken,
        },
    });
};

export const currentAdmin = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-admin`, {}, {
        headers: {
            authtoken,
        }
    });
};