import * as SpotifyWebApi from "spotify-web-api-node";
import { config } from "../config";
import { updateSpotify } from "./websocketserver";

var scopes = ['user-read-playback-state'],
    redirectUri = config.redirect_url,
    clientId = config.spotify_clientId,
    clientSecret = config.spotify_clientSecret;

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
console.log(authorizeURL);

var authed = false;
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
                    spotifyApi.getMyCurrentPlaybackState()
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