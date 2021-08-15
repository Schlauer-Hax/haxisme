import { custom, RenderElement, span } from '@lucsoft/webgen';
import { registerEvent } from '../data/eventListener';

import '../styles/devices.css';

let batteryData: [string, number, string, string, number][] = []

export const renderDevices = (): RenderElement => ({
    draw: () => {
        const shell = span(undefined);

        registerEvent((data: any) => {
            if (data.apple === '') return;
            
            batteryData = [];
            data.apple.forEach((device: any) => {
                batteryData.push([device.name, device.battery, device.charging, device.connection, device.time])
            })

            devicesArea.innerHTML = ''
            devicesArea.append(myDevices, ...batteryData.map(x => renderProgressBar(x[0], x[1], x[2], x[3], x[4])))

            shell.innerHTML = "";
            shell.append(devicesArea);
        }, 'apple')
        const devicesArea = custom('section', undefined, "devices-area");
        const myDevices = custom('h2', "MY DEVICES", 'my-devices')
        const renderProgressBar = (name: string, percent: number, charging: string, connection: string, timestamp: number) => {
            const date = new Date(timestamp);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const seconds = "0" + date.getSeconds();
            const time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            const background = custom('div', undefined, 'device-bar');
            const string = name + " - "+(charging==='true'?'Charging at ':'') + percent + "% - " + connection + ' - ' + time;
            const foreground = custom('div', span(string));
            foreground.style.width = `${percent}%`;
            background.append(span(string), foreground);
            return background;
        }

        shell.innerHTML = "";
        shell.append(devicesArea);
        return shell;
    }
})