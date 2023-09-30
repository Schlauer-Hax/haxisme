import { Custom, custom, img } from "webgen/mod.ts";
import { config } from '../../config.ts';
import Memoji from '../../static/memoji.png';
import '../styles/opener.css'

export function renderOpener() {
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
    return Custom(opener);
}