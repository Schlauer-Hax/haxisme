import { custom, RenderElement, Button } from '@lucsoft/webgen';

const links = [
    { title: 'Discord', url: 'https://discord.gg/nPwjaJk' },
    { title: 'GitHub', url: 'https://github.com/Schlauer-Hax' },
    { title: 'Instagram', url: 'https://www.instagram.com/haxhd/' },
    { title: 'Twitter', url: 'https://twitter.com/Hax6775' }
];

export const renderSocialmedia = (): RenderElement => ({
    draw: () => {
        const socialdiv = custom('div', undefined)
        const button = Button({
            big: true,
            list: links.map(link => {
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