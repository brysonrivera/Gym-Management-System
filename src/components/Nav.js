import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar">
            <ul className="nav-container">
                <li className='nav-item'><Link to="/"> Home Page</Link></li>
                <li className='nav-item'><Link to="/attendance"> Attendance</Link></li>
                <li className='nav-item'><Link to="/classes"> Classes</Link></li>
                <li className='nav-item'><Link to="/employees"> Employees Page</Link></li>
                <li className='nav-item'><Link to="/gym-machines"> Gym Machines</Link></li>
                <li className='nav-item'><Link to="/members"> Members</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;