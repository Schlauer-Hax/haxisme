import { custom, img } from '@lucsoft/webgen';
import { config } from '../../config';

import Memoji from '../imgs/memoji.png';

import '../styles/opener.css'

export const renderOpener = () => ({
    draw: () => {
        const opener = custom('div', undefined, "opener");

        const imageContainer = document.createElement('div');

        const images = [ 'image' ].map(x => {
            const image = img('img', Memoji, x);
            image.src = Memoji;
            image.height = 280;
            image.width = 280;
            return image;
        })

        imageContainer.append(...images);
        opener.append(imageContainer);

        opener.append(custom('h1', config.title, "opener-text"));
        return opener;
    }
})