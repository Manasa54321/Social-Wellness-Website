import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddEvent() {
  let navigate = useNavigate();
  const currdate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const initialTime = "0:00 AM";

  const [event, setEvent] = useState({
    ename: "",
    date: currdate,
    time: initialTime,
    venue: "",
    task: ""
  });

  const { ename, date, time, venue, task } = event;

  const onInputChange = (e) => {
    const { name, value } = e.target;

    let validValue = value;
    if (name === 'ename' || name === 'task') {
      const regex = /^[a-zA-Z\s]*$/; // Only letters and spaces are allowed
      if (!regex.test(value)) {
        alert("Only alphabetic characters and spaces are allowed for event name and task.");
        return;
      }
    }

    if (name === 'date') {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      if (value < today) {
        alert("Date cannot be in the past");
        return;
      }
    }

    setEvent({ ...event, [name]: validValue });
  };

  const onTimeChange = (e) => {
    const { name, value } = e.target;
    const [hour, minute, period] = time.split(/[:\s]/);

    let newTime = {
      hour,
      minute,
      period
    };

    newTime[name] = value;

    setEvent({ ...event, time: `${newTime.hour}:${newTime.minute} ${newTime.period}` });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/addevent", event);
    navigate("/");
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{ backgroundColor: 'lightblue' }}>
          <div className='text-center fs-2 my-3 fw-semibold text-primary-emphasis p-3 rounded'>Add Events</div>
          <form onSubmit={onSubmit}>
            <div className='mb-3'>
              <label htmlFor='ename' className='form-label fs-5'>Event Name</label>
              <input 
                type='text' 
                className='form-control' 
                placeholder='Enter Event Name' 
                name='ename' 
                value={ename}
                onChange={onInputChange} 
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='date' className='form-label fs-5'>Date</label>
              <input 
                type='date' 
                className='form-control' 
                name='date' 
                value={date}
                onChange={onInputChange} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label fs-5">
                Time (Hours : Minutes : AM/PM)
              </label>
              <div className="d-flex">
                <select
                  className="form-select me-2"
                  name="hour"
                  value={time.split(':')[0]}
                  onChange={onTimeChange}
                >
                  {[...Array(13).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <span className="align-self-center me-1">:</span>
                <select
                  className="form-select me-2"
                  name="minute"
                  value={time.split(':')[1].split(' ')[0]}
                  onChange={onTimeChange}
                >
                  {[...Array(60).keys()].map((minute) => (
                    <option key={minute} value={minute < 10 ? `0${minute}` : minute}>
                      {minute < 10 ? `0${minute}` : minute}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  name="period"
                  value={time.split(' ')[1]}
                  onChange={onTimeChange}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='venue' className='form-label fs-5'>Venue</label>
              <input 
                type='text' 
                className='form-control' 
                placeholder='Enter venue' 
                name='venue' 
                value={venue}
                onChange={onInputChange} 
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='task' className='form-label fs-5'>Task</label>
              <input 
                type='text' 
                className='form-control' 
                placeholder='Enter task' 
                name='task' 
                value={task}
                onChange={onInputChange} 
              />
            </div>
            <button type="submit" className='btn btn-outline-primary'>Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
