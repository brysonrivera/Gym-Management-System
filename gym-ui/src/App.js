import './App.css';
import { Routes, Route } from 'react-router-dom';

import AttendancePage from './pages/AttendancePage';
import ClassesPage from './pages/ClassesPage';
import EmployeesPage from './pages/EmployeesPage';
import HomePage from './pages/HomePage';
import GymMachinesPage from './pages/GymMachinesPage';
import MembersPage from './pages/MembersPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/gym-machines" element={<GymMachinesPage />} />
        <Route path="/members" element={<MembersPage />} />
      </Routes>
    </div>
  );
}



export default App;
