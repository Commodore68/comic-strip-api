import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

require('dotenv').config();

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

if (process.env.NODE_ENV === 'development') {
    app.use(cors);
}

app.use('/test', (req, res) => {
    res.status(200).send({test: 'test response'});
});

app.use('/api', require('./api'));

// Serve any static files
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.ejs'));
});


const server = app.listen(process.env.PORT || 3000, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`⚡️[server]: Server is running at http://localhost:${server.address().port}`);
    }
    else if (process.env.NODE_ENV === 'production') {
        //console.log(`⚡️[server]: Server is running at https://healthy-competition-412.herokuapp.com:${server.address().port}`);
    }
});

module.exports = app;
