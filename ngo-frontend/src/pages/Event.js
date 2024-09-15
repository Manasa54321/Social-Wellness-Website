import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import AuthContext from '../AuthContext';
import './Events.css';
export default function Event() {
  const [events, setEvents] = useState([]);
  const { authState } = useContext(AuthContext);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchUserRole(authState.userId);
    loadEvents();
  }, []);

  const fetchUserRole = async (userId) => {
    if (userId === 0) {
      setUserRole("user");
    }
    else {
      const res = await axios.get(`http://localhost:8080/user/role?user_id=${userId}`);
      setUserRole(res.data);
    }
    console.log(userRole);
  };

  const loadEvents = async () => {
    const res = await axios.get("http://localhost:8080/getevents");
    setEvents(res.data);
  };


  const participate = async (eid) => {
    const res = await axios.get(`http://localhost:8080/getevent/${eid}`);
    console.log("updated event: ", res.data);

    const payload = {
      v_id: authState.vId,
      e_id: res.data.eid
    };

    const res1 = await axios.post("http://localhost:8080/volevents", payload);
    console.log(res1.data);
  };

  return (
    <div className="Events" >
      <h2 className='my-3'>Events</h2>
      <div className="row">
        {events.map((event, index) => (
          <div className="col-md-12 mb-4" key={event.eid}>
            <div className="card border-0 shadow" style={{ backgroundColor: 'lightblue', borderRadius: '15px' }}>
              <div className="row">
                <div className="col-md-12">
                  <div className="card-header" style={{ backgroundColor: '#007bff', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                    <h5 className="text-white">{event.ename}</h5>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Date:</strong> {event.date}&nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>Time:</strong> {event.time}&nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>Venue:</strong> {event.venue}&nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>Task:</strong> {event.task}
                    </p>
                    <p className="card-text">Add description here</p>
                    <div className="d-flex  align-items-center">
                      {userRole === 'admin' && (<Link
                        className="btn btn-outline-primary"
                        to={`/editEvent/${event.eid}`}
                      >
                        Edit
                      </Link>)}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {authState.userId !== 0 ? (
                        authState.vId !== 0 ? (
                          // If user is logged in and already a volunteer, show "Participate" button
                          <button
                            className="btn btn-danger"
                            onClick={() => participate(event.eid)}
                          >
                            Participate
                          </button>
                        ) : (
                          // If user is logged in but not a volunteer, show link to register as a volunteer
                          <Link to="/addvol" className="btn btn-primary">
                            Register as Volunteer
                          </Link>
                        )
                      ) : (
                        // If user is not logged in, show link to login or register
                        <Link to="/login" className="btn btn-secondary">
                          Login or Register
                        </Link>
                      )}

                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <img src="https://via.placeholder.com/150" className="img-fluid" alt="Event" style={{ borderRadius: '15px', float: 'right', width: '12vw', marginRight: '10px' }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {userRole === 'admin' && (<Link className='btn btn-primary' to='/addevent'>Add Events</Link>)}
    </div>
  );
}
