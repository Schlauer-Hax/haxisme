import { Card, modernCard, span } from '@lucsoft/webgen';
import { registerEvent } from '../data/eventListener';

import discordlogoonline from '../imgs/discord_online.svg';
import discordlogoidle from '../imgs/discord_idle.svg';
import discordlogodnd from '../imgs/discord_dnd.svg';
import discordlogooffline from '../imgs/discord_offline.svg';
import spotifylistening from '../imgs/spotify_listening.svg';

const progressbarStyle = (width: number, time: number) => `width: ${width}%;height: 10px;bottom: 0;position: absolute;transition:width linear ${time}s;background: #29d665;border-radius: 0.6rem;`

export const renderCards = () => {
    const space = span(undefined);

    const spotifycard = (logo: string, title: string, device: string) => {
        const element = Card({},
            modernCard({
                align: "right",
                icon: logo,
                title: device,
                subtitle: "Spotify",
                description: title
            })).draw();
            var progressbar = document.createElement('div');
            progressbar.setAttribute('style', progressbarStyle(0, 0));
            element.getElementsByTagName("card")[0].setAttribute('style', 'position: relative;');
            element.getElementsByTagName("card")[0].append(progressbar);
            return element.getElementsByTagName('card')[0];
        }

    const discordcard = (logo: string, title: string) =>
        Card({},
            modernCard({
                align: "right",
                icon: logo,
                title: title,
                subtitle: "Discord",
                description: "Add me: Hax#6775"
            })).draw().getElementsByTagName('card')[0];

    const cardlist = document.createElement('cardlist');
    cardlist.appendChild(discordcard(discordlogoonline, 'Online'));
    cardlist.appendChild(spotifycard(spotifylistening, 'No Data Received', 'Not Connected'));
    space.appendChild(cardlist);

    registerEvent((data: any) => {
        let discordlogo = discordlogoonline;
        const status = data.discord[1];
        switch (status) {
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

        cardlist.removeChild(cardlist.firstChild!);
        cardlist.insertBefore(discordcard(discordlogo, status.charAt(0).toUpperCase() + status.slice(1)), cardlist.firstChild);
    }, 'discord');

    registerEvent((data: any) => {
        let logo;
        let title;
        let device;

        let progressstart;
        let progresstime: any;

        if (data.spotify.is_playing) {
            title = data.spotify.item.name + ' - '
            if (data.spotify.item.album) {
                logo = data.spotify.item.album.images[0].url;    
                title += data.spotify.item.artists.map((artist: any) => artist.name).join(', ');
            } else if (data.spotify.item.show) {
                logo = data.spotify.item.show.images[0].url;
                title += data.spotify.item.show.publisher;
            }
            
            device = data.spotify.device.name;

            progressstart = (data.spotify.progress_ms / data.spotify.item.duration_ms) * 100;
            progresstime = data.spotify.item.duration_ms - data.spotify.progress_ms;
        } else {
            logo = spotifylistening;
            if (data.spotify.item) {
                if (data.spotify.item.album) {
                    title = `Last song: ${data.spotify.item.name} - ${data.spotify.item.artists.map((artist: any) => artist.name).join(', ')}`;
                } else if (data.spotify.item.show) {
                    title = `Last episode: ${data.spotify.item.name} - ${data.spotify.item.show.publisher}`;
                } else {
                    title = 'Paused';
                }
            } else {
                title = 'Paused';
            }
            device = "Playback Paused";

            progressstart = 0;
            progresstime = 0;
        }

        cardlist.removeChild(cardlist.lastChild!);
        cardlist.appendChild(spotifycard(logo, title, device));

        const progressbar = cardlist.lastElementChild?.getElementsByTagName('div')[1];
        if (progressbar) {
            progressbar.setAttribute('style', progressbarStyle(progressstart, progresstime/1000))
            setTimeout(() => {
                progressbar.setAttribute('style', progressbarStyle(100, progresstime/1000))
            }, 100)
        }
    }, 'spotify')

    return space;
}
