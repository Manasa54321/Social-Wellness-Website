import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import AuthContext from '../AuthContext';
import bloodDonation from '../images/bloodDonation4.jpg';
export default function BloodCamp() {
  const[camps,setCamps] = useState([]);
  const [userRole, setUserRole] = useState('');
  const { id } = useParams();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    loadCamps();
    fetchUserRole(authState.userId);
  },[]);

  const loadCamps = async () =>{
    const res = await axios.get("http://localhost:8080/bloodDonation");
    setCamps(res.data);
  };

  const fetchUserRole = async (userId) => {
    const res = await axios.get(`http://localhost:8080/user/role?userId=${userId}`);
    setUserRole(res.data);
    console.log(userRole)
  };


  const deleteCamp = async(id) => {
    await axios.delete(`http://localhost:8080/bloodDonation/${id}`);
    loadCamps();
  }
    return (
      <div className="donation-container container-fluid p-0" style={{ backgroundImage: `url(${bloodDonation})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>

<div className="overlay"></div>
      <div className="text-center">
        <h2 className="donation-heading my-1 mt-5 pt-5">Blood Donation Centers</h2>
      </div>
      <div className="donation-table py-4">
      <table className="table table-hover table-striped border shadow">
      <thead className="donation-table-head">
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Day</th>
                <th scope="col">Venue</th>
                {userRole === 'admin' && (<th scope="col">Actions</th>)}
/
              </tr>
            </thead>
            <tbody>
               {camps.map((camp, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index+1}
                  </th>
                  <td>{camp.date}</td>
                  <td>{camp.time}</td>
                  <td>{camp.day}</td>
                  <td>{camp.venue}</td>
                  {userRole === 'admin' ? (<td>
                    <>
                      <Link className="donation-button2 btn mx-2" to={`/editCamp/${camp.id}`}>
                        Edit
                      </Link>
                      <button className="donation-button2 btn mx-2" onClick={() => deleteCamp(camp.id)}>
                        Delete
                      </button>
                    </>
                  </td>):( <></>)}
                </tr>
               ))}
            </tbody>
          </table>
        </div>
        {userRole === 'admin' && (
       <div className="d-flex justify-content-center my-3">
       <Link className="donation-button btn btn-primary" to="/addcamp">
         Add Blood Donation Camp
       </Link>
     </div>
      )}
    </div>
        
    )
}
