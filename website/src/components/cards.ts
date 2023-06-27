import DC_Online from '../../static/discord_online.svg';
import DC_Idle from '../../static/discord_idle.svg';
import DC_DND from '../../static/discord_dnd.svg';
import DC_Offline from '../../static/discord_offline.svg';
import Spotify_Listening from '../../static/spotify_listening.svg';
import Spotify_Not_Listening from '../../static/spotify_notlistening.svg';
import '../styles/cards.css';
import { BasicLabel, Custom, Entry, Grid, Image, PlainText, Pointer, Vertical, asPointer, createElement, ref } from "webgen/mod.ts";
import { HeavyReRender } from "shared/list.ts"
import { state } from "../data/state.ts";

const discordIcons = {
    "online": DC_Online,
    "idle": DC_Idle,
    "dnd": DC_DND,
    "offline": DC_Offline,
};

type DiscordIcons = keyof typeof discordIcons;

export function renderDiscordStatus() {
    return Entry(
        Grid(
            Vertical(
                PlainText("discord")
                    .setFont(1, 600)
                    .addClass("leading-text"),
                BasicLabel({
                    title: ref`${state.discord.$status.map(it => it.toUpperCase())}`,
                    subtitle: "Add me: hax6775"
                })
            )
        ).addSuffix(
            HeavyReRender(state.$discord
                .map(({ status }) => discordIcons[ <DiscordIcons>status ]), icon =>
                Image(icon, "Discord Status Image")
                    .addClass("discord-image")
            )
        ).setRawColumns("auto 5rem")
    )
}

function Progress(progress: Pointer<number>, length: Pointer<number>) {
    return Custom((() => {
        const element = createElement("div");
        element.setAttribute("style", `height: 10px;inset: 0;top: unset;position: absolute;background: #29d665;border-radius: 0.6rem;`);
        progress.listen(val => {
            element.style.width = val + "%";
            const resetVal = element.style.transitionDuration;
            element.style.transitionDuration = "0s";
            setTimeout(() => {
                element.style.transitionDuration = resetVal;
            }, 500);
        });
        const animation = element.animate([
            // {
            //     composite:
            // }
        ])
        // animation.
        length.listen(val => {
            element.style.transitionDuration = `${val}s`;
        })
        return element;
    })());
}

export function renderSpotify() {
    const POGress = asPointer(0);
    const duration = asPointer(100);
    state.$spotify.listen(it => {
        if (it == "loading") return 'Loading';

        POGress.setValue((it.progress_ms / it.item.duration_ms) * 100);
        duration.setValue((it.item.duration_ms - it.progress_ms) / 1000);
    })
    return Entry(
        Vertical(
            Grid(
                Vertical(
                    PlainText("spotify")
                        .setFont(1, 600)
                        .addClass("leading-text"),
                    BasicLabel({
                        title: state.$spotify.map((it) => {
                            if (it == "loading") return 'Loading';
                            if (it.is_playing == false) return 'Playback Paused';

                            if ("album" in it.item) {
                                return `${it.item.name} - ${it.item.artists.map((artist: any) => artist.name).join(', ')}`;
                            } else if ("episode" in it.item) {
                                return `${it.item.name} - ${it.item.show.publisher}`;
                            } else {
                                return "Error while Loading"
                            }
                        }),
                        subtitle: ref`${state.$spotify.map(it => it != "loading"
                            ? it.is_playing ? "Listening on " + it.device.name
                                : ("album" in it.item) ? `Last Song: ${it.item.name} - ${it.item.artists.map((artist: any) => artist.name).join(', ')}` : `Last Episode: ${it.item.name} - ${it.item.show.publisher}`
                            : "Loading"
                        )}`
                    }),
                )
            )
                .addSuffix(
                    HeavyReRender(state.$spotify.map((it) => {
                        if (it == "loading")
                            return Spotify_Listening
                        if (it.is_playing == false)
                            return Spotify_Not_Listening
                        if ("album" in it.item)
                            return it.item.album.images[ 1 ].url
                        if ("episode" in it.item)
                            return it.item.show.images[ 1 ].url
                    }), it => Image(it, "Spotify Image")).addClass("spotify-image"))
                .setRawColumns("auto 5rem"),
            Progress(POGress, duration)
        )
    )
}

export function renderCards() {
    return Grid(
        renderDiscordStatus(),
        renderSpotify()
    )
        .setEvenColumns(2)
        .setGap("var(--gap)")
}