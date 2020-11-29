const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const controller = require('./api');

require('dotenv').config();

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/test', (req, res) => {
    res.status(200).send({test: 'test response'});
});

app.get('/api', controller);

// Serve any static files
app.use(express.static(path.join(__dirname, '..', 'views')));

const server = app.listen(process.env.PORT || 3000, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`⚡️[server]: Server is running at http://localhost:${server.address().port}`);
    }
    else if (process.env.NODE_ENV === 'production') {
        console.log(`⚡️[server]: Server is running at https://comic-strip-api.herokuapp.com:${server.address().port}`);
    }
});

module.exports = app;
