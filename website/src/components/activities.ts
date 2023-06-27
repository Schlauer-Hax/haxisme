import { Grid, Entry, Vertical, BasicLabel, PlainText, Image, Box } from "webgen/mod.ts";
import { state } from "../data/state.ts";
import '../styles/devices.css';
import { HeavyReRender } from "shared/list.ts";

export function renderDiscordActivities() {
    return HeavyReRender(state.$discord, (it) => Grid(
        ...it.activities.map((ti) =>
            Entry(
                Grid(
                    Vertical(
                        PlainText(new Date(ti.timestamps?.start ?? 0).toLocaleString())
                            .setFont(1, 600)
                            .addClass("leading-text"),
                        BasicLabel({
                            title: ti.name,
                            subtitle: ti.details ?? "No Details",
                        }),
                    )
                ).addSuffix(ti.assets ? Image(`https://cdn.discordapp.com/app-assets/${ti.application_id}/${(ti.assets.small_image == null) ? ti.assets.large_image : ti.assets.small_image}.png`, "Discord Image") : Box()).addClass("discord-image")
                    .setRawColumns("auto 5.5rem")
            )
        )
    )
        .setGap("var(--gap)")
        .setEvenColumns(2)
    )
}