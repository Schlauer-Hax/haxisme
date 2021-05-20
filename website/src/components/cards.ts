import { Card, modernCard, span } from '@lucsoft/webgen';
import { registerEvent } from '../data/eventListener';

import discordlogoonline from '../imgs/discord_online.svg';
import discordlogoidle from '../imgs/discord_idle.svg';
import discordlogodnd from '../imgs/discord_dnd.svg';
import discordlogooffline from '../imgs/discord_offline.svg';
import spotifylistening from '../imgs/spotify_listening.svg';

let status: string = 'online'
let discordlogo = discordlogoonline;

let spotifylogo = spotifylistening;
let spotifyname = "Not Playing";
let spotifydevice = "";

export const renderCards = () => {
    const shell = span(undefined)

    const list = () => Card({},
        modernCard({
            align: "right",
            icon: discordlogo,
            title: status.charAt(0).toUpperCase() + status.slice(1),
            subtitle: "Discord",
            description: "Add me: Hax#6775"
        }),
        modernCard({
            align: "right",
            icon: spotifylogo,
            title: spotifydevice,
            subtitle: "Spotify",
            description: spotifyname
        })
    ).draw()

    shell.innerHTML = "";
    shell.append(list());


    registerEvent((data: any) => {

        status = data.discord[1];

        switch (status) {
            case "online":
                discordlogo = discordlogoonline;
                break;
            case "idle":
                discordlogo = discordlogoidle;
                break;

            case "dnd":
                discordlogo = discordlogodnd;
                break;
            case "offline":
                discordlogo = discordlogooffline;
                break;
        }

        if (data.spotify.is_playing) {
            spotifylogo = data.spotify.item.album.images[0].url;
            spotifyname = data.spotify.item.name + " - " + data.spotify.item.artists.map((artist: any) => artist.name).join(', ');
            spotifydevice = data.spotify.device.name;
        } else {
            spotifylogo = spotifylistening;
            if (data.spotify.item) {
                spotifyname = "Last song: " + data.spotify.item.name + " - " + data.spotify.item.artists.map((artist: any) => artist.name).join(', ');
            }
            spotifydevice = "Playback Paused";
        }


        shell.innerHTML = "";
        shell.append(list())

    })
    return shell;
}
