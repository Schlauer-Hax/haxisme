import { custom, Button, draw, Component, Color } from '@lucsoft/webgen';
import { config } from '../../config';

export const renderSocialmedia = (): Component => ({
    draw: () => {
        const socialdiv = custom('div', undefined)
        config.links.map(link => {
            const button = draw(
                Button({
                    text: link.title,
                    href: link.url,
                    color: Color.Disabled
                }))
            socialdiv.appendChild(button)
        })
        return socialdiv
    }
})