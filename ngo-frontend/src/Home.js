import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for additional styling
import image1 from './images/happy1.jpg'; // Importing image1 from src/images directory
import image2 from './images/volunteer1.jpg'; // Importing image2 from src/images directory
import image3 from './images/image6.jpg'; // Importing image3 from src/images directory
import image4 from './images/social.jpg';
import image5 from './images/blooddon.jpg';
import image6 from './images/volt.jpg';
import goal1 from './images/goal1.jpg';
import goal2 from './images/goal2.avif';
import vaccine_logo from './images/vaccine_logo.png';
import vol_logo from './images/vol_logo.png';
import blood_donate_logo from './images/blood_donate_logo.png';
import participate_logo from './images/participate_logo.png';
import donate_logo from './images/donate_logo.png';

export const Home = () => {
  return (
    <div className='mt-5 pt-5'>
      <Carousel interval={3000} pause={false}>
        <Carousel.Item>
          <img className="d-block w-100" src={image1} alt="First slide" />
          <Carousel.Caption style={{ textAlign: 'center', color: 'white' }}>
            <h1 style={{ fontSize: '7em' }}>Uniting passions, multiplying impact</h1>
            <p style={{ fontSize: '3em' }}>Know more</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image2} alt="Second slide" />
          <Carousel.Caption style={{ textAlign: 'center', color: 'white' }}>
            <h1 style={{ fontSize: '7em' }}>Empowering change through volunteerism</h1>
            <p style={{ fontSize: '3em' }}>Join Us</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>

      <div className="container-xxl mt-5 pt-5 md-5 pb-5 spacer">

      </div>

      <section className="hero">
        <div className="hero-text">
          <h1>Empowering Youth, Enriching Lives</h1>
          <p>Join the movement to create a positive impact in the lives of underprivileged communities</p>
          <Link className='btn btn-primary call-to-action' to='/addvol'>Get Involved</Link>
        </div>
      </section>

      <div className="container-xxl mt-5 pt-5 spacer" style={{ fontSize: '1.5em', fontWeight: 'bold', fontFamily: 'cursive', backgroundColor: '#efac71' }}>
        <h1 className="text-center mb-4" style={{fontFamily: 'cursive'}}>Our Goals</h1>
        <div className="row justify-content-center">
          <div className="col-md-3 d-flex">
            <div className="card mb-4 flex-fill">
              <img src={goal1} className="card-img-top" alt="goal 1" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ fontSize: '1.5em', fontWeight: 'bold', fontFamily: 'cursive' }}>#1</h5>
                <p className="card-text" style={{ fontSize: '1.2em', fontFamily: 'cursive' }}>Enhance Healthcare Access</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-flex">
            <div className="card mb-4 flex-fill">
              <img src={goal2} className="card-img-top" alt="goal 2" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ fontSize: '1.5em', fontWeight: 'bold', fontFamily: 'cursive'}}>#2</h5>
                <p className="card-text" style={{ fontSize: '1.2em' ,fontFamily: 'cursive'}}>Promote Health    Education</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <h2>Our Initiatives</h2>

      <div className="container mt-5">
      {/* Left to Right Gradient */}
      <div className="row align-items-center mb-4 p-3" style={leftToRightGradientStyle}>
        <div className="col-md-6 text-left">
          <h3>Volunteer</h3>
          <p>Volunteer now: Step into your journey with us.</p>
        </div>
        <div className="col-md-6 text-right">
          <img src={vol_logo} alt="Placeholder" className="img-fluid" style={fixedImageStyle}/>
        </div>
      </div>

      {/* Right to Left Gradient */}
      <div className="row align-items-center mb-4 p-3" style={rightToLeftGradientStyle}>
        <div className="col-md-6 text-left order-md-2">
          <h3>Donate Blood</h3>
          <p>Be a hero: Donate blood and make a difference.</p>
        </div>
        <div className="col-md-6 text-right order-md-1">
          <img src={blood_donate_logo} alt="Placeholder" className="img-fluid" style={fixedImageStyle}/>
        </div>
      </div>

      {/* Left to Right Gradient */}
      <div className="row align-items-center mb-4 p-3" style={leftToRightGradientStyle}>
        <div className="col-md-6 text-left">
          <h3>Search Vaccine Centers</h3>
          <p>Search for local vaccine centers and get vaccinated</p>
        </div>
        <div className="col-md-6 text-right">
          <img src={vaccine_logo} alt="Placeholder" className="img-fluid" style={fixedImageStyle}/>
        </div>
      </div>

      {/* Right to Left Gradient */}
      <div className="row align-items-center p-3" style={rightToLeftGradientStyle}>
        <div className="col-md-6 text-left order-md-2">
          <h3>Participate</h3>
          <p>Get involved: Attend our NGO events and support our cause.</p>
        </div>
        <div className="col-md-6 text-right order-md-1">
          <img src={participate_logo} alt="Placeholder" className="img-fluid" style={fixedImageStyle}/>
        </div>
      </div>

      {/* Left to Right Gradient */}
      <div className="row align-items-center mb-4 p-3" style={leftToRightGradientStyle}>
        <div className="col-md-6 text-left">
          <h3>Donate Now</h3>
          <p>Support Us: Donate to our worthy causes today.</p>
        </div>
        <div className="col-md-6 text-right">
          <img src={donate_logo} alt="Placeholder" className="img-fluid" style={fixedImageStyle}/>
        </div>
      </div>
    </div>

      <section className="social-wellness">
      <div className="row mt-4" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{backgroundColor: '#efac71'}}>
          <h2 className="text-center m-4">6 Strategies for Improving Your Social Health</h2>
            <div className='card'>
              <p>Social connections might help protect health and lengthen life. Scientists are finding that our links to others can have powerful effects on our health.</p>
              <ul>
                <li>Join a group focused on a favorite hobby, such as reading, hiking, painting, or wood carving.</li>
                <li>Learn something new. Take a cooking, writing, art, music, or computer class.</li>
                <li>Take a class in yoga, tai chi, or another new physical activity.</li>
                <li>Join a choral group, theater troupe, band, or orchestra.</li>
                <li>Help with gardening at a community garden or park.</li>
                <li>Volunteer at a school, library, hospital, or place of worship.</li>
              </ul>
              
            </div>
          </div>
        </div>
      </section>
      <div id="footer">
            <p>Copyright &copy; All rights reserved</p>
      </div>
    </div>
  );
};
const leftToRightGradientStyle = {
  background: 'linear-gradient(to right, #ffdab9, #ffffff)'
};

const rightToLeftGradientStyle = {
  background: 'linear-gradient(to left, #ffdab9, #ffffff)'
};

const fixedImageStyle = {
  width: '300px',
  height: '300px'
};

export default Home;
