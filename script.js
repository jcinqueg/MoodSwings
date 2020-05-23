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
    console.log( "Attempting to recommend song" );
    var song = getRecommendation();
    console.log( "Resulting song is: " + song.toString() );
    document.getElementById("output").innerHTML = song.toString();
}

/**
 * Gets a proper recommendation for someones tastes in music.
 * Warning, technically only the toString() method is safe incase somehow the user is not recommended
 * any songs.
 */
function getRecommendation() {
  //window.popSongs holds all of the popular songs
  var keySong = window.keySong;
  var minstance = 10;
  var targetSong = new Object();
  targetSong.toString = function () { return "Sorry, you're tastes are inconceivable. We have no song for you." };
  for( i = 0; i < topSongs; i++) {
    var song = window.popSongs[i];
    //For each song, check it's distance and update variables as necessary
    var distance = songDistance( keySong, song );
    if( distance < minstance ) {
      minstance = distance;
      targetSong = song;
    }
  }
  return targetSong;
}