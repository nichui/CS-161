import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Modal, Button, Calendar, Radio} from 'antd'
import moment from 'moment'
const ProductListItems = ({product}) => {
    const {
        price,
        category,
        subs,
        shipping,
        season,
        brand,
        quantity,
        sold,
        calendar, } = product;
    
    // RESERVATION: set states for reservation modal
    const [isModalLoading, setModalLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState([]);
    const showModal = () => {
        setModalVisible('true');
    }
    // RESERVASTION: load for 3sec after submitting modal   
    const handleOk = () => {
        const values = {
            "date": selectedDate,
            "timeSlot": selectedTime
        }
        console.log('receive selected date and time: ', values)
        setModalLoading(true);

        setTimeout(() => {
            setModalLoading(false);
            setModalVisible(false)
        },3000);
    }
    // RESERVATION: cancel modal
    const handleCancel = () => {
        setModalVisible(false);
    }
    const disabledDate = (current) => {
        const dayOfWeek = moment(current).format("dddd")
        return current.valueOf() < Date.now() || calendar.unavailableWeekDays.indexOf(dayOfWeek) > -1
    }
    const handleChange = (date) => {
        setSelectedDate(date.format("MMM D YYYY"))
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
                    <Calendar 
                        fullscreen={false}
                        disabledDate={disabledDate}
                        onChange={handleChange}
                        />
                 </div>
                              
                    {selectedDate &&
                        <div key={selectedDate}>
                            <ShowTimeSlot selectedDate={selectedDate} setSelectedTime={setSelectedTime} calendar={calendar}/>
                        </div>
                    }
                
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
function ShowTimeSlot({selectedDate, setSelectedTime, calendar}){
    const bookedDate = calendar.bookedDates.find(d => 
        d.date === selectedDate
    )

    if (bookedDate){
        return (       
            <Radio.Group buttonStyle="solid" onChange={(e) => setSelectedTime(e.target.value)}>
                {bookedDate.timeSlots.map((x, index) => <Radio.Button value={x.timeRange}>{x.timeRange[0]} - {x.timeRange[1]} ({x.availTickets})</Radio.Button>)}
            </Radio.Group>
        )
    }
    return (
        <Radio.Group buttonStyle="solid" onChange={(e) => setSelectedTime(e.target.value)}>
            {calendar.timeSlots.map((x, index) => <Radio.Button value={x.timeRange}>{x.timeRange[0]} - {x.timeRange[1]} ({x.maxTicketCount} left)</Radio.Button>)}
        </Radio.Group>
    )
}
export default ProductListItems;