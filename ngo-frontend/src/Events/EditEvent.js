import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
  let navigate = useNavigate();
  const currdate = new Date().toISOString().split('T')[0];
  const { id } = useParams();

  const [event, setEvent] = useState({
    ename: "",
    date: currdate,
    time: "0:00 AM",
    venue: "",
    task: ""
  });

  const { ename, date, time, venue, task } = event;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  useEffect(() => {
    loadEvent();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/updateevent/${id}`, event);
    navigate("/");
  };

  const loadEvent = async () => {
    const result = await axios.get(`http://localhost:8080/getevent/${id}`);
    setEvent(result.data);
  };

  // Function to format time into hours, minutes, and period (AM/PM)
  const formatTime = (timeString) => {
    const [hour, minute, period] = timeString.split(/[:\s]/);
    return {
      hour: parseInt(hour, 10),
      minute: parseInt(minute, 10),
      period
    };
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <div className='text-center fs-2 my-20 fw-semibold p-4 rounded'>Edit Events</div>
          <form onSubmit={(e) => onSubmit(e)}>
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
                placeholder='Select Date'
                name='date'
                value={date}
                min={currdate}
                onChange={onInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='time' className='form-label fs-5'>Time (Hours : Minutes : AM/PM)</label>
              <div className='d-flex'>
                <select
                  className='form-select me-2'
                  name='hour'
                  value={formatTime(time).hour}
                  onChange={onInputChange}
                >
                  {[...Array(13).keys()].map(hour => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <span className='align-self-center me-1'>:</span>
                <select
                  className='form-select me-2'
                  name='minute'
                  value={formatTime(time).minute}
                  onChange={onInputChange}
                >
                  {[...Array(60).keys()].map(minute => (
                    <option key={minute} value={minute}>
                      {minute < 10 ? `0${minute}` : minute}
                    </option>
                  ))}
                </select>
                <select
                  className='form-select'
                  name='period'
                  value={formatTime(time).period}
                  onChange={onInputChange}
                >
                  <option value='AM'>AM</option>
                  <option value='PM'>PM</option>
                </select>
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='venue' className='form-label fs-5'>Venue</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Venue'
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
                placeholder='Enter Task'
                name='task'
                value={task}
                onChange={onInputChange}
              />
            </div>
            <div className='d-flex justify-content-center my-3'>
              <button type='submit' className='btn btn-primary mx-2'>Submit</button>
              <Link className='btn btn-danger' to='/'>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
