import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();
  
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    console.log(result);
    setUsers(result.data);
  };

  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName:"",
    email: "",
    ph_no:"",
    address:"",
    role:"User",
    password: "",
  });

  const { username, firstName, lastName, email, ph_no, address, role, password } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;

    let validValue = value;
    if (name === "firstName" || name === "lastName") {
      const regex = /^[a-zA-Z\s]*$/; // Only letters and spaces are allowed
      if (!regex.test(value)) {
        return;
      }
    }

    if (name === "email") {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; // Email format with only lowercase
      if (!emailRegex.test(value)) {
        return;
      }
    }

    if (name === "ph_no") {
      const phoneRegex = /^\d{0,10}$/; // Only digits and up to 10 characters
      if (!phoneRegex.test(value)) {
        return;
      }
    }

    setUser({ ...user, [name]: validValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const existingUsernames = users.map((u) => u.username);
    const isUsernameExists = existingUsernames.includes(user.username);
    if (isUsernameExists) {
      alert("Username already exists. Please choose a different username.");
      return;
    }
    await axios.post("http://localhost:8080/add", user);
    navigate("/");
  };

  return (
    <div className="container mt-8">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                UserName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your firstname"
                name="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your last name"
                name="lastName"
                value={lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phno" className="form-label">
                Phone Number
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your phone number"
                name="ph_no"
                value={ph_no}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your Address"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter your Password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
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
}
