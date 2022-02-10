import './App.css';
import { Routes, Route } from 'react-router-dom';

import Attendance from './pages/Attendence';
import Classes from './pages/Classes';
import Employees from './pages/Employees';
import HomePage from './pages/HomePage';
import GymMachines from './pages/GymMachines';
import Members from './pages/Members';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/gym-machines" element={<GymMachines />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  );
}



export default App;
