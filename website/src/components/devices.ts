import { custom, RenderElement, span } from '@lucsoft/webgen';
import { registerEvent } from '../data/eventListener';

import '../styles/devices.css';

let batteryData: [string, number, boolean, string, number][] = []

export const renderDevices = (): RenderElement => ({
    draw: () => {
        const shell = span(undefined);

        registerEvent((data: any) => {
            batteryData = [];
            data.apple.forEach((device: any) => {
                batteryData.push([device.name, device.battery, device.charging, device.connection, device.time])
            })

            skillsArea.innerHTML = ''
            skillsArea.append(mySkills, ...batteryData.map(x => renderProgressBar(x[0], x[1], x[2], x[3], x[4])))

            shell.innerHTML = "";
            shell.append(skillsArea);
        })
        const skillsArea = custom('section', undefined, "skills-area");
        const mySkills = custom('h2', "MY DEVICES", 'my-skills')
        const renderProgressBar = (name: string, percent: number, charging: boolean, connection: string, timestamp: number) => {
            const date = new Date(timestamp);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const seconds = "0" + date.getSeconds();
            const time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            const background = custom('div', undefined, 'skill-bar');
            const string = name + " - "+(charging?'Charging at ':'') + percent + "% - " + connection + ' - ' + time;
            const foreground = custom('div', span(string));
            foreground.style.width = `${percent}%`;
            background.append(span(string), foreground);
            return background;
        }

        shell.innerHTML = "";
        shell.append(skillsArea);
        return shell;
    }
})