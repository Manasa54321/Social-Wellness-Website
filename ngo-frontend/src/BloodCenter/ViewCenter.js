import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import './addcenter.css';
export default function ViewUser() {
  const [bloodCenter, setUser] = useState({
    u_name: "",
    location: "",
    timing: "",
    status: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/bloodCenter/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container pt-5 mt-5">
      <div className="row">
        <div className=" add-center-form col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">bloodCenter Details</h2>

          <div className="card">
            <div className="card-header">
              Details of bloodCenter id : {bloodCenter.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>HName:</b>
                  {bloodCenter.u_name}
                </li>
                <li className="list-group-item">
                  <b>Location:</b>
                  {bloodCenter.location}
                </li>
                <li className="list-group-item">
                  <b>Timing:</b>
                  {bloodCenter.timing}
                </li>
                <li className="list-group-item">
                  <b>Status:</b>
                  {bloodCenter.status}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/bloodcenter"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}