import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Link, useNavigate ,useParams} from "react-router-dom";

export default function Login() {
    let navigate=useNavigate();
    const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:9090/users");
    console.log(result);
    setUsers(result.data);
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
        const existingUsernames = users.map((u) => u.username);
        const isUsernameExists = existingUsernames.includes(user.username);
        if (!isUsernameExists) {
        alert("Username doesnot exist please register");

        return;
        }
        navigate("/home");

    }
      
  return (
    <div className="container">
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
              onChange={(e) => handleChange(e)}
            />
          </div>

          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your firstname"
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