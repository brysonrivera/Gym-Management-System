import React from 'react';
import Nav from '../components/nav/Nav';
import GymMachineList from '../components/Lists/GymMachineList'
import { useState, useEffect } from 'react';

function GymMachinesPage() {
    const [gymMachines, setGymMachines] = useState([]);

    //used to insert into db
    const [gymMachineName, setGymMachineName] = useState('');
    const [totalUsage, setTotalUsage] = useState('');
    const [machineQuantity, setMachineQuantity] = useState('');
    const [employeeID, setEmployeeID] = useState('')


    // display error or added message for conditional render
    const [errorMessage, setErrorMessage] = useState('');
    const [added, setAdded] = useState('');

    const loadGymMachines = async () => {
        const response = await fetch('/api/gym-machines');
        const data = await response.json();
        console.log(data)
        setGymMachines(data);
    }

    //display Error by changing the 
    const displayMessage = async (message, setFunction) => {
        const reload = () => {
            window.location.reload();
        }
        setFunction(message);
        //when 10 seconds pass, the error message will go away
        setTimeout(() => {
            setFunction('')
            reload()
        }, 5000);
    }

    const postGymMachine = async e => {
        e.preventDefault();
        let newGymMachine = {
            gymMachineName: gymMachineName,
            totalUsage: totalUsage,
            machineQuantity: machineQuantity,
            employeeID: employeeID,
        }
        const response = await fetch('/api/gym-machines', {
            method: "POST",
            body: JSON.stringify(newGymMachine),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.status === 502) {
            displayMessage(data.sqlMessage, setErrorMessage);
        } else {
            displayMessage(data.msg, setAdded)
        }
    }

    const deleteMachine = async (e, gymMachineID) => {
        e.preventDefault();
        const response = await fetch('/api/gym-machines', {
            method: "DELETE",
            body: JSON.stringify({ gymMachineID: gymMachineID }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.status === 502) {
            displayMessage(data.sqlMessage, setErrorMessage);
        } else {
            displayMessage(data.msg, setAdded);
        }
    }

    useEffect(() => {
        loadGymMachines();
    }, []);

    return (
        <div className="main-container">
            <Nav />
            <h1>Gym Machines</h1>
            {errorMessage &&
                <p id="error">Error: {errorMessage}</p>
            }
            {added &&
                <p id="added">{added}</p>
            }
            <table>
                <thead>
                    <tr>
                        <th>Gym Machine ID</th>
                        <th>Gym Machine Name</th>
                        <th>Total Usage</th>
                        <th>Machine Quantity</th>
                        <th>Employee ID</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    <GymMachineList className="list-container" gymMachines={gymMachines} deleteMachine={deleteMachine} />
                </tbody>
            </table>

            <form onSubmit={e => postGymMachine(e)}>
                <h3>Insert New Machine</h3>
                <label htmlFor='name'>Machine Name
                    <input
                        type='text'
                        id='name'
                        name='name'
                        size='15'
                        value={gymMachineName}
                        maxLength='40'
                        onChange={e => setGymMachineName(e.target.value)}
                        required='required' />
                </label>
                <label htmlFor='usage'>Total Usage
                    <input
                        type='number'
                        id='usage'
                        name='usage'
                        size='15'
                        value={totalUsage}
                        onChange={e => setTotalUsage(e.target.value)}
                        min='0'
                        required='required' />
                </label>
                <label htmlFor='quantity'>Machine Quantity
                    <input
                        type='number'
                        id='quantity'
                        name='quantity'
                        value={machineQuantity}
                        onChange={e => setMachineQuantity(e.target.value)}
                        size='15'
                        min='0'
                        required='required' />
                </label>
                <label htmlFor='employee'>Employee ID
                    <input
                        type='number'
                        id='employee'
                        name='employee'
                        size='15'
                        value={employeeID}
                        onChange={e => setEmployeeID(e.target.value)}
                        min='1'
                        required='required' />
                </label>
                <button type="submit">Confirm</button>
            </form>

        </div>
    );
}

export default GymMachinesPage;