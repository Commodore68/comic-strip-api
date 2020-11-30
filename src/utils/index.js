const HTMLParser = require('node-html-parser');

function getDateString(args) {
    const {
        date,
        year,
        month,
        day,
        dateFormat
    } = args;

    let dateString;

    if (!dateFormat) {
        throw new Error('Date format does not exist in comic config file');
    }

    if (date !== undefined) {
        if (dateFormat === 'yyyy-mm-dd') {
            const dateRegExp = RegExp(/^\d{4}-\d{2}-\d{2}$/);
            if (!dateRegExp.test(date)) {
                throw new Error(`Invalid date format. Expected ${dateFormat}`);
            }

            dateString = date;
        } else {
            throw new Error('Date format does not match expected formats');
        }
    } else if (year !== undefined && month !== undefined && day !== undefined) {
        if (dateFormat === 'yyyy-mm-dd') {
            dateString = `${year}-${month}-${day}`;
        } else {
            throw new Error('Date format does not match expected formats');
        }
    } else if (year === undefined && month === undefined && day === undefined && date === undefined) { //no date so we use today's date
        if (dateFormat === 'yyyy-mm-dd') {
            const today = new Date();

            dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        } else {
            throw new Error('Date format does not match expected formats');
        }
    } else {
        //this only occurs if only some, but not all of year, month, day exist
        throw new Error('Invalid partial Date');
    }

    return dateString;
}

function extractData({html, htmlTags}) {
    const root = HTMLParser.parse(html);

    if (!HTMLParser.valid(html)) {
        throw new Error('html not valid');
    }

    const data = {};

    if (!htmlTags) {
        throw new Error('htmlTags undefined');
    } else if (htmlTags.length === undefined) {
        throw new Error('htmlTags is invalid. expected an array')
    }

    //loop through each tag from the config
    htmlTags.forEach((tag) => {
        const node = root.querySelector(tag.value);

        //do the various operations for the different type of information to parse
        let result;

        if (node !== null) {
            if (tag.name === 'image') {
                result = {
                    src: node.getAttribute('src'),
                    alt: node.getAttribute('alt')
                };
            } else if (tag.name === 'date') {
                result = node.removeWhitespace().rawText;
            } else if (tag.name === 'title') {
                result = node.rawText;
            } else if (tag.name === 'tags') {
                result = node.removeWhitespace().rawText;
            } else if (tag.name === 'transcript') {
                result = node.text.trim();
            }
        }

        data[tag.name] = result;
    });

    return data;
}

module.exports = {
    extractData,
    getDateString
}
