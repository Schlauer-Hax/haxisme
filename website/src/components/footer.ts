import { span } from '@lucsoft/webgen';

import '../styles/footer.css';

export const renderFooter = () => ({
    draw: () => {
        const footer = span(undefined, 'footer');
        const right = span(undefined);
        right.innerHTML = `<a href="https://bbn.one/p/imprint.html">Imprint</a>`
        footer.append(span("HaxIs.me – Copyright 2022"), right);
        return footer;
    }
})
