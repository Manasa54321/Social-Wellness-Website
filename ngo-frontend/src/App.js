import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddVolunteer } from './volunteers/AddVolunteer';
import AddUser from './users/AddUser';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import { AuthProvider } from './pages/AuthContext';
import { Home } from './pages/Home';
import AddCamp from './bloodDonation/AddCamp';
import EditCamp from './bloodDonation/EditCamp';
import ViewCamp from './bloodDonation/ViewCamp';
import BloodCamp from './pages/BloodCamp';
import VaccineCamp from './pages/VaccineCamp';
import AddVaccine from './vaccineCamp/AddVaccine';
import EditVaccine from './vaccineCamp/EditVaccine';
import AddDonation from './Donation/AddDonation';
import VolunteerList from './volunteers/VolunteerList';
import Event from './pages/Event';
import AddEvent from './Events/AddEvent';
import EditEvent from './Events/EditEvent';
import BloodCenter from'./pages/BloodCenter';
import AddCenter from "./BloodCenter/AddCenter";
import EditCenter from "./BloodCenter/EditCenter";
import ViewCenter from "./BloodCenter/ViewCenter";
function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
          <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/adduser" element={<AddUser />} />
            <Route exact path="/addvol" element={<AddVolunteer />} />
            <Route exact path="/bloodcamp" element={<BloodCamp />} />
            <Route exact path="/addcamp" element={<AddCamp />} />
            <Route exact path="/editcamp/:id" element={<EditCamp />} />
            <Route exact path="/viewcamp/:id" element={<ViewCamp />} />
            <Route exact path="/vaccinecamp" element={<VaccineCamp />} />
            <Route exact path="/addvaccine" element={<AddVaccine />} />
            <Route exact path="/editvaccine/:id" element={<EditVaccine />} />
            <Route path="/add-donation" element={<AddDonation />} />
            <Route path="/volunteerlist" element={<VolunteerList />} />
            <Route path="/event" element={<Event />} />
            <Route path="/addevent" element={<AddEvent />} />
            <Route path="/editevent/:id" element={<EditEvent />} />
            <Route path="/bloodcenter" element={<BloodCenter />} />
            <Route exact path="/addcenter" element={<AddCenter />} />
          <Route exact path="/editcenter/:id" element={<EditCenter />} />
          <Route exact path="/viewcenter/:id" element={<ViewCenter />} />
          </Routes>
        </Router>
      </AuthProvider>
      
    </div>
  );
}

export default App;
