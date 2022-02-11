import React from 'react';
import Nav from '../components/nav/Nav';
import GymMachineList from '../components/Lists/GymMachineList'
import {useState} from 'react';

function GymMachinesPage() {
    const [gymMachines, setGymMachines] = useState([]);

    const onDelete = gymMachineID => {
        console.log('trigger delete')
    }

    const onEdit = gymMachine => {
        console.log('trigger edit function')
    }
    return (
        <div className="main-container">
            <Nav />
            <h1>Gym Machines</h1>
            <table>
                <thead>
                    <tr>
                        <th>gymMachineID</th>
                        <th>totalUsage</th>
                        <th>machineQuantity</th>
                        <th>employeeID</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <GymMachineList className="list-container" gymMachines={gymMachines} onDelete={onDelete} onEdit={onEdit} />
                </tbody>
            </table>
        </div>
    );
}

export default GymMachinesPage;