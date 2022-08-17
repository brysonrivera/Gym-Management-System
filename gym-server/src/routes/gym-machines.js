module.exports = function () {
    const express = require('express');

    const gymMachinesRouter = express.Router();

    const getGymMachines = (res, mysqlCon, context, complete) => {
        mysqlCon.query(
            "SELECT gymMachineID, gymMachineName, machineQuantity, totalUsage, employeeID FROM GymMachines",
            (error, results, fields) => {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.gymMachines = results
                complete();
            });
    }

    gymMachinesRouter.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        const mysqlCon = req.app.get('mysqlCon');

        const complete = () => {
            callbackCount++;
            if (callbackCount >= 1) {
                res.status(200).json(context.gymMachines)
            }
        }
        getGymMachines(res, mysqlCon, context, complete)
    });

    gymMachinesRouter.post('/', (req, res) => {
        const { gymMachineName, totalUsage, machineQuantity, employeeID } = req.body
        const inserts = [gymMachineName, totalUsage, machineQuantity, employeeID]

        const mysqlCon = req.app.get('mysqlCon')
        let sql = "INSERT INTO GymMachines (gymMachineName, machineQuantity, totalUsage, employeeID) VALUES (?, ?, ?, ?)";
        mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `${gymMachineName} added successfully.` }
                res.status(201).send(JSON.stringify(message))
            }
        });
    });

    gymMachinesRouter.delete('/', (req, res) => {
        const { gymMachineID } = req.body;
        const inserts = [gymMachineID];
        let mysqlCon = req.app.get('mysqlCon');
        let sql = "DELETE FROM GymMachines WHERE (gymMachineID) = (?);";
        mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `successfully deleted` }
                res.status(201).send(JSON.stringify(message))
            }
        });
    });

    return gymMachinesRouter;
}();