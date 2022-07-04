import { Component, custom } from '@lucsoft/webgen';
import { config } from '../../config';

import '../styles/navigation.css';

export const renderNavigation = (): Component => ({
    draw: () => {
        const nav = custom('div', undefined, 'nav')
        config.navigationElements.forEach((x) => {
            const label = custom('a', x.title) as HTMLAnchorElement
            label.href = x.url
            nav.append(label)
        })
        return nav
    }
})