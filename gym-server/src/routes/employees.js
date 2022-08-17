module.exports = function () {
    const express = require('express');

    const employeesRouter = express.Router();

    const getEmployees = (res, mysqlCon, context, complete) => {
        mysqlCon.query(
            "SELECT employeeID, employeeFirstName, employeeLastName, managerID, employeeRole FROM Employees",
            (error, results, fields) => {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.employees = results
                complete();
            });
    }

    employeesRouter.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        const mysqlCon = req.app.get('mysqlCon');

        const complete = () => {
            callbackCount++;
            if (callbackCount >= 1) {
                res.status(200).json(context.employees)
            }
        }
        getEmployees(res, mysqlCon, context, complete)
    });

    employeesRouter.delete('/', (req, res) => {
        const { employeeID } = req.body
        const inserts = [employeeID]
        const mysqlCon = req.app.get('mysqlCon')
        let sql = "DELETE FROM Employees WHERE (employeeID)= (?);";
        mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `deleted successfully.` }
                res.status(201).send(JSON.stringify(message))
            }
        });
    });



    employeesRouter.post('/', (req, res) => {
        const { employeeFirstName, employeeLastName, managerID, employeeRole } = req.body
        const inserts = [employeeFirstName, employeeLastName, managerID, employeeRole]

        const mysqlCon = req.app.get('mysqlCon')
        let sql = "INSERT INTO Employees (employeeFirstName, employeeLastName, managerID, employeeRole) VALUES (?, ?, ?, ?)";
        sql = mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `Employee ${employeeFirstName} ${employeeLastName} added successfully.` }
                res.status(201).send(JSON.stringify(message))
            }
        });
    });

    return employeesRouter
}();