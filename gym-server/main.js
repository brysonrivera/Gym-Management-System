require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysqlCon = require('./src/config/dbconnection.js')
const routes = require('./src/middlewares/routes')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.set('port', process.env.PORT);

app.set('mysqlCon', mysqlCon);

app.use('/api', routes);

mysqlCon.connect((err) => {
    if (err) throw err
    else console.log("Connected")
})

app.listen(app.get('port'), () => {
    console.log(`Server Listening on PORT ${app.get('port')}`)
});
