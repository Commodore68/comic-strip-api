const {expect} = require('chai');
const sinon = require('sinon');
const {extractData, getDateString} = require('./');

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
});




