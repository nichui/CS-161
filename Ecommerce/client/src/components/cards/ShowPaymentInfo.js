import React from 'react';

const style = {
    color: "black"
}

const ShowPaymentInfo = ({order, showStatus = true}) => (
    <div>
        <p>
            <span style={style}>Order Id: {order.paymentIntent.id}</span>{" "}
            <br/>
            <span style={style}>
                Amount: {' '}
                {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency : 'USD',
            })}
            </span>{' '}
            <br/>
            <span style={style}>
                Currency: {order.paymentIntent.currency.toUpperCase()}
            </span>{' '}
            <br/>
            <span style={style}>
                Method: {order.paymentIntent.payment_method_types[0]}
            </span>{' '}
            <br/>
            <span style={style}>
                Payment: {order.paymentIntent.status.toUpperCase()}
            </span>{' '}
            <br/>
            <span style={style}>
                Ordered on : {new Date(order.paymentIntent.created * 1000).toLocaleDateString()}
            </span>{' '}
            <br />
            {showStatus && (<span className="badge bg-primary text-white" style={style}>

                STATUS: {order.orderStatus}
            </span>
            )}


        </p>
    </div>
)

export default ShowPaymentInfo