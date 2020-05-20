/**
 * @name        script.js
 * @author      John Cinquegrana, <your name here>
 * @date        5/18/2020
 * @abstract    Uses the Spotify API to create song objects from song names
 */


/**
 * Takes in the result of the song GET from the spotify API, removes unnecessary fields, and adds necessary methods.
 * You must call JSON.parse on the result of the GET before passing it into this method.
 * @param {json} obj result of JSON.parse() on an Audio Features GET from SPOTIFY
 * @param {string} name The name of the song to be made into an object
 */
function createSong(obj, name) {
    /*
        It seemed redundant to make a whole class where information would be copied over en masse from the json object.
        Especially when the json object already existed and contained nearly all the necessary information. I plan on
        removing more of the data if we find that we really don't need it.
    */
    delete obj.key;
    delete obj.mode;
    delete obj.time_signature;
    delete obj.tempo;
    delete obj.type;
    /**
     * Returns the basic Euclidean distance between two song objects.
     * JDoc will not show up because I made the object the lazy way.
     */
    obj.Distance = function (other) {
        return Math.sqrt(
            (this.acousticness - other.acousticness)^2 +
            (this.danceability - other.danceability)^2 +
            (this.energy - other.energy)^2 +
            (this.instrumentalness - other.instrumentalness)^2 +
            (this.liveness - other.liveness)^2 +
            (this.loudness - other.loudness)^2 +
            (this.valence - other.valence)^2
        );
    };
    //Add the name of the song for convenience
    obj.name = name;
}

/**
 * Given the name of a song, this function will return a song object that contains all necessary features of the song.
 * This function makes a request to the SPOTIFY API and parses a song object out of that.
 * @param {string} name The name of the song to be gotten from spotify.
 */
export function song(name) {
    //TODO
}

/**
 * Returns a list of popular songs within spotify. Each song should be in the form of the song object.
 */
export function popularSongs() {
    //TODO
}

/**
 * So this is meant to take a users spotify profile and find a key. The key is a song object that is what
 * we should be looking for in the popular songs list. Basically the key is the perfect song we'd hope to find.
 * I have no idea how the profile authentification or anything like that works, so feel free to go at the html
 * or whatever to make this function actually work as intended. This is the big one.
 * @param {??} profile 
 */
export function getKey(profile) {
    //TODO
}