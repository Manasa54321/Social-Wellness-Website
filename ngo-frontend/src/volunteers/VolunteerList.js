import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VolunteerList.css'; // Import CSS file for styling

function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:8080/volunteers') // Replace with your backend API endpoint
      .then(response => {
        setVolunteers(response.data);
      })
      .catch(error => {
        console.error('Error fetching volunteers:', error);
      });
  }, []);

  return (
    <div>
      <h2>List of Volunteers</h2>
      <div className="card-container">
        
        {volunteers.map((volunteer, index) => (
      <div className="col-md-12 mb-4" key={volunteer.eid}>
        <div className="card border-0 shadow" style={{ backgroundColor: 'lightblue', borderRadius: '15px' }}>
          <div className="row">
            <div className="col-md-12">
              <div className="card-header" style={{ backgroundColor: '#007bff', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                <h5 className="text-white">{volunteer.user.username}</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">
                <strong>Volunteer ID:</strong> {volunteer.id}
                <strong>User ID:</strong> {volunteer.user.id}
                <p><strong>Name:</strong> {volunteer.user.firstName} {volunteer.user.lastName}</p>
              <p><strong>Username:</strong> {volunteer.user.username}</p>
              <p><strong>Email:</strong> {volunteer.user.email}</p>
              <p><strong>Skills:</strong> {volunteer.skills.join(', ')}</p>
              <p><strong>Preferred Tasks:</strong> {volunteer.prefTasks.join(', ')}</p>
              <p><strong>Preferred Days:</strong> {volunteer.prefDays.join(', ')}</p>
                  
                </p>
                
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
    ))}
      </div>
    </div>
  );
}

export default VolunteerList;