import { custom, RenderElement } from '@lucsoft/webgen';

import '../styles/navigation.css';

const navigationElements = [
    { title: 'HaxIs.me', url: 'https://haxis.me' },
    { title: 'GitHub', url: 'https://github.com/Schlauer-Hax' },
    { title: 'BBN', url: 'https://bbn.one' },
    { title: 'Contact', url: 'mailto:mail@haxis.me' }
];

export const renderNavigation = (): RenderElement => ({
    draw: () => {
        const nav = custom('div', undefined, 'nav')
        navigationElements.forEach((x) => {
            const label = custom('a', x.title) as HTMLAnchorElement
            label.href = x.url
            nav.append(label)
        })
        return nav
    }
})