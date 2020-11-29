const fetch = require('node-fetch');
const {extractData, getDateString} = require('../utils');


async function controller(req, res, next) {
    const {
        comicName,
        date,
        year,
        month,
        day
    } = req.query;

    let config, comicDateString;
    try {
        config = require(`../../comic-configs/${comicName}`);
    } catch (e) {
        console.log('entered require comic config error')
        res.status(400).send('comic config does not exist');
    }

    //get the date string based on the format in the comic config and the query params
    try {
        comicDateString = getDateString({date, year, month, day, dateFormat: config.dateFormat});
    } catch (e) {
        res.status(400).send(e.message);
    }

    //make a request for the comic strip webpage based on the date and comic
    const response = await fetch(`${config.baseUrl}${comicDateString}`);

    if (response.status !== 200) {
        res.status(404).send(`Error comic page ${config.baseUrl}${comicDateString} does not exist`)
    } else {
        const html = await response.text();

        //receive response and send it to the parser for the individual tags to parse
        try {
            const data = extractData({html, htmlTags: config.htmlTags});

            const response = {
                ...data,
                comic: config.comic,
            };

            res.status(200).send(response);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}

module.exports = controller;
