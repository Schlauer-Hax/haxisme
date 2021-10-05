import { custom, RenderElement, Button } from '@lucsoft/webgen';
import { config } from '../../config';

export const renderSocialmedia = (): RenderElement => ({
    draw: () => {
        const socialdiv = custom('div', undefined)
        const button = Button({
            big: true,
            list: config.links.map(link => {
                return {
                    text: link.title,
                    onclick: () => {
                        window.open(link.url)
                    }
                }
            })
        }).draw()
        socialdiv.appendChild(button)
        return socialdiv
    }
})