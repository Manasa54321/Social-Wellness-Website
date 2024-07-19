import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../pages/VaccineCamp.css';

export default function EditVaccine() {
  let navigate = useNavigate();
  const currdate = new Date().toISOString().split('T')[0];
  const { id } = useParams();

  const [user, setUser] = useState({
    vaccine: "",
    vdate: currdate,
    vtime: "0:00 AM",
    vlocation: "",
  });

  const { vaccine, vdate, vtime, vlocation } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'hour' || name === 'minute' || name === 'period') {
      const [hour, minute, period] = vtime.split(/[:\s]/);
      const newTime = {
        hour: name === 'hour' ? value : hour,
        minute: name === 'minute' ? value : minute,
        period: name === 'period' ? value : period
      };
      setUser({
        ...user,
        vtime: `${newTime.hour}:${newTime.minute} ${newTime.period}`
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/vaccineCamp/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/vaccineCamp/${id}`);
    setUser(result.data);
  };

  return (
    <div className="editvaccine-page">
      <div className='vaccine-container container mt-5 pt-5'>
        <div className='row'>
          <div className="editvaccine-form col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <div className='vaccine-heading text-center fs-2 my-20 fw-semibold p-4 rounded'>Edit Vaccine Camp</div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='mb-3'>
                <label htmlFor='vaccine' className='form-label fs-5'>Vaccine</label>
                <input type={"text"} className='form-control'
                  placeholder='Enter Vaccine name' name='vaccine' value={vaccine}
                  onChange={(e) => onInputChange(e)} />
              </div>
              <div className='mb-3'>
                <label htmlFor='vdate' className='form-label fs-5'>Date</label>
                <input type={"date"} className='form-control'
                  placeholder='Select Date' name='vdate' value={vdate} min={currdate}
                  onChange={(e) => onInputChange(e)} />
              </div>
              <div className='mb-3'>
                <label htmlFor='vtime' className='form-label fs-5'>Time (Hours : Minutes : AM/PM)</label>
                <div className='d-flex'>
                  <select
                    className='form-select me-2'
                    name='hour'
                    value={vtime ? vtime.split(':')[0] : "0"}
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
                    value={vtime ? vtime.split(':')[1].split(' ')[0] : "00"}
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
                    value={vtime ? vtime.split(' ')[1] : "AM"}
                    onChange={onInputChange}
                  >
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>
                  </select>
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor='vlocation' className='form-label fs-5'>Location</label>
                <input type={'text'} className='form-control'
                  placeholder='Enter venue' name='vlocation' value={vlocation}
                  onChange={(e) => onInputChange(e)} />
              </div>
              <button type="submit" className='btn btn-outline-primary'>Submit</button>
              <Link className="btn btn-outline-danger mx-2" to="/">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
