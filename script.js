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
function recommend() {
    console.log( "Attempting to recommend song" );
    recSong = getRecommendation();
    console.log( "Resulting song is: " + recSong.toString() );
    document.getElementById("output").innerHTML = recSong.toString();
    document.getElementById("recommendation").style.display = "block"
    showTrackAlbum( recSong.id );
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
  popDistances = Array( popSongs.length );
  for( i = 0; i < popDistances.length; i++) {
    popDistances[i] = { distance: songDistance( keySong, popSongs[i] ), index: i};
  }
  popDistances.sort( function (song, other) {
    return song.distance - other.distance;
  });
  //popDistances holds all songs in order of recommendation, along with the proper index on the popSongs array
  curPopDistIndex = 0;
  
  //Change button to a 'get next song button'
  document.getElementById("submit").innerHTML = "Swing some More";
  document.getElementById("submit").setAttribute( "onClick", "nextRecommend()");
  return popSongs[ popDistances[curPopDistIndex].index ];
}

function nextRecommend() {
  curPopDistIndex += 1;
  var recSong = popSongs[ popDistances[curPopDistIndex].index ];
  console.log( "Next song is: " + recSong.toString() );
  document.getElementById("output").innerHTML = recSong.toString();
  showTrackAlbum( recSong.id );
}