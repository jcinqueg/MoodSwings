/**
 * @name        script.js
 * @author      John Cinquegrana, <your name here>
 * @date        5/18/2020
 * @abstract    Uses the Spotify API to create song objects from song names
 */

/**
 * This function is simply for dehashing the auth data in the url
 */
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

/**
 * This function sets loaclStorage items for the access token (vaild for 60 min) and the state
 * for verification
 */
function getParamsFromURL() {
    try {
        var hashParams = getHashParams()
        localStorage.setItem('access_token', hashParams["access_token"]);
        localStorage.setItem('received_state', hashParams["state"]);
        return true;
    } catch (err) {
        console.log(err.message)
        return false;
    }
}

/**
 * This function verifies the state received and starts the function chain
 */
window.onload = function() {
    var auth_success = getParamsFromURL()
    //localStorage.setItem('spotify_auth_state', localStorage.getItem('received_state_1'))
    if (auth_success & localStorage.getItem('received_state') == localStorage.getItem('spotify_auth_state_1')) {
        $(".content")[0].style.display = "block"
        //$("#searchbutton")[0].addEventListener("click", function() { searchForTrack() });
    } else {
        $(".error")[0].style.display = "block"
        //console.log(success, localStorage.getItem('received_state'), localStorage.getItem('spotify_auth_state'))
    }
    //Example function call with callback funtion that prints response to console
    querySpotifyTopSongs(20, callback)
}

/**
 * Helper function to load GET requests. It requires a callback function since requests are async
 * Raw data is passed to the callback function, so you must use
 * JSON.parse([response].responseText) to extract values ([response] = the response)
 */
function loadRequest(url, callbackFunction) {
        var xhttp;
        var oauth_id = localStorage.getItem('access_token');
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callbackFunction(this);
            } else if (this.status == 401) {
                throw "401: Access token unauthorized"
                $(".content")[0].style.display = "none"
                $(".error")[0].style.display = "block"
            }
        };
        xhttp.ontimeout = function(e) {
            throw "Request timed out: " + url
        }
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Authorization", "Bearer " + oauth_id)
        xhttp.timeout = 10000
        xhttp.send();
    }

/**
 * Gets between 1 and 50 top songs over a six month period for current user.
 * Specified callback funtion gets passed along to loadRequest()
 */
function queryUserTopSongs(limit, callbackFunction) {
    if (limit > 50 || limit < 1) {
        throw "Invaild limit value"
    } else {
        var params = { "limit": limit };
        var url = "https://api.spotify.com/v1/me/top/tracks/?" + jQuery.param(params)
        loadRequest(url, callbackFunction)
    }
}

/**
 * Example callback function for testing purposes
 */
function callback(req) {
    console.log(JSON.parse(req.responseText))
}

/**
 * Gets audio features for the specified spotify track id (the returned "id" field in json, must be a string)
 * Specified callback funtion gets passed along to loadRequest()
 */
function queryTrackFeatures(track_id, callbackFunction) {
    var url = "https://api.spotify.com/v1/audio-features/" + track_id
    loadRequest(url, callbackFunction)
}

/**
 * Gets between 1 and 50 tracks in the playlist "United States Top 50"
 * Specified callback funtion gets passed along to loadRequest()
 */
function querySpotifyTopSongs(limit, callbackFunction) {
    if (limit > 50 || limit < 1) {
        throw "Invaild limit value"
    } else {
        var playlist_uri = "37i9dQZEVXbLRQDuF5jeBp"
        var params = { "limit": limit };
        var url = "https://api.spotify.com/v1/playlists/" + playlist_uri + "/tracks/?" + jQuery.param(params)
        loadRequest(url, callbackFunction)
    }
}

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
    obj.Distance = function(other) {
        return Math.sqrt(
            (this.acousticness - other.acousticness) ^ 2 +
            (this.danceability - other.danceability) ^ 2 +
            (this.energy - other.energy) ^ 2 +
            (this.instrumentalness - other.instrumentalness) ^ 2 +
            (this.liveness - other.liveness) ^ 2 +
            (this.loudness - other.loudness) ^ 2 +
            (this.valence - other.valence) ^ 2
        );
    }
    //Add the name of the song for convenience
    obj.name = name;
};

/**
 * Given the name of a song, this function will return a song object that contains all necessary features of the song.
 * This function makes a request to the SPOTIFY API and parses a song object out of that.
 * @param {string} name The name of the song to be gotten from spotify.
 */
export function song(name) {
    //TODO
};

/**
 * Returns a list of popular songs within spotify. Each song should be in the form of the song object.
 */
export function popularSongs() {
    //TODO
};

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