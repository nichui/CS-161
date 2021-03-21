import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/navigation/AdminNav';
import { Input, DatePicker, TimePicker, Checkbox, Button, InputNumber, Select } from 'antd';
import moment from 'moment';
import update from 'immutability-helper';
import Icons from '../../../components/icons/Icons';
import {getProductsByCount} from "../../../functions/product";

// disable today and days before today
const disabledDate = (current) => {
    return current & current < moment().add(1, 'day').endOf('day');
}

const max_avail_months = 12;
const dateFormat = 'MM/DD/YYYY';
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Calendar's initial values
const initialState = {
    title:"",
    location: "",
    months: 1,
    startDate: moment().add(1, 'day').endOf('day'),
    disabledDate: disabledDate,
    unavailableWeekDays: [],
    timeSlots:[{id: 0, from:'', until:''}],
    ticketCount: 0,
    maxTicketCountPerPerson: 0
};

function CalendarCreate(){
    const [values, setValues] = useState(initialState);
    const [locationList, setLocationList] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value});
    }
    const handleDateChange = (date, dateString) => {
        setValues({...values, startDate: date});
        console.log(date);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit calendar");
    }
    const handleCheckboxGroupChange = (list) => {
        setValues({...values, unavailableWeekDays: list})
    }
    const addTimeSlot = () => {
        const TimeSlotList = values.timeSlots;
        const newTimeSlotList = TimeSlotList.concat({id: TimeSlotList.length,from: '', until: ''});
        setValues({...values, timeSlots: newTimeSlotList});
    }
    const handleTimeChange = (time, timeString, id) => {
        const timeSlotIndex = values.timeSlots.findIndex(x => x.id === id)
        const updatedTimeSlot = update(values.timeSlots[timeSlotIndex], {from: {$set: time[0]}, to: {$set: time[1]}});
        const newTimeSlots = update(values.timeSlots, {$splice: [[timeSlotIndex, 1, updatedTimeSlot]]});
        setValues({...values, timeSlots: newTimeSlots});
    }
    const handleMonthChange = (value) => {
        setValues({...values, months: value});
    }
    const handleTicketCount = (value) => {
        setValues({...values, reservationCount: value})
    }
    const handleTicketCountPerPerson = (value) => {
        setValues({...values, maxTicketCountPerPerson: value})
    }
    const getLocationList = () => {
        getProductsByCount(100)
            .then((res) => { setLocationList(res.data); setLoading(false);})
            .catch((err) => {console.log(err); setLoading(false);});
    }
    const handleLocationChange = (value) => {
        setValues({...values, location: value});
    }
    const handleTitleChange = (value) => {
        setValues({...values, title: value});
    }
    useEffect(() => {
        getLocationList();
    },[])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Calendar Create</h4>
                    <CalendarCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleDateChange={handleDateChange}
                        handleMonthChange={handleMonthChange}
                        weekDays={weekDays}
                        handleCheckboxGroupChange={handleCheckboxGroupChange}
                        handleTimeChange={handleTimeChange}
                        addTimeSlot={addTimeSlot}
                        handleTicketCount={handleTicketCount}
                        handleTicketCountPerPerson={handleTicketCountPerPerson}
                        handleLocationChange={handleLocationChange}
                        handleTitleChange={handleTitleChange}
                        locationList={locationList}
                        loading={loading}
                    /> 
                </div>
            </div>
        </div>
    )
}

const CalendarCreateForm = ({
        handleSubmit, 
        handleChange, 
        setValues, 
        values, 
        handleDateChange,
        weekDays,
        checkedList,
        handleCheckboxGroupChange,
        handleTimeChange,
        handleMonthChange,
        addTimeSlot,
        handleTicketCount,
        handleTicketCountPerPerson,
        handleLocationChange,
        handleTitleChange,
        locationList,
        loading
    }) => {
    // Calendar's values
    const {
        title,
        location,
        months,
        startDate,
        disabledDate,
        unavailableWeekDays,
        timeSlots
    } = values;

    const CheckboxGroup = Checkbox.Group;
    const TimeRangePicker = TimePicker.RangePicker;
    // const filteredLocations = locationList.filter(x => !location.includes(x))
    return(
        <form>
            {/* TITLE */}
            <div className="form-group">
                <label>Title:</label>
                <Input 
                    placeholder="Enter calendar title"
                    onChange={handleTitleChange}
                    style={{maxWidth:'300px'}}
                />
            </div>
            {/* RELATED LOCATION */}
            <div className="form-group">
                <label>Location:</label>
                <Select 
                    showSearch
                    placeholder="Select a location"
                    onChange={handleLocationChange}
                    style={{maxWidth:'300px'}}
                    // style={{width: '100%'}}
                >
                {!loading && locationList.map((x, index) => (
                    <Select.Option key={index} value={x.title}>{x.title}</Select.Option>
                ))}    
                </Select>
            </div> 
            {/* MONTHS TO SCROLL */}
            <div className="form-group">
            <label>
                Number of months to scroll:
            </label>
            <Select defaultValue={1} onChange={handleMonthChange}>
                {[...Array(max_avail_months)].map((elem, index) => ( 
                    <Select.Option key={index} value={index+1}>{index+1} month(s)</Select.Option>
                ))}
            </Select>
            </div>
            {/* START DATE */}
            <div className="form-group">
                <label>Start Date:</label>
                <DatePicker 
                    onChange={handleDateChange} 
                    defaultValue={startDate} 
                    disabledDate={disabledDate}
                    format={dateFormat}
                    />
            </div>
            {/* AVAILABILITY */}
            <div className="form-group">
                <label>Availability:</label><br></br>
                <div className="space" />
                <span style={{fontSize:'16px'}}>Unavailable week days</span>
                <CheckboxGroup options={weekDays} value={unavailableWeekDays} onChange={handleCheckboxGroupChange} style={{fontSize:'16px'}} />
            </div>
            {/* TIME SLOTS */}
            <div className="form-group">
                <label>Time slots:</label>
                <div className="space" />
                {timeSlots.map((x, index) => 
                    <div key={index}>
                        <TimeRangePicker 
                            format='h:mm a'
                            use12Hours 
                            onChange={(time, timeString) => handleTimeChange(time, timeString, x.id)}
                            />
                        <div className="space" />
                    </div>
                )}
               
                <Button onClick={addTimeSlot}><Icons.PlusOutlined /> Add</Button>
            </div>
            {/* TICKETS */}
            <div className="form-group">
                <label>Number of allowed reservations per day:</label>
                <InputNumber min={1} max={100} defaultValue={30} onChange={(value) => handleTicketCount(value)}/>
            </div>
            <div className="form-group">
                <label>Number of allowed reservations per person:</label>
                <InputNumber min={1} max={20} defaultValue={1} onChange={(value) => handleTicketCountPerPerson(value)}/>
            </div>
            {/* ALLOW BOOKING UNTIL A SPECIFIC TIME*/}
            <div className="form-group">
                <label>Allow bookings until:</label>
                <TimePicker defaultValue={moment('00:30','h:mm a')} showNow={false} minuteStep={15} format='H:mm'/> 
                <span style={{fontSize:'16px',marginLeft: '1rem'}}> hour(s) before a reservation starts</span>
            </div>
            <button className="btn btn-outline-info">
            Save
            </button>
        </form>
    )
}
export default CalendarCreate;