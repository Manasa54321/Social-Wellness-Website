import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import AuthContext from '../AuthContext';
import './Events.css';
export default function Event() {
  const [events, setEvents] = useState([]);
  const { authState } = useContext(AuthContext);
  const [userRole, setUserRole] = useState('');
  const [volevent, setVolEvents] = useState({
    volunteer: {},
    events: []
  });

  const { id } = useParams();
  const [volunteer1, setVolunteer] = useState({
    skills: [],
    prefTasks: [],
    prefDays: [],
    user: {}
  });

  useEffect(() => {
    fetchUserRole(authState.userId);
    loadEvents();
    loadVolunteer(authState.vId);
  }, []);

  const fetchUserRole = async (userId) => {
    const res = await axios.get(`http://localhost:8080/user/role?userId=${userId}`);
    setUserRole(res.data);
    console.log(userRole);
  };

  const loadEvents = async () => {
    const res = await axios.get("http://localhost:8080/getevents");
    setEvents(res.data);
  };

  const loadVolunteer = async (vId) => {
    if (vId > 0) {
      const res = await axios.get(`http://localhost:8080/volunteers/${vId}`);
      setVolEvents(prevState => ({
        ...prevState,
        volunteer: res.data
      }));
    }
  };

  const participate = async (eid) => {
    const res = await axios.get(`http://localhost:8080/getevent/${eid}`);
    const updatedEvent = res.data;
    console.log("updated event: ", updatedEvent);
    setVolEvents(prevState => ({
      ...prevState,
      events: [...prevState.events, updatedEvent]
    }));

    const payload = {
      volunteer: volevent.volunteer,
      event: updatedEvent
    };

    const res1 = await axios.post("http://localhost:8080/volevents", payload);
    console.log(res1.data);
  };

  useEffect(() => {
    console.log("volunteer:", volevent.volunteer);
    console.log("events:", volevent.events);
  }, [volevent]);

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
                  <button
                    className="btn btn-danger"
                    onClick={() => participate(event.eid)}
                  >
                    Participate
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <img src="https://via.placeholder.com/150" className="img-fluid" alt="Event" style={{ borderRadius: '15px', float:'right', width:'12vw', marginRight:'10px'}} />
              {/* Replace "https://via.placeholder.com/150" with the URL of your image */}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  {userRole === 'admin' &&(<Link className='btn btn-primary' to='/addevent'>Add Events</Link>)}
</div>
  );
}
