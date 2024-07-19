import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import './volunteers.css';

export const AddVolunteer = () => {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const { id } = useParams();

  const [volunteers, setVolunteers] = useState([]);
  const [volunteer, setVolunteer] = useState({
    skills: [],
    prefTasks: [],
    prefDays: [],
    user: { id: authState.userId }
  });

  const { skills, prefTasks, prefDays } = volunteer;

  useEffect(() => {
    if (authState.userId === 0) {
      alert("Please login first!");
      navigate("/login"); // Redirect to login page
    } else {
      loadVolunteers();
    }
  }, []); 
  

  const loadVolunteers = async () => {
    const result = await axios.get("http://localhost:8080/volunteers");
    setVolunteers(result.data);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setVolunteer({
          ...volunteer,
          [name]: [...volunteer[name], value],
        });
      } else {
        setVolunteer({
          ...volunteer,
          [name]: volunteer[name].filter((item) => item !== value),
        });
      }
    } else {
      setVolunteer({ ...volunteer, [name]: value });
    }
  };

  const onSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setVolunteer({ ...volunteer, [name]: selectedOptions });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("authState.userId: ", authState.userId)
    console.log("Volunteer : ", volunteer)
    await axios.post("http://localhost:8080/volunteer", volunteer);
    navigate("/");
  };

  return (
    <div className="volunteerpage">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" id="volunteerdiv">
          <h2 className="text-center m-4">Volunteer Registration</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="skills">Skills</label>
              <select
                className="form-select"
                multiple
                name="skills"
                value={skills}
                onChange={onSelectChange}
              >
                 <option value="first_aid">First Aid</option>
                <option value="event_management">Event Management</option>
                <option value="counseling">Counseling</option>
                <option value="public_speaking">Public Speaking</option>
                <option value="fundraising">Fundraising</option>
                <option value="fundraising">Health Education</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="prefTasks">Preferred Tasks</label>
              <select
                className="form-select"
                multiple
                name="prefTasks"
                value={prefTasks}
                onChange={onSelectChange}
              >
                <option value="first_aid_training">First Aid Training</option>
                <option value="health_screenings">Conducting Health Screenings</option>
                <option value="vaccination_campaigns">Assisting in Vaccination Campaigns</option>
                <option value="health_education">Health Education Sessions</option>
                <option value="nutrition_education">Nutrition Education</option>
                <option value="exercise_programs">Leading Exercise Programs</option>
                <option value="mental_health_support">Providing Mental Health Support</option>
                <option value="counseling">Counseling</option>
                <option value="public_health_awareness">Public Health Awareness Campaigns</option>
                <option value="support_groups">Facilitating Support Groups</option>
                <option value="community_outreach">Community Outreach</option>
                <option value="fundraising_for_health">Fundraising for Health Initiatives</option>
                <option value="blood_donation_drives">Organizing Blood Donation Drives</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="days">Preferred Working Days</label>
              <br></br>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="sunday"
                  name="prefDays"
                  value="sunday"
                  checked={prefDays.includes("sunday")}
                  onChange={onInputChange}
                />
                <label className="form-check-label" htmlFor="sunday">
                  Sun
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="monday"
                  name="prefDays"
                  value="monday"
                  checked={prefDays.includes("monday")}
                  onChange={onInputChange}
                />
                <label className="form-check-label" htmlFor="monday">
                  Mon
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="tuesday"
                  name="prefDays"
                  value="tuesday"
                  checked={prefDays.includes("tuesday")}
                  onChange={onInputChange}
                />
                <label className="form-check-label" htmlFor="tuesday">
                  Tues
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="wednesday"
                  name="prefDays"
                  value="wednesday"
                  checked={prefDays.includes("wednesday")}
                  onChange={onInputChange}
                />
                <label className="form-check-label" htmlFor="wednesday">
                  Wed
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="thursday"
                  name="prefDays"
                  value="thursday"
                  checked={prefDays.includes("thursday")}
                  onChange={onInputChange}
                />
                <label className="form-check-label" htmlFor="thursday">
                  Thu
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="friday"
                  name="prefDays"
                  value="friday"
                  checked={prefDays.includes("friday")}
                  onChange={onInputChange}
                />
                <label className="form-check-label" htmlFor="friday">
                  Fri
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="saturday"
                  name="prefDays"
                  value="saturday"
                  checked={prefDays.includes("saturday")}
                  onChange={onInputChange}
                />
                <label className="form-check-label" htmlFor="saturday">
                  Sat
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
      </div>
      </div>
    </div>
  );
};
