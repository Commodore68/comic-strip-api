const {expect} = require('chai');
const sinon = require('sinon');
const {extractData, getDateString} = require('./');
const data = require('./data');

describe('Utils Tests', () => {
    describe('getDateString Tests', () => {
        it('should return today\'s date if no date is passed', () => {
            const today = new Date();
            const expected = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            const actual = getDateString({dateFormat: 'yyyy-mm-dd'});

            expect(actual).to.equal(expected);
        });

        it('should return the date if there is no date string but the year month and day are populated', () => {
            const expected = '2020-10-31'
            const actual = getDateString({year: '2020', month: '10', day: '31', dateFormat: 'yyyy-mm-dd'});

            expect(actual).to.equal(expected);
        });

        it('should return the dateString if the date string is in the proper format', () => {
            const expected = '2020-10-31';
            const actual = getDateString({date: '2020-10-31', dateFormat: 'yyyy-mm-dd'});

            expect(actual).to.equal(expected);
        });

        it('should throw an error if the dateFormat is undefined', () => {
            expect(() => {
                getDateString({});
            }).to.throw('Date format does not exist in comic config file');
        });

        it('should throw an error if no date is passed and dateFormat is not recognized', () => {
            expect(() => {
                getDateString({dateFormat: 'yyy-mm-dd'});
            }).to.throw('Date format does not match expected formats');
        });

        it('should throw an error if the date string is passed and the dateFormat is not recognized', () => {
            expect(() => {
                getDateString({date: '202010-30', dateFormat: 'yyy-mm-dd'});
            }).to.throw('Date format does not match expected formats');
        });

        it('should throw an error if no date string is passed, but year, month, and day are and the dateFormat is not recognized', () => {
            expect(() => {
                getDateString({year: '2020', month: '10', day: '31', dateFormat: 'yyy-mm-dd'});
            }).to.throw('Date format does not match expected formats');
        });

        it('should throw an error if the date string does not match the expected format', () => {
            expect(() => {
                getDateString({date: '202010-30', dateFormat: 'yyyy-mm-dd'});
            }).to.throw('Invalid date format. Expected yyyy-mm-dd');
        });

        it('should throw an error if the date string does not exist and the year, month, day are only partially populated', () => {
            expect(() => {
                getDateString({year: '2020', month: '10', dateFormat: 'yyyy-mm-dd'});
            }).to.throw('Invalid partial Date');
        });
    });

    describe('extractData Tests', () => {
        it('should throw an error if the html is invalid', () => {
            expect(() => {
                extractData({html: "<a href='blue.html id='green'>missing attribute quotes</>"});
            }).to.throw('html not valid');
        });

        it('should throw an error if the htmlTags is undefined', () => {
            expect(() => {
                extractData({html: "<a href='blue.html' id='green'>missing attribute quotes</a>"});
            }).to.throw('htmlTags undefined');
        });

        it('should throw an error if the htmlTags is not an array', () => {
            expect(() => {
                extractData({html: "<a href='blue.html' id='green'>missing attribute quotes</a>", htmlTags: {}});
            }).to.throw('htmlTags is invalid. expected an array');
        });

        it('should return an empty object if the htmlTags is empty', () => {
            const expected = {};
            const actual = extractData({html: "<a href='blue.html' id='green'>missing attribute quotes</a>", htmlTags: []});

            expect(actual).to.deep.equal(expected);
        });

        it('should return an object in the correct format if the htmlTags is not empty and the nodes exist in the html', () => {
            const expected = {
                date: "Sunday November 29,2020",
                image: {
                    alt: "Dogbert Does Telemedicine - Dilbert by Scott Adams",
                    src: "https://assets.amuniversal.com/25c51830f72701382da8005056a9545d",
                },
                tags: "Tags#answers,#blockchain,#business,#ear piece,#evil,#ignorance,#managers &amp; supervisors,#smart,#technology",
                test: undefined,
                title: "Dogbert Does Telemedicine",
                transcript: "Transcript\n    boss: later i have a meeting about blockchain and i don't understand anything about it. i'll be wearing this earpiece, and i want you to feed me smart lines.\n        dilbert at home talking to dogbert: do you want to do something evil?\n        dogbert: say no more. give me that.",
            };
            const actual = extractData({
                html: data,
                htmlTags: [
                    {
                        "name": "image",
                        "value": ".img-comic"
                    },
                    {
                        "name": "date",
                        "value": ".comic-title-date"
                    },
                    {
                        "name": "title",
                        "value": ".comic-title-name"
                    },
                    {
                        "name": "tags",
                        "value": ".comic-tags"
                    },
                    {
                        "name": "transcript",
                        "value": ".comic-transcript"
                    },
                    {
                        "name": "test",
                        "value": "test"
                    }
                ]
            });

            expect(actual).to.deep.equal(expected);
        });
    });
});
