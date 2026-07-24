import { Custom, custom, img } from "webgen/mod.ts";
import { config } from '../../config.ts';
import Memoji from '../../static/memoji.png';
import '../styles/opener.css'
import { renderTrainyStats } from "./trainy.ts";

export function renderOpener() {
    const opener = custom('div', undefined, "opener");

    const imageContainer = custom('div', undefined, "opener-image");

    const images = [ 'image' ].map(x => {
        const image = img('img', Memoji, x);
        image.src = Memoji;
        image.height = 280;
        image.width = 280;
        return image;
    })

    imageContainer.append(...images);
    opener.append(imageContainer);

    const textColumn = custom('div', undefined, "opener-column");
    textColumn.append(custom('h1', config.title, "opener-text"));
    textColumn.append(renderTrainyStats().draw());
    opener.append(textColumn);
    return Custom(opener);
}