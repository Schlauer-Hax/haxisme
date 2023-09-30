import config from "../config.json" assert { type: "json" };
import { updateSpotify } from "../app.ts";

export function getRedirectURL() {
    const params = new URLSearchParams();
    params.append("client_id", config.spotify_clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", `${config.url}/api/spotify/callback`);
    params.append("scope", "user-read-playback-state");

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

let authed = false;
let refreshToken = "";
let accessToken = "";
export async function auth(code: string) {
    if (!authed) {
        authed = true;

        const token = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(config.spotify_clientId + ":" + config.spotify_clientSecret),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                "grant_type": "authorization_code",
                code,
                "redirect_uri": `${config.url}/api/spotify/callback`
            })
        }).then(x => x.json())

        refreshToken = token.refresh_token;
        accessToken = token.access_token;

        setInterval(() => {
            fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + btoa(config.spotify_clientId + ":" + config.spotify_clientSecret),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    "grant_type": "refresh_token",
                    "refresh_token": refreshToken
                })
            }).then(x => x.json()).then(x => {
                accessToken = x.access_token;
            })
        }, 3600000)

        setInterval(() => {
            fetch("https://api.spotify.com/v1/me/player", {
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            }).then(x => x.json()).then(x => {
                updateSpotify(x)
            })
        }, 5000)
    }
}