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
            <div onClick={handleModal} style={{ color: "#000000" }}>
                <StarOutlined style={style}/> <br/>{" "}
                {user ? "Leave rating" : "Login to leave rating"}
            </div>
            <Modal
                title="Leave your rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false)
                    toast.success('Thank for yout review. It will appear soon');
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    )
}

export default RatingModal;
