import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);

  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authState.userId !== 0) {
      fetchUserRole(authState.userId);
    } else {
      setIsLoading(false);
    }
  }, [authState.userId]);

  const fetchUserRole = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8080/user/role?userId=${userId}`);
      setUserRole(res.data);
      setIsLoading(false); // Set loading to false after successful fetch
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  // Render loading indicator while fetching user role
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SOCIAL WELLNESS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            {authState.userId === 0 && (
              <li className="nav-item">
                <Link className="nav-link" to="/adduser">Register</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/addvol">Volunteer</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/event">Events</Link>
            </li>
            {userRole === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/volunteerlist">Volunteer List</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/bloodcamp">Blood Donation Camps</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vaccinecamp">Vaccination Centres</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bloodcenter">Blood Centers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-donation">Donate</Link>
            </li>
            
            {authState.userId === 0 ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn" onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
