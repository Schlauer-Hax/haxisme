import { Button, ButtonStyle, Custom, Horizontal, PlainText, Spacer, createElement } from "webgen/mod.ts";

import '../styles/footer.css';

export function renderFooter() {
    const footer = createElement('footer');
    footer.append(PlainText("HaxIs.me – Copyright " + new Date().getFullYear()).draw());

    const button = Button('Imprint')
        .asLinkButton('https://bbn.music/p/imprint.html')
        .setStyle(ButtonStyle.Inline);

    return Horizontal(
        Custom(footer),
        Spacer(),
        button
    ).setMargin('0.5rem auto').setGap('1rem')
}