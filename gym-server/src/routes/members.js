module.exports = function () {
    const express = require('express');
    const membersRouter = express.Router();

    const getMembers = (res, mysqlCon, context, complete) => {
        mysqlCon.query(
            "SELECT memberID, memberFirstName, memberLastName, membershipTier, memberDOB, phoneNumber, memberEmail FROM Members",
            (error, results, fields) => {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.members = results
                complete();
            });
    }

    membersRouter.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        const mysqlCon = req.app.get('mysqlCon');

        const complete = () => {
            callbackCount++;
            if (callbackCount >= 1) {
                res.status(200).json(context.members)
            }

        }
        getMembers(res, mysqlCon, context, complete)
    });

    membersRouter.delete('/', (req, res) => {
        const { memberID } = req.body;
        const inserts = [memberID];
        const mysqlCon = req.app.get('mysqlCon');
        let sql = "DELETE FROM Members WHERE (memberID) = (?);";
        mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `deleted successfully.` }
                res.status(201).send(JSON.stringify(message))
            }
        });


    });

    membersRouter.post('/', (req, res) => {
        const { fname, lname, tier, dob, phoneNumber, email } = req.body
        const inserts = [fname, lname, tier, dob, phoneNumber, email]
        const mysqlCon = req.app.get('mysqlCon')
        let sql = "INSERT INTO Members (memberFirstName, memberLastName, membershipTier, memberDOB, phoneNumber, memberEmail) VALUES (?, ?, ?, ?, ?, ?)";
        sql = mysqlCon.query(sql, inserts, (error, results, field) => {
            if (error) {
                res.status(502).send(JSON.stringify(error))
            } else {
                const message = { msg: `Member ${fname} ${lname} added successfully.` }
                res.status(201).send(JSON.stringify(message))
            }
        });
    });

    return membersRouter
}();