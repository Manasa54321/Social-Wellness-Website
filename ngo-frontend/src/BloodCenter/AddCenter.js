import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './addcenter.css';

export default function AddCenter() {
  const navigate = useNavigate();

  const [bloodCenter, setBloodCenter] = useState({
    u_name: "",
    location: "",
    timing: "00:00 AM",
    status: "",
  });

  const { u_name, location, timing, status } = bloodCenter;

  const onInputChange = (e) => {
    const { name, value } = e.target;

    let validValue = value;
    if (name === 'u_name' || name === 'status') {
      const regex = /^[a-zA-Z\s]*$/; // Only letters and spaces are allowed
      if (!regex.test(value)) {
        alert("Only alphabetic characters and spaces are allowed for hospital name and status.");
        return;
      }
    }

    if (name === 'hour' || name === 'minute' || name === 'period') {
      const [hour, minute, period] = timing.split(/[:\s]/);
      const newTime = {
        hour: name === 'hour' ? value : hour,
        minute: name === 'minute' ? value : minute,
        period: name === 'period' ? value : period,
      };
      setBloodCenter({
        ...bloodCenter,
        timing: `${newTime.hour}:${newTime.minute} ${newTime.period}`,
      });
    } else {
      setBloodCenter({ ...bloodCenter, [name]: validValue });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/bloodCenter", bloodCenter, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/bloodcenter");
    } catch (error) {
      console.error("Error adding blood center:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div className="add-center-container pt-5 mt-5">
      <div className="content-wrapper">
        <div className="row">
          <div className="add-center-form col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Register Blood Center</h2>

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="u_name" className="form-label">
                  Hospital Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter hospital name"
                  name="u_name"
                  value={u_name}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter hospital location"
                  name="location"
                  value={location}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="timing" className="form-label">
                  Timing (Hours : Minutes : AM/PM)
                </label>
                <div className='d-flex'>
                  <select
                    className='form-select me-2'
                    name='hour'
                    value={timing.split(':')[0]}
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
                    value={timing.split(':')[1].split(' ')[0]}
                    onChange={onInputChange}
                  >
                    {[...Array(60).keys()].map(minute => (
                      <option key={minute} value={minute < 10 ? `0${minute}` : minute}>
                        {minute < 10 ? `0${minute}` : minute}
                      </option>
                    ))}
                  </select>
                  <select
                    className='form-select'
                    name='period'
                    value={timing.split(' ')[1]}
                    onChange={onInputChange}
                  >
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter status of hospital"
                  name="status"
                  value={status}
                  onChange={onInputChange}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary me-2">
                Submit
              </button>
              <Link to="/bloodcenter" className="btn btn-outline-danger">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
