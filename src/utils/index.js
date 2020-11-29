

function getDateString(args) {
    const {
        date,
        year,
        month,
        day,
        dateFormat
    } = args;

    let dateString;

    if (date !== undefined) {
        if (dateFormat && dateFormat === 'yyyy-mm-dd') {
            const dateRegExp = RegExp(/^\d{4}-\d{2}-\d{2}$/);
            if (!dateRegExp.test(date)) {
                throw new Error(`Invalid date format. Expected ${dateFormat}`);
            }

            dateString = date;
        } else {
            throw new Error('Date format does not exist in comic config file');
        }
    } else if (year !== undefined && month !== undefined && day !== undefined) {
        if (dateFormat && dateFormat === 'yyyy-mm-dd') {
            dateString = `${year}-${month}-${day}`;
        } else {
            throw new Error('Date format does not exist in comic config file');
        }
    } else { //no date so we use today's date
        if (dateFormat && dateFormat === 'yyyy-mm-dd') {
            const today = new Date();

            dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        } else {
            throw new Error('Date format does not exist in comic config file');
        }
    }

    return dateString;
}

function extractData({html, htmlTags}) {



    return true;
}

module.exports = {
    extractData,
    getDateString
}
