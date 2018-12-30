console.log('this is loaded');
var Liri = require("./liri.js");

var liri = new Liri();
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if(search === "concert-this") {
  liri.getBands(term);
}

if(search === "spotify-this-song") {
  liri.getSong(term);

}

if(search === "movie-this") {
  liri.getMovie(term);
}

 if(search === "do-what-it-says") {
   liri.doWhat(term);
 }