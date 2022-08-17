import React from 'react';
import { Link } from 'react-router-dom';
import { BiRun } from 'react-icons/bi';

function Nav() {
    return (
        <nav className="navbar">
            <ul className="nav-container">
                <li className='nav-item'><Link to="/"> <BiRun style={{ fontSize: '38px' }} /></Link></li>
                <li className='nav-item'><Link to="/attendance"> Attendance</Link></li>
                <li className='nav-item'><Link to="/classes"> Classes</Link></li>
                <li className='nav-item'><Link to="/employees"> Employees</Link></li>
                <li className='nav-item'><Link to="/gym-machines"> Gym Machines</Link></li>
                <li className='nav-item'><Link to="/members"> Members</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;