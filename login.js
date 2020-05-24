var stateKey = 'spotify_auth_state_1';

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

document.getElementById('login-button').addEventListener('click', function() {

    var client_id = '911197d2501945e0b7ef24b6ee2b5f1e'; // Unique client id for MoodSwings
    //var redirect_uri = 'http://localhost:8888/rec.html'; // Test redirect uri
    var redirect_uri = 'https://jcinqueg.github.io/MoodSwings/rec';

    var state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-library-read user-top-read';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    url += '&show_dialog=' + false;

    window.location = url;
}, false);