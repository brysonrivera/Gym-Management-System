import React from 'react';
import GymMachine from '../records/GymMachine'

function GymMachineList({ gymMachines, onDelete, onEdit }) {
    return (
        <>
            {gymMachines.map((gymMachine, i) => <GymMachine gymMachines={gymMachine} key={i} onDelete={onDelete} onEdit={onEdit} />)}

        </>
    );
}

export default GymMachineList;