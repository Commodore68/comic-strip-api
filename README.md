# comic-strip-api
An API for developers of frontends to easily retrieve comic links and info by date

API currently served at https://get-comic-strips.herokuapp.com with a simple UI.

The API can also be run locally by downloading this project doing npm start (requires Node.js and npm)

The API accepts GET requests to the https://get-comic-strips.herokuapp.com/api endpoint

### API Parameters

* comicName: the name of the comic to get information on (__required__)
* date: a date string currently only accepts __yyyy-mm-dd__ formatted dates 
  * _this is __not__ a required value_
* An alternative to passing a single date string (_this is also __not__ required_)
  * year: a year in the format yyyy
  * month: a month in the format mm
  * day: a day in the format dd
    
Note: if no date is passed when interacting with the API, it will use today's date

### Error Handling

If no config for the comic passed, it will respond with a 404 error

If a malformed date is passed, it will respond with a 400 error

If for any reason the request to the generated url for the comic strip is refused, it will respond with a 404 error

If for any reason the html pulled from the webpage fails to be parsed, it will respond with a 500 error



### Config Format

configuration files will have to be added for any comic that this is to be used for

configuration files should be in the format:

    {
        "comic": SomeComicName,
        "baseUrl": "https://www.someComicName.com/strip/",
        "dateFormat": "the date format for the url",
        "htmlTags": [
            {
                "name": "image",
                "value": "image html class or id"
            },
            {
                "name": "date",
                "value": "date html class or id"
            },
            {
                "name": "title",
                "value": "title html class or id"
            },
            {
                "name": "tags",
                "value": "tags html class or id"
            },
            {
                "name": "transcript",
                "value": "transcript html class or id"
            }
        ]
    }

### Notes

The tags can be omitted as is appropriate.

The API will also return the alt text for any image tag

If any page does not contain the tags specified, the API will not return anything for that tag

Config files should be placed in the comic-config folder, and the file should be named the same as the comic

### Future Tasks

- [ ] accept more date formats
- [ ] add more comic strips
- [ ] add a way for a user to generate and use tokens for authenticating users
- [ ] make it work with POST requests
- [ ] return the tags and other long properties in a cleaner formatting
- [ ] improve the unit testing coverage


