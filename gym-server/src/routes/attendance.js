module.exports = function () {
    const express = require('express');

    const attendanceRouter = express.Router();

    const getAttendance = (res, mysqlCon, context, complete) => {
        mysqlCon.query(
            "SELECT m.memberID, m.memberFirstName, m.memberLastName, ca.classID, TIME_FORMAT(c.startTime, '%h:%i %p') startTime, c.classDate, c.classType FROM Members as m INNER JOIN ClassAttendance as ca ON ca.memberID = m.memberID INNER JOIN Classes as c ON ca.classID = c.classID ORDER BY c.classDate DESC;",
            (error, results, fields) => {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.attendance = results
                complete();
            });
    }

    attendanceRouter.post('/', (req, res) => {
        const { customerPhone, classType, classDate, classStart, firstName, lastName } = req.body
        const inserts = [customerPhone, classType, classDate, classStart, firstName, lastName]
        const mysqlCon = req.app.get('mysqlCon')
        let sql = `INSERT INTO 
        ClassAttendance (memberID, classID) VALUES 
        ((SELECT memberID FROM (SELECT * FROM Members WHERE phoneNumber = ?) AS Members), 
        (SELECT classID FROM (SELECT * FROM Classes 
            WHERE classType = ? AND 
            classDate = ? AND 
            startTime = ? AND
            employeeID = (SELECT employeeID FROM (SELECT * FROM Employees WHERE employeeFirstName = ? AND employeeLastName = ?) AS Employees))AS Class));`;
        sql = mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `added successfully.` }
                res.status(201).send(JSON.stringify(message))
            }
        });
    });

    attendanceRouter.get('/class-type', (req, res) => {
        let sql = `SELECT DISTINCT classType FROM Classes;`;
        const mysqlCon = req.app.get('mysqlCon')
        mysqlCon.query(sql, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                res.status(201).json(results)
            }
        });
    });

    attendanceRouter.get('/class-dates', (req, res) => {
        try {
            const inserts = [req.query.classTypes]
            let sql = `SELECT DISTINCT classDate FROM Classes WHERE classType = ? ORDER BY classDate ASC;`;
            const mysqlCon = req.app.get('mysqlCon')
            mysqlCon.query(sql, inserts, (error, results, field) => {
                if (error) {
                    res.status(502).send(JSON.stringify(error))
                } else {
                    res.status(201).json(results)
                }
            });
        } catch (error) {
            console.error(error)
        }
    });

    attendanceRouter.get('/class-start', (req, res) => {
        try {
            const dateObj = new Date(req.query.classDate)
            const inserts = [req.query.classType, dateObj]
            let sql = `SELECT DISTINCT TIME_FORMAT(startTime, "%h %i %p") AS niceFormat, startTime FROM Classes WHERE classType = ? AND classDate = ?;`;
            const mysqlCon = req.app.get('mysqlCon')
            mysqlCon.query(sql, inserts, (error, results, field) => {
                if (error) {
                    res.status(502).send(JSON.stringify(error))
                } else {
                    res.status(201).json(results)
                }
            });
        } catch (error) {
            console.error(error)
        }
    });

    attendanceRouter.get('/employees', (req, res) => {
        try {
            const inserts = [req.query.classType, req.query.classDate, req.query.classStart]
            let sql = `SELECT e.employeeFirstName as firstName, e.employeeLastName as lastName FROM Employees AS e WHERE employeeID IN (SELECT DISTINCT employeeID FROM Classes WHERE classType = ? AND classDate = ? AND startTime = ?);`;
            const mysqlCon = req.app.get('mysqlCon')
            mysqlCon.query(sql, inserts, (error, results, field) => {
                if (error) {
                    res.status(502).send(JSON.stringify(error))
                } else {
                    res.status(201).json(results)
                }
            });
        } catch (error) {
            console.error(error)
        }
    });

    attendanceRouter.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        const mysqlCon = req.app.get('mysqlCon');

        const complete = () => {
            callbackCount++;
            if (callbackCount >= 1) {
                res.status(200).json(context.attendance)
            }
        }
        getAttendance(res, mysqlCon, context, complete)
    });

    attendanceRouter.delete('/', (req, res) => {
        const { memberID, classID } = req.body;
        const inserts = [memberID, classID];
        const mysqlCon = req.app.get('mysqlCon');
        let sql = `DELETE FROM ClassAttendance WHERE (memberID, classID) = (?, ?);`
        mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `successfully deleted` }
                res.status(201).send(JSON.stringify(message))
            }
        });
    });

    return attendanceRouter
}();
