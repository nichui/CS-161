import React, {useState, useEffect} from 'react';
import UserNav from '../../components/navigation/UserNav';
import {getUserOrders} from "../../functions/user";
import {useSelector, useDispatch} from "react-redux";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {toast } from "react-toastify";
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import {
    PDFDownloadLink,
    } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';

const amOrPm = (time) => {
    return parseInt(time) > 12 ? "PM" : "AM";
}
const simpleHourFormat = (time) => {
    const startTime = (parseInt(time[0].split(':')[0]) + 11) % 12 + 1;
    const endTime = (parseInt(time[1].split(':')[0]) + 11) % 12 + 1;
    return `${startTime}:${time[0].split(':')[1]} ${amOrPm(time[0])} - ${endTime}:${time[1].split(':')[1]} ${amOrPm(time[1])}`;
}

const History = () => {
    const [orders, setOrders] = useState([]);
    const {user} = useSelector((state) => ({...state}));

    const text = {
        color: "black"
    }

    useEffect(() => {
        loadUserOrders().then()
    }, [])

    const loadUserOrders = () => getUserOrders(user.token).then(res => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
    })

    const showOrderInTable = (order) =>
        <table className="table table-bordered" style={{ color: "#d0dbd1" }}>
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Date</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
            {order.products.map((p,i) => (
                <tr key={i}>
                    <td><b style={text}>{p.product.title}</b></td>
                    <td><b style={text}>{p.product.price}</b></td>
                    <td><b style={text}>{p.product.brand}</b></td>
                    <td><b style={text}>{p.reservation.selectedDate}<br></br>{simpleHourFormat(p.reservation.timeRange)}</b></td>
                    <td><b style={text}>{p.count}</b></td>
                    <td><b style={text}>{p.product.shipping === "Yes" ? (
                        <CheckCircleOutlined style={{color: "green"}}/>
                        ) : (
                            <CloseCircleOutlined style={{color: "red"}}/>
                    ) }</b></td>
                </tr>
            ))}
            </tbody>
        </table>

    const showDownloadLink = (order) => (
        <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName="invoice.pdf"
            className="btn btn-sm btn-block btn-outline-primary"
        >
            Download PDF
        </PDFDownloadLink>
    )


    const showEachOrders = () => orders.map((order, i) => (
        <div key={i} className="m-5 p-3 card">
            <ShowPaymentInfo order={order} />
            <p>show payment info</p>
            {showOrderInTable(order)}
            <div className="row">
                <div className="col">
                    {showDownloadLink(order)}
                </div>
            </div>

        </div>
    ));




    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col text-center">
                    <h4>
                        {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
                    </h4>
                    {showEachOrders()}
                </div>
            </div>
        </div>
    );
}

export default History;