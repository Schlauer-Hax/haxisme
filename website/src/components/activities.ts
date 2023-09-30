import { Grid, Entry, Vertical, BasicLabel, Image, Box, Label } from "webgen/mod.ts";
import { state } from "../data/state.ts";
import '../styles/devices.css';

export function renderDiscordActivities() {
    return state.$discord.map(it => Grid(
        ...it.activities.map((ti) =>
            Entry(
                Grid(
                    Vertical(
                        Label(new Date(ti.timestamps?.start ?? 0).toLocaleString())
                            .setFont(1, 600)
                            .addClass("leading-text"),
                        BasicLabel({
                            title: ti.name,
                            subtitle: ti.details ?? "No Details",
                        }),
                    )
                ).addSuffix(ti.assets ? Image(`https://cdn.discordapp.com/app-assets/${ti.application_id}/${ti.assets.small_image ?? ti.assets.large_image}.png`, "Discord Image") : Box()).addClass("discord-image")
                    .setRawColumns("auto 5.5rem")
            )
        )
    )
        .setGap("var(--gap)")
        .setEvenColumns(2)
    ).asRefComponent();
}