import SpotifyWebApi from "spotify-web-api-node";
import * as config from "../config.json";
import { updateSpotify } from "../app";

const spotifyApi = new SpotifyWebApi({
    redirectUri: config.redirect_url,
    clientId: config.spotify_clientId,
    clientSecret: config.spotify_clientSecret
});

export function getUrl() {
    return spotifyApi.createAuthorizeURL(['user-read-playback-state']);
}

let authed = false;
export function auth(code) {
    if (!authed) {
        authed = true;

        spotifyApi.authorizationCodeGrant(code).then(
            function (data) {
                console.log('The token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                console.log('The refresh token is ' + data.body['refresh_token']);

                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);

                setInterval(() => {
                    // Get Information About The User's Current Playback State
                    spotifyApi.getMyCurrentPlaybackState({additional_types: 'track,episode'})
                        .then(function (data) {
                            // Output items
                            updateSpotify(data.body)
                        }, function (err) {
                            console.log('Something went wrong!', err);
                        });
                }, 5000);

                setInterval(() => {
                    spotifyApi.refreshAccessToken().then(
                        function (data) {
                            console.log('The access token has been refreshed!');

                            // Save the access token so that it's used in future calls
                            spotifyApi.setAccessToken(data.body['access_token']);
                        },
                        function (err) {
                            console.log('Could not refresh access token', err);
                        }
                    );
                }, 3600000)
            })
    }
}