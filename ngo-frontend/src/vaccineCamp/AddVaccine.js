import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/VaccineCamp.css';

export default function AddVaccine() {
    let navigate = useNavigate();
    const currdate = new Date().toISOString().split('T')[0]; // format date as yyyy-mm-dd
    const [camp, setCamp] = useState({
        vaccine: "",
        vdate: currdate,
        vlocation: ""
    });

    const [time, setTime] = useState({
        hour: "00",
        minute: "00",
        period: "AM"
    });

    const { vaccine, vdate, vlocation } = camp;
    const { hour, minute, period } = time;

    const onInputChange = (e) => {
        setCamp({ ...camp, [e.target.name]: e.target.value });
    };

    const onTimeChange = (e) => {
        setTime({ ...time, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const vtime = `${hour}:${minute} ${period}`;
        const dataToSubmit = { ...camp, vtime };
        await axios.post("http://localhost:8080/vaccineCamp", dataToSubmit);
        navigate("/");
    };

    return (
        <div className='addvaccine-page'>
        <div className='vaccine-container container mt-5 pt-5'>
            <div className='row'>
                <div className='addvaccine-form col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <div className='vaccine-heading text-center fs-2 my-20 fw-semibold p-4 rounded'>Add Vaccine Camp</div>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='vaccine' className='form-label fs-5'>Vaccine Name</label>
                            <input type={"text"} className='form-control' placeholder='Enter Vaccine Name'
                                name='vaccine' value={vaccine} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='vdate' className='form-label fs-5'>Date</label>
                            <input type={"date"} className='form-control' placeholder='Select date'
                                name="vdate" min={currdate} value={vdate} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="vtime" className="form-label fs-5">
                                Time  (Hours : Minutes : AM/PM)
                            </label>
                            <div className="d-flex">
                                <select
                                    className="form-select me-2"
                                    name="hour"
                                    value={hour}
                                    onChange={(e) => onTimeChange(e)}
                                >
                                    {[...Array(12).keys()].map((hour) => (
                                        <option key={hour} value={hour + 1}>
                                            {hour + 1}
                                        </option>
                                    ))}
                                </select>
                                <span className="align-self-center me-1">:</span>
                                <select
                                    className="form-select me-2"
                                    name="minute"
                                    value={minute}
                                    onChange={(e) => onTimeChange(e)}
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
                                    value={period}
                                    onChange={(e) => onTimeChange(e)}
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='vlocation' className='form-label fs-5'>Location</label>
                            <input type={'text'} className='form-control' name='vlocation' placeholder='Enter Location'
                            value={vlocation} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}
