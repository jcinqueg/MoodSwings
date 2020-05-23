/**
 * @name        script.js
 * @author      John Cinquegrana, <your name here>
 * @date        5/18/2020
 * @abstract    Uses the Spotify API to recommend songs based on mood
 */

console.log("Loading script.js.");

 /**
  * This function gets called when the form is submitted.
  */
function reccomend() {
    var input = document.getElementById("input").value;
    console.log( "Input read: " + input );
    var song = getRecommendation();
    Document.getElementById("output").innerHTML = song.toString();
}

/**
 * Gets a proper recommendation for someones tastes in music.
 * Warning, technically only the toString() method is safe incase somehow the user is not recommended
 * any songs.
 */
function getRecommendation() {
  //window.popSongs holds all of the popular songs
  var keySong = getKeySong();
  var minstance = 10;
  var targetSong = new Object();
  targetSong.toString = function () { return "Sorry, you're tastes are inconceivable. We have no song for you." };
  for( song in window.popSongs ) {
    //For each song, check it's distance and update variables as necessary
    var distance = songDistance( keySong, song );
    if( distance < minstance ) {
      minstance = distance;
      targetSong = song;
    }
  }
  return targetSong;
}