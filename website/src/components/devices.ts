import { custom, RenderElement, span } from '@lucsoft/webgen';
import { registerEvent } from '../data/eventListener';

import '../styles/devices.css';

let batteryData: [string, number, number][] = []

export const renderDevices = (): RenderElement => ({
    draw: () => {
        const shell = span(undefined);

        registerEvent((data: any) => {
            batteryData = [];
            data.apple.forEach((device: any) => {
                batteryData.push([device.name, device.battery, device.time])
            })

            skillsArea.innerHTML = ''
            skillsArea.append(mySkills, ...batteryData.map(x => renderProgressBar(x[0], x[1], x[2])))

            shell.innerHTML = "";
            shell.append(skillsArea);
        })
        const skillsArea = custom('section', undefined, "skills-area");
        const mySkills = custom('h2', "MY DEVICES", 'my-skills')
        const renderProgressBar = (name: string, progress: number, timestamp: number) => {
            var date = new Date(timestamp);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            const background = custom('div', undefined, 'skill-bar');
            const foreground = custom('div', span(name + " - " + progress + "% - " + time))
            foreground.style.width = `${progress}%`;
            background.append(span(name + " - " + progress + "% - " + time), foreground)
            return background
        }

        shell.innerHTML = "";
        shell.append(skillsArea);
        return shell;
    }
})