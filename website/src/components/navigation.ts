import { config } from '../../config.ts';
import { Button, ButtonStyle, Component, Custom, Horizontal, Spacer, createElement } from "webgen/mod.ts";

const Nav = (component: Component) => {
    const nav = createElement("nav");
    nav.append(component.draw());
    return Custom(nav);
};

export function DynaNavigation() {
    return [
        Nav(
            Horizontal(
                Button(config.title)
                    .asLinkButton("/")
                    .setStyle(ButtonStyle.Inline)
                    .setMargin("0 auto 0 0"),
                Spacer(),
                ...config.navigationElements.map(({ title, url }) =>
                    Button(title)
                        .asLinkButton(url)
                        .setStyle(ButtonStyle.Inline)
                ),
            )
                .setMargin("0.5rem auto")
                .setGap("1rem"),
        )
    ];
}