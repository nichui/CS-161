import React, { useState } from 'react'
import {Modal, Button} from 'antd'
import {toast} from 'react-toastify'
import {useSelector} from "react-redux";
import {StarOutlined} from "@ant-design/icons";
import Star from "react-star-ratings/build/star";
import {useHistory, useParams} from 'react-router-dom'

const RatingModal = ({children}) => {
    const {user} = useSelector((state) => ({...state }));
    const [modalVisible, setModalVisible] = useState(false);
    let history = useHistory();
    let {slug} = useParams();

    console.log("slug", slug);
    const handleModal = () => {
        if(user && user.token){
            setModalVisible(true)
        }
        else{
            history.push({
                pathname: '/login',
                state: { from: `/product/${slug}` }
            });
        }
    }

    const style = {
        color: "#008000",
    };

    return(
        <>
        <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200"
            rel="stylesheet"
            />
        <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
            rel="stylesheet"
            />
            <div onClick={handleModal} style={{ color: "#000000" }}>
                <StarOutlined style={style}/> <br/>{" "}
                {user ? <p>Leave rating</p> : <p>Login to leave rating</p>}
            </div>
            <Modal
                title="Leave your rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false)
                    toast.success('Thank you for your review. It will appear soon.');
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    )
}

export default RatingModal;
