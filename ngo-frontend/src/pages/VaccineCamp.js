import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import AuthContext from '../AuthContext';
import './VaccineCamp.css';
import vaccine1 from '../images/vaccine.png';


export default function VaccineCamp() {
  const [camps, setCamps] = useState([]);
  const [userRole, setUserRole] = useState('');
  const { authState } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    loadCamps();
    fetchUserRole(authState.userId);
  }, []);

  const loadCamps = async () => {
    try {
      const res = await axios.get("http://localhost:8080/vaccineCamp");
      setCamps(res.data);
    } catch (error) {
      console.error("Error loading camps:", error);
    }
  };

  const fetchUserRole = async (userId) => {
    const res = await axios.get(`http://localhost:8080/user/role?userId=${userId}`);
    setUserRole(res.data);
    console.log(userRole)
  };

  const deleteCamp = async (id) => {
    await axios.delete(`http://localhost:8080/vaccineCamp/${id}`);
    loadCamps();
  }
  return (
    <div className="vaccine-container container-fluid p-0" style={{ backgroundImage: `url(${vaccine1})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="overlay"></div>
      <div className="text-center">
        {/* <img src="logo.png" alt="Logo" className="logo" /> Add your logo image */}
        <h2 className="vaccine-heading my-1 mt-5 pt-5">Vaccination Centers</h2>
      </div>
      <div className="vaccine-table py-4">
        <table className="table table-hover table-striped border shadow">
          <thead className="vaccine-table-head">
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Vaccine Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Venue</th>
              {userRole === 'admin' && (<th scope="col">Actions</th>)}
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp.id}>
                <th scope="row">{index + 1}</th>
                <td>{camp.vaccine}</td>
                <td>{camp.vdate}</td>
                <td>{camp.vtime}</td>
                <td>{camp.vlocation}</td>
                {userRole === 'admin' ? (
                  <td>
                    <Link className="vaccine-button2 btn mx-2" to={`/editVaccine/${camp.id}`}>
                      Edit
                    </Link>
                    <button className="vaccine-button2 btn mx-2" onClick={() => deleteCamp(camp.id)}>
                      Delete
                    </button>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {userRole === 'admin' && (
      <div className="d-flex justify-content-center my-3">
        <Link className="vaccine-button btn btn-primary" to="/addvaccine">
          Add Vaccination Camp
        </Link>
      </div>
      )}
    </div>
  );
}
