
import { Button, ButtonStyle, Horizontal, Spacer } from "webgen/mod.ts";
import { config } from '../../config.ts';

export function renderSocials() {
    return Horizontal(
        Spacer(),
        config.links.map(link => {
            return Button(link.title)
                .asLinkButton(link.url)
                .setStyle(ButtonStyle.Secondary)
        }),
        Spacer(),
    ).setMargin('0.5rem').setGap('0.75rem');
}