import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function getByUserId() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName:"",
    email: "",
    ph_no:0,
    address:"",
    role:"User",
    password:"",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:9091/users/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">User Details</h2>

        <div className="card">
          <div className="card-header">
            Details of user id: {user.id}
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>First Name:</b> {user.firstName}
              </li>
              <li className="list-group-item">
                <b>Last Name:</b> {user.lastName}
              </li>
              <li className="list-group-item">
                <b>Username:</b> {user.username}
              </li>
              <li className="list-group-item">
                <b>Email:</b> {user.email}
              </li>
              <li className="list-group-item">
                <b>Phone Number:</b> {user.ph_no}
              </li>
              <li className="list-group-item">
                <b>Address:</b> {user.address}
              </li>
              <li className="list-group-item">
                <b>Role:</b> {user.role}
              </li>
            </ul>
          </div>
        </div>
        <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
