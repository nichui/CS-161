import React, { useState, useEffect } from 'react';
import moment from 'moment';
import update from 'immutability-helper';
import Icons from '../../../components/icons/Icons';
import AdminNav from '../../../components/navigation/AdminNav';
import { Form, Input, Space, DatePicker, TimePicker, Checkbox, Button, InputNumber, Select} from 'antd';
import {createCalendar} from "../../../functions/calendar";
import {toast} from 'react-toastify'
import {useSelector} from "react-redux";

const TimeRangePicker = TimePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;
const max_avail_months = 12;
const dateFormat = 'MM/DD/YYYY';
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// disable today and days before today
const disabledDate = (current) => {
    return current && current < moment().endOf('day');
}
// Calendar's initial values
const initialState = {
    monthsToScroll: 1,
    startDate: '',
    unavailableWeekDays: [],
    timeSlots:[],
    bookedDates: []
};

function CalendarCreate(){
    const {user} = useSelector((state) => ({...state}));
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Calendar Create</h4>
                    <CalendarCreateForm
                        weekDays={weekDays}
                        user={user}
                        // handleSubmit={handleSubmit}
                        // handleChange={handleChange}
                        // setValues={setValues}
                        // values={values}
                        // handleDateChange={handleDateChange}
                        // handleMonthChange={handleMonthChange}
                        // handleCheckboxGroupChange={handleCheckboxGroupChange}
                        // handleTimeChange={handleTimeChange}
                        // addTimeSlot={addTimeSlot}
                        // handleTicketCount={handleTicketCount}
                        // handleTicketCountPerPerson={handleTicketCountPerPerson}
                        // handleLocationChange={handleLocationChange}
                        // handleTitleChange={handleTitleChange}
                    /> 
                </div>
            </div>
        </div>
    )
}

const CalendarCreateForm = ({weekDays, user}) => {
    const onFinish = (fieldValues) => {

        const values = {
            ...fieldValues,
            'startDate': fieldValues['startDate'].format('YYYY-MM-DD'),
            'timeSlots': fieldValues['timeSlots'].map(x => {
                if (x.timeRange.length === 2){
                    var timeSlot = {
                        ...x,
                        "timeRange": [
                            x.timeRange[0].format('HH:mm'),
                            x.timeRange[1].format('HH:mm')
                        ]
                    }
                    return timeSlot;
                }
            }),
            'bookedDates': [],
        }

        console.log("received values of calendar form: ", values);
        createCalendar(values, user.token).then(
            (res) => {
                toast.success(`Calendar is successfully created.`);
                window.location.reload();
            }
        ).catch((err) => {
            toast.error("Server error. Please check with administration.");
            console.log(err);
        })
    }
    
    return(
        <Form name="dymanic_form_nest_item"  layout="hotizontal" onFinish={onFinish}>
            {/* NAME */}
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Missing calendar name' }]}>
                <Input></Input>
            </Form.Item>
            {/* MONTHS TO SCROLL */}
            <Form.Item name="monthsToScroll" label="Number of months to scroll" rules={[{ required: true, message: 'Missing number of months to scroll' }]} >
            <Select 
                placeholder="Select number of months"
                >
                {[...Array(max_avail_months)].map((elem, index) => ( 
                    <Select.Option key={index} value={index+1}>{index+1} month(s)</Select.Option>
                ))}
            </Select>
            </Form.Item>
            {/* START DATE */}
            <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: 'Missing start date' }]}>
                <DatePicker 
                    disabledDate={disabledDate}
                    format={dateFormat}
                    />
            </Form.Item>
            {/* AVAILABILITY */}
            <Form.Item name="unavailableWeekDays" label="Unavailable week days">
                <CheckboxGroup 
                    options={weekDays} 
                    style={{fontSize:'16px'}} />
            </Form.Item>
            {/* TIME SLOTS */}
            <TimeSlotCreate />
                    
            <button className="btn btn-outline-info">
            Save
            </button>
        </Form>
    )
}
function TimeSlotCreate(){
    return (
          <Form.List 
            name="timeSlots" 
            label="Time Slots" 
            rules={[
                {
                  validator: async (_, timeSlots) => {
                    if (!timeSlots || timeSlots.length < 1) {
                      return Promise.reject(new Error('At least 1 time slot has to be created'));
                    }
                  },
                },
              ]}
            >

            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        name={[name, 'timeRange']}
                        fieldKey={[fieldKey, 'timeRange']}
                        rules={[{ required: true, message: 'Missing time slot' }]}
                      >
                           <TimeRangePicker 
                            format='h:mm a'
                            use12Hours 
                            />
                      </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Number of tickets"
                      name={[name, 'maxTicketCount']}
                      fieldKey={[fieldKey, 'maxTicketCount']}
                      rules={[{ required: true, message: 'Missing number of tickets' }]}
                    >
                      <InputNumber min={1} max={100} placeholder="0" style={{width: 160}}/>
                    </Form.Item>
                    
                    <Icons.MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<Icons.PlusOutlined />}>
                    Add Time Slot
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
           
          </Form.List>

      );
}
export default CalendarCreate;