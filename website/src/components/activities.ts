import { Card, defaultCard, span } from '@lucsoft/webgen';
import { registerEvent } from '../data/eventListener';

import '../styles/devices.css';
let activityData: [string, string][] = [
]

export const renderActivites = () => {

    const shell = span(undefined)

    const list = () => Card({ minColumnWidth: 24 },
        ...activityData.map(name => {
            return defaultCard({
                title: name[0],
                subtitle: name[1],
                small: true
            })
        })).draw();
    shell.innerHTML = "";
    shell.append(list());
    registerEvent((data: any) => {

        activityData = data.discord[0].filter((x: any) => x.name != "Custom Status" && x.name != "Spotify").map((data: any) => [data.name, 'playing']);
        shell.innerHTML = "";
        shell.append(list())

    })
    return shell;
}
