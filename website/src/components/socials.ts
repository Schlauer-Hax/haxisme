
import { Button, ButtonStyle, Grid, Horizontal, Spacer } from "webgen/mod.ts";
import { config } from '../../config.ts';

export function renderSocials() {
    return Horizontal(
        Spacer(),
        Grid(...config.links.map(link => {
            return Button(link.title)
                .asLinkButton(link.url)
                .setStyle(ButtonStyle.Secondary)
                .setJustify('center')
        })).setEvenColumns(config.links.length).setGap('var(--gap)'),
        Spacer(),
    );
}