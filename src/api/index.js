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
        const err = new Error('comic config does not exist');
        err.statusCode = 400;
        return next(err);
    }

    //get the date string based on the format in the comic config and the query params
    try {
        comicDateString = getDateString({date, year, month, day, dateFormat: config.dateFormat});
    } catch (e) {
        const err = new Error(e.message);
        err.statusCode = 400;
        return next(err);
    }

    //make a request for the comic strip webpage based on the date and comic
    const response = await fetch(`${config.baseUrl}${comicDateString}`);

    if (response.status !== 200) {
        const err = new Error(`Error comic page ${config.baseUrl}${comicDateString} does not exist`);
        err.statusCode = 404;
        return next(err);
    } else {
        const html = await response.text();

        //receive response and send it to the parser for the individual tags to parse
        try {
            const data = extractData({html, htmlTags: config.htmlTags});

            const response = {
                comic: config.comic,
                ...data,
            };

            res.status(200).send(response);
        } catch (e) {
            const err = new Error(e.message);
            err.statusCode = 500;
            return next(err);
        }
    }
}

module.exports = controller;
