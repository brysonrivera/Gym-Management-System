import React from 'react';
import Nav from '../components/nav/Nav'
function HomePage() {
    return (
        <div className="main-container">
            <Nav />
            <h1>Welcome to Planet Fitness!</h1>
            <h2>Stay Fit For Life</h2>
            <img src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                alt="person deadlifting weights inside of a gym"/>
        </div>
    );
}

export default HomePage;