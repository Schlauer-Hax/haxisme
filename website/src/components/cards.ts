import {Card, modernCard, span} from '@lucsoft/webgen';
import {registerEvent} from '../data/eventListener';

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
let spotifyprogress = 0;
let spotifyid = '';

const progressbarStyle = (width: number) => 'width: '+width+'%;height: 10px;bottom: 0;position: absolute;transition:width 5s;-moz-transition:width 5s;-webkit-transition:width 5s;-o-transition:width 5s;background: green;border-radius: 0.6rem;'

export const renderCards = () => {
    const shell = span(undefined)

    const list = () => {
        var element = Card({},
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
        ).draw();
        var progressbar = document.createElement('div');
        progressbar.setAttribute('style', progressbarStyle(0));
        element.getElementsByTagName("card")[1].setAttribute('style', 'position: relative;');
        element.getElementsByTagName("card")[1].append(progressbar);
        return element;
    }
    //shell.innerHTML = "";
    //shell.append(list());


    registerEvent((data: any) => {

        if (status != data.discord[1]) {
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

            shell.innerHTML = "";
        }

        if (data.spotify.is_playing) {
            if (spotifyid!=data.spotify.item.id) {
                spotifylogo = data.spotify.item.album.images[0].url;
                spotifyname = data.spotify.item.name + " - " + data.spotify.item.artists.map((artist: any) => artist.name).join(', ');
                spotifydevice = data.spotify.device.name;
                spotifyid = data.spotify.item.id;
                spotifyprogress = 0;
                shell.innerHTML = "";
            } else {
                spotifyprogress = data.spotify.progress_ms / data.spotify.item.duration_ms * 100
            }
        } else {
            spotifylogo = spotifylistening;
            if (data.spotify.item) {
                spotifyname = "Last song: " + data.spotify.item.name + " - " + data.spotify.item.artists.map((artist: any) => artist.name).join(', ');
            }
            spotifydevice = "Playback Paused";
            spotifyprogress = 0;
            shell.innerHTML = '';
        }


        if (shell.innerHTML == "")
        shell.append(list())

        var progressbar: HTMLDivElement | null = document.querySelector("body > article > span:nth-child(3) > cardlist > card:nth-child(2) > div:nth-child(4)")
        if (progressbar) {
            progressbar.setAttribute('style', progressbarStyle(spotifyprogress))
        }

    })
    return shell;
}
