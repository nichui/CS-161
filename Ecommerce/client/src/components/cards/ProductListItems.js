import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Modal, Button, Calendar} from 'antd'
const ProductListItems = ({product}) => {
    const {
        price,
        category,
        subs,
        shipping,
        season,
        brand,
        quantity,
        sold, } = product;
    
    // set states for reservation modal
    const [isModalLoading, setModalLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const showModal = () => {
        setModalVisible('true');
    }
    // load for 3sec after submitting modal   
    const handleOk = () => {
        setModalLoading(true);
        setTimeout(() => {
            setModalLoading(false);
            setModalVisible(false)
        },3000);
    }
    // cancel modal
    const handleCancel = () => {
        setModalVisible(false);
    }
    
    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price {" "}
                <span className="label label-default label-pill pull-xs-right">
                $ {price}
            </span>
            </li>

            {category && <li className="list-group-item">
                Category{" "}
                <Link to={`/category/${category.slug}`} className="label label-default label-pill pull-xs-right">
                    {category.name}
                </Link>
            </li>}



            {subs && (
                <li className="list-group-item">
                    Sub Categories
                    {subs.map((s) => (
                            <Link
                                key={s._id}
                                to={`/sub/${s.slug}`}
                                className="label label-default label-pill pull-xs-right"
                            >
                                {s.name}
                            </Link>
                    ))}
                </li>
            )}



            <li className="list-group-item">
                Shipping{" "}
                <span className="label label-default label-pill pull-xs-right">
                {shipping}
            </span>
            </li>

            <li className="list-group-item">
                Season{" "}
                <span className="label label-default label-pill pull-xs-right">
                {season}
            </span>
            </li>

            <li className="list-group-item">
                Brand{" "}
                <span className="label label-default label-pill pull-xs-right">
                {brand}
            </span>
            </li>

            {/* <li className="list-group-item">
                Available{" "}
                <span className="label label-default label-pill pull-xs-right">
                {quantity}
            </span>
            </li> */}
            <li className="list-group-item">
                <div></div>
                <Button type="primary" block size='large' onClick={showModal}>
                    <div></div>
                    Reserve Your Spot
                </Button>
            </li>
            <Modal
                visible={isModalVisible}
                title="Schedule a Time"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                    Return
                    </Button>,
                    <Button key="submit" type="primary" loading={isModalLoading} onClick={handleOk}>
                    Submit
                    </Button>,
                ]}
                >
                  <div className="site-calendar-demo-card">
                    <Calendar fullscreen={false} />
                 </div>
            </Modal> 
                
            <li className="list-group-item">
                Sold{" "}
                <span className="label label-default label-pill pull-xs-right">
                {sold}
            </span>
            </li>

        </ul>
    )
}

export default ProductListItems;