import React from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';

function GymMachine({ gymMachine, deleteMachine }) {
    return (
        <tr className="list-item">
            <td>{gymMachine.gymMachineID}</td>
            <td>{gymMachine.gymMachineName}</td>
            <td>{gymMachine.machineQuantity}</td>
            <td>{gymMachine.totalUsage}</td>
            <td>{gymMachine.employeeID}</td>
            <td><MdDeleteOutline
                style={{ cursor: 'pointer' }}
                size="20px"
                onMouseOver={({ target }) => target.style.color = "gray"}
                onMouseOut={({ target }) => target.style.color = "black"}
                onClick={e => deleteMachine(e, gymMachine.gymMachineID)} /></td>
        </tr>
    )
}
export default GymMachine;