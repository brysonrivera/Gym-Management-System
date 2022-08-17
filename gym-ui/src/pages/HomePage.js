import React from 'react';
import Nav from '../components/nav/Nav'
import { Link } from 'react-router-dom';
function HomePage() {
    return (
        <div className="main-container">
            <Nav />
            <h1>Welcome to Planet Fitness!</h1>
            <h2>Stay Fit For Life</h2>
            <img src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="person deadlifting weights inside of a gym" />
            <div className="description-container">
                <h1>Join one of our Judgement Free Classes Today</h1>
                <p>We can see records of <Link to="/attendance"> Attendance</Link>. Members are allowed, and encouraged, to take as many classes as they like. </p>
                <p>Peek our list of <Link to="/classes"> Classes</Link> that range from Soul Cycle to Boxing. </p>
                <img src='https://i0.wp.com/trustyspotter.com/wp-content/uploads/2019/09/soulcycle_classpass.jpg'
                    alt='classed filled with people riding stationary bikes' />
                <h1>Machines, Machines, Machines!!!!</h1>
                <p>Our facilities only have state-of-the-art equipment. Check out the full-list of <Link to="/gym-machines"> Gym Machines</Link> today!</p>
                <img src='https://www.ghp-news.com/pages/32b41236-48e6-42ab-a935-34dea520d40a/a76dfdc1-15ef-451b-a906-605cdc689650/img_2_07f96abb-0ee4-4c96-8057-5217d49fabc4.png'
                    alt='room filled with weight-lifting gym equipment' />
                <h1>All this could not happen without our valued Employees</h1>
                <p>Without your help, we are nothing. Check out the <Link to="/employees">real MVP's</Link> that operate the facilities behind the scenes.</p>
                <img src='https://media.istockphoto.com/photos/diverse-people-in-gym-picture-id501060589?k=20&m=501060589&s=612x612&w=0&h=3xDAFXqUcvCqqlrLLxSVMHTZXevd0ldn2wsuMY-T5p4='
                    alt='room with people wearing athletic clothing posing' />
                <h1>Our Mission: Set our Members up for success!</h1>
                <p>We value our <Link to="/members"> Members</Link>, and make it our priority to give them the best gym experience available. </p>
                <img src='https://wholesale.rdxsports.com/hubfs/8-Blog%20image%20B2B-1.jpg' alt='3 people dooing a squat. ' />
            </div>
        </div>
    );
}

export default HomePage;