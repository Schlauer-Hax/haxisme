import {Card, defaultCard, modernCard, span} from '@lucsoft/webgen';
import { registerEvent } from '../data/eventListener';

import '../styles/devices.css';
let activityData: [string, string, string, string][] = [
]

export const renderActivites = () => {

    const shell = span(undefined)

    const list = () => Card({  },
        ...activityData.map(data => {
            return modernCard({
                title: data[0],
                description: data[1],
                subtitle: data[2],
                icon: data[3]
            })
        })).draw();
    shell.innerHTML = "";
    shell.append(list());
    registerEvent((data: any) => {
        activityData = data.discord[0].filter((x: any) => x.name != "Custom Status" && x.name != "Spotify")
            .map((data: any) => [
                data.name,
                data.details ? data.details+' - '+data.state :data.type.toLowerCase(),
                new Date(data.timestamps.start).toLocaleString(),
                data.applicationID ? `https://cdn.discordapp.com/app-assets/${data.applicationID}/${data.assets.smallImage}.png` : ''
            ]);
        shell.innerHTML = "";
        shell.append(list())

    })
    return shell;
}
