import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewCamp() {
    const currdate = new Date();
    const [camp,setCamp] = useState({
        date: currdate,
        time : "",
        day:"",
        venue:""
    });


  const { id } = useParams();

  useEffect(() => {
    loadCamp();
  }, []);

  const loadCamp = async () => {
    const result = await axios.get(`http://localhost:8080/bloodDonation/${id}`);
    setCamp(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Camp Details</h2>

          <div className="card">
            <div className="card-header">
              Details of camp id : {camp.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Date : </b>
                  {camp.date}
                </li>
                <li className="list-group-item">
                  <b>Time</b>
                  {camp.time}
                </li>
                <li className="list-group-item">
                  <b>Day</b>
                  {camp.day}
                </li>
                <li className="list-group-item">
                  <b>Venue</b>
                  {camp.venue}
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