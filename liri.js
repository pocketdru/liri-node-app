require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');
// package for reading and writing files
var fs = require("fs");

// Create the TV constructor
var Liri = function () {

    var divider = "\n------------------------------------------------------------\n\n";

    // getBands takes in the name of a band and searches the bandsintown API
    this.getBands = function (artist) {

        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            function (response, err) {
                var jsonData = response.data[0];
                if (jsonData === undefined || jsonData.length == 0) {
                    console.log("Sorry, artist not on tour.");
                    return;
                }
                // concertData ends up being the string containing the show data we will print to the console
                var concertData = [
                    "Venue name: " + jsonData.venue.name,
                    "Venue location " + jsonData.venue.city + ", " + jsonData.venue.region + ".",
                    "Event Date: " + moment(jsonData.venue.datetime).format("MM/DD/YYYY")
                ].join("\n\n");

                console.log(concertData + divider);
                // Append concertData and the divider to log.txt, print showData to the console
                fs.appendFile("log.txt", concertData + divider, function (err) {
                    if (err) throw err;
                });
            }
        );
    }

    this.getSong = function (song) {

        var def = "The Sign";

        var spotify = new Spotify({
            id: "b9cfd6c3136c4f48a401dcc96146af42",
            secret: "4e192eb1975d43ad9f111c3be7f001e7"
        });

        spotify.search({
            type: 'track',
            query: song,
            limit: 2,

        }, function (err, data) {

            if (data == null) {
                spotify.search({
                    type: 'track',
                    query: "The Sign",
                    limit: 2
                }, function (err, data) {
                    console.log("2");
                    printData(data);
                });
            } else {
                printData(data);

            }

            if (err) {
                return console.log('Error occurred: ' + err);
            }
        });

        function printData(data) {
            var songData = [
                "Artist: " + data.tracks.items[0].artists[0].name,
                "Song Name: " + data.tracks.items[0].name,
                "Preview: " + data.tracks.items[0].preview_url,
                "Album: " + data.tracks.items[0].album.name
            ].join("\n\n");

            console.log(divider + songData + divider);
            // Append songData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", songData + divider, function (err) {
                if (err) throw err;


            });
        }
    }

    this.getMovie = function (movie) {

        // run the request with axios module on a URL with a JSON
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy&limit=1").then(
            function (response) {

                if (response.data.Response === "False") {
                    axios.get("http://www.omdbapi.com/?t=" + "Mr.Nobody" + "&y=&plot=short&apikey=trilogy&limit=1").then(
                        function (response) {
                            printData(response);

                        })
                } else {
                    printData(response);
                }
            }
        );

        function printData(response) {
            var movieData = [
                "Title: " + response.data.Title,
                "Year: " + response.data.Year,
                "IMDB Rating: " + response.data.imdbRating,
                "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                "Country: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot:" + response.data.Plot,
                "Actors: " + response.data.Actors
            ].join("\n\n");

            console.log(movieData + divider);
            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", movieData + divider, function (err) {
                if (err) throw err;

            });
        }

    }


    this.doWhat = function () {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            var dataArr = [];
            for (var i = 0; i < data.length; i++) {
                dataArr.push(data[i]);
            }
            // console.log(dataArr);
            console.log(dataArr.join("").slice(-2));
        });
    }
}
module.exports = Liri;