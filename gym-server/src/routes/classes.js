module.exports = function () {
    const express = require('express');

    const classesRouter = express.Router();

    const getClasses = (res, mysql, context, complete) => {
        mysql.query(
            "SELECT c.classDate, c.classID, TIME_FORMAT(c.startTime, '%h:%i %p') startTime, c.classType, e.employeeID, e.employeeFirstName, e.employeeLastName FROM Classes AS c INNER JOIN Employees as e ON c.employeeID = e.employeeID ORDER BY c.classDate DESC;",
            (error, results, fields) => {
                if (error) {
                    res.status(400).json({ error: error })
                }
                context.classes = results
                complete();
            });
    }

    classesRouter.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        const mysqlCon = req.app.get('mysqlCon');

        const complete = () => {
            callbackCount++;
            if (callbackCount >= 1) {
                res.status(200).json(context.classes)
            }
        }
        getClasses(res, mysqlCon, context, complete)
    });

    classesRouter.delete('/', (req, res) => {
        const { classID } = req.body;
        const inserts = [classID];
        const mysqlCon = req.app.get('mysqlCon');
        let sql = `DELETE FROM Classes WHERE (classID) = (?);`
        mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `successfully deleted` }
                res.status(201).send(JSON.stringify(message))
            }
        });
    });

    classesRouter.post('/', (req, res) => {
        const { classDate, startTime, classType, employeeID } = req.body
        const inserts = [classDate, startTime, classType, employeeID]

        const mysqlCon = req.app.get('mysqlCon')
        let sql = "INSERT INTO Classes (classDate, startTime, classType, employeeID) VALUES (?, ?, ?, ?)";
        sql = mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `added successfully.` }
                res.status(201).send(JSON.stringify(message))
            }
        });
    });

    return classesRouter
}();