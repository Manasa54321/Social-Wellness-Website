import React, { useEffect, useState, useContext} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthContext from '../AuthContext';
import './Bloodcenter.css';
import bcimage from '../BloodCenter/bloodcenter.jpg';

export default function Bloodcenter() {
  const [bloodCenter, setBloodCenter] = useState([]);
  const [userRole, setUserRole] = useState('');
  const { authState } = useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    loadBloodCenters();
    fetchUserRole(authState.userId);
  }, []);

  const loadBloodCenters = async () => {
    const result = await axios.get("http://localhost:8080/bloodCenter");
    setBloodCenter(result.data);
  };

  const fetchUserRole = async (userId) => {
    const res = await axios.get(`http://localhost:8080/user/role?userId=${userId}`);
    setUserRole(res.data);
    console.log(userRole)
  };

  const deleteBloodCenter = async (id) => {
    await axios.delete(`http://localhost:8080/bloodCenter/${id}`);
    loadBloodCenters();
  };

  return (
    <div className="vaccine-container container-fluid p-0" style={{ backgroundImage: `url(${bcimage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="bloodcenter-page">
        <div className="center-container">
          <div className="center-content py-4">
            <h1 className="center-heading">Blood Center</h1>
            <br></br>
            <table className="center-table table border shadow">
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">Hospital Name</th>
                  <th scope="col">Location</th>
                  <th scope="col">Timing</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {bloodCenter.map((center, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{center.u_name}</td>
                    <td>{center.location}</td>
                    <td>{center.timing}</td>
                    <td>{center.status}</td>
                    <td>
                      <Link className="center-button btn btn-primary mx-2" to={`/viewcenter/${center.id}`}>
                        View
                      </Link>
                      {userRole === 'admin' && (<Link className="center-button btn btn-outline-primary mx-2" to={`/editcenter/${center.id}`}>
                        Edit
                      </Link>)}
                      {userRole === 'admin' && (<button className="center-button btn btn-danger mx-2" onClick={() => deleteBloodCenter(center.id)}>
                        Delete
                      </button>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {userRole === 'admin' &&  (<div className="d-flex justify-content-center my-3">
          <Link className="center-button btn btn-outline-light" to="/addcenter">
            Add Blood Center
          </Link>
          </div>)}
        </div>
      </div>
    </div>
  );
}
