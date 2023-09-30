import { Custom, PlainText, Vertical, createElement, custom } from 'webgen/mod.ts';
import '../styles/devices.css';
import { state } from "../data/state.ts";
import { HeavyReRender } from "shared/list.ts";

export function renderDevices() {
    return HeavyReRender(state.$apple, (it) => Vertical(
        ...it.map((ti) =>
            renderProgressBar(ti.name, ti.battery, ti.charging, ti.connection, ti.time)
        )
    ))
}

const renderProgressBar = (name: string, percent: number, charging: string, connection: string, timestamp: number) => {
    const date = new Date(timestamp);
    const time = Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).format(date)
    const background = custom('div', undefined, 'device-bar');
    const string = name + " - " + (charging === 'true' ? 'Charging at ' : '') + percent + "% - " + connection + ' - ' + time;
    const foreground = createElement("div");
    foreground.append(PlainText(string).draw())
    foreground.style.width = `${percent}%`;
    background.append(PlainText(string).draw(), foreground);
    return Custom(background);
}