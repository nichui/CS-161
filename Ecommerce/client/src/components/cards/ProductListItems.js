import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Modal, Button, Calendar, Radio, Alert} from 'antd'
import moment from 'moment'
import { toast } from 'react-toastify'
const ProductListItems = ({product, setReservation}) => {
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
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedTime, setSelectedTime] = useState([]);
    const showModal = () => {
        if (calendar){
            setModalVisible('true');
        }
        else {
            toast.error("Server error. Please contact administration.")
        }
    }
    // RESERVASTION: load for 3sec after submitting modal   
    const handleOk = () => {
        const values = {
            "selectedDate": selectedDate.format("MMM DD, YYYY"),
            "timeRange": selectedTime
        }
        console.log('receive selected date and time: ', values);
        setReservation(values);
        setModalVisible(false)
        // setModalLoading(true);

        // setTimeout(() => {
        //     setModalLoading(false);
        //     setModalVisible(false)
        // },3000);
    }
    // RESERVATION: cancel modal
    const handleCancel = () => {
        setModalVisible(false);
    }
    const disabledDate = (current) => {
        if (calendar){
            const dayOfWeek = moment(current).format("dddd");
            return moment().add(-1, 'days') >= current || 
                    calendar.unavailableWeekDays.indexOf(dayOfWeek) > -1 || 
                    moment().add(calendar.monthsToScroll, 'month')  <= current;
        }
        return false;
    }
    const disableSubmit = (date, time) => {
        return disabledDate(date) || time.length === 0 || disableTimeSlot(date, time)
    }
    const handleChange = (date) => {
        setSelectedDate(date);
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
                    {selectedDate && selectedTime.length > 0 ? simpleHourFormat(selectedTime) + " on " + selectedDate.format('MMM DD') : "Reserve Your Spot"}
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
                    <Button key="submit" type="primary" loading={isModalLoading} onClick={handleOk} disabled={disableSubmit(selectedDate, selectedTime)}>
                    Submit
                    </Button>,
                ]}
                >   
                    {selectedDate && !disabledDate(selectedDate) &&
                    <Alert
                        message={`You selected date: ${selectedDate.format('YYYY-MM-DD')}`}
                    />
                    }
                  <div className="site-calendar-demo-card">
                    <Calendar 
                        fullscreen={false}
                        disabledDate={disabledDate}
                        onChange={handleChange}
                        value={selectedDate}
                        />
                 </div>
                              
                    {selectedDate && !disabledDate(selectedDate) &&
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
                {bookedDate.timeSlots.map((x, index) => 
                <Radio.Button 
                    key={index}
                    value={x.timeRange}
                    disabled={disableTimeSlot(selectedDate, x.timeRange)}
                >{simpleHourFormat(x.timeRange)} ({x.availTickets})</Radio.Button>)}
            </Radio.Group>
        )
    }
    return (
        <Radio.Group buttonStyle="solid" onChange={(e) => setSelectedTime(e.target.value)}>
            {calendar.timeSlots.map((x, index) => 
            <Radio.Button 
                value={x.timeRange}
                disabled={disableTimeSlot(selectedDate, x.timeRange)}
            >{simpleHourFormat(x.timeRange)} ({x.maxTicketCount} left)</Radio.Button>)}
        </Radio.Group>
    )
}
const amOrPm = (time) => {
    return parseInt(time) > 12 ? "PM" : "AM";
}
const simpleHourFormat = (time) => {
    const startTime = (parseInt(time[0].split(':')[0]) + 11) % 12 + 1;
    const endTime = (parseInt(time[1].split(':')[0]) + 11) % 12 + 1;
    return `${startTime}:${time[0].split(':')[1]} ${amOrPm(time[0])} - ${endTime}:${time[1].split(':')[1]} ${amOrPm(time[1])}`;
}
const disableTimeSlot = (date, time) => {
    const formattedSelectedDate = date.format('YYYY-MM-DD')
    const formattedToday = moment().format('YYYY-MM-DD')
    return (formattedSelectedDate === formattedToday) && (parseInt(moment().format('HH')) > parseInt(time[0].split(':')[0]))
}
export default ProductListItems;