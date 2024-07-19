import axios from "axios";
import React, { useState ,useEffect, useContext} from "react";
import { Link, useNavigate ,useParams} from "react-router-dom";
import AuthContext from "./AuthContext";
import socialHelpImage from './images/volunteer.avif';

export default function Login() {
    let navigate=useNavigate();
    const { setAuthState } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [vols, setVols] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
    loadVols();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    // console.log("here users: ", result.data);
    setUsers(result.data);
    console.log("here users 2: ", users);
  };

  const loadVols = async () => {
    const result = await axios.get("http://localhost:8080/volunteers");
    // console.log("here users: ", result.data);
    setVols(result.data);
    console.log("here vols 2: ", vols);
  };

  const [user, setUser]=useState({
      username: "",
      password:"",
  });

    const{username, password}=user;

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    
    const onSubmit = async (e) => {
      e.preventDefault();
      await loadUsers();
      await loadVols();
  
      const existingUser = users.find((u) => u.username === user.username);
      if (!existingUser) {
          alert("Username does not exist. Please register.");
          return;
      } else {
          if (existingUser.password !== user.password) {
              alert("Incorrect password. Please try again.");
              return;
          }
  
          const existingVol = vols.find((v) => v.user.id === existingUser.id);
          if (!existingVol) {
              setAuthState({ userId: existingUser.id, vId: 0 });
          } else {
              setAuthState({ userId: existingUser.id, vId: existingVol.id });
          }
  
          console.log("login submit ", existingUser.id, existingVol ? existingVol.id : null);
          navigate("/home");
      }
  }
    
      
  return (
    <div className="container-fluid vh-80 d-flex justify-content-center align-items-center login-page" style={{ backgroundImage: `url(${socialHelpImage})`, backgroundSize: 'cover' }}>
    <div className="row">
      <div className="col-md offset-md border rounded p-4 mt-2 shadow login-form">
        <h2 className="text-center m-4">Login</h2>

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
              onChange={(e) => handleChange(e)}
            />
          </div>

          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={"password"}
              className="form-control"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          
          
          
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/adduser">
            Register
          </Link>

        </form>
      </div>

      
    </div>
   </div>
  );
}

// const styles = StyleSheet.create({})