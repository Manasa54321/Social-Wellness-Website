import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './addcenter.css'

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [bloodCenter, setUser] = useState({
    u_name: "",
    location: "",
    timing: "00:00 AM",
    status: "",
  });

  const { u_name, location, timing ,status } = bloodCenter;

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'hour' || name === 'minute' || name === 'period') {
      const [hour, minute, period] = timing.split(/[:\s]/);
      const newTime = {
        hour: name === 'hour' ? value : hour,
        minute: name === 'minute' ? value : minute,
        period: name === 'period' ? value : period,
      };
      setUser({
        ...bloodCenter,
        timing: `${newTime.hour}:${newTime.minute} ${newTime.period}`,
      });
    } else {
      setUser({ ...bloodCenter, [name]: value });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/bloodCenter/${id}`, bloodCenter, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating blood center:", error);
    }
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/bloodCenter/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container pt-5 mt-5">
      <div className="row">
        <div className="add-center-form col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="u_name" className="form-label">
                Hospital Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Hospital name"
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
                placeholder="Enter the hospital status"
                name="status"
                value={status}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/bloodcenter">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
