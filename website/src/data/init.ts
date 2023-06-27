import { State } from "webgen/mod.ts";
import { state } from "../data/state.ts";

export function startConnection() {
    const websocket = new WebSocket(`${location.protocol == 'http:' ? 'ws://' : 'wss://'}${location.hostname}:8000/api/ws`);
    websocket.onmessage = (message) => {
        const json = JSON.parse(message.data);

        Object.keys(json).forEach(key => {
            const data = json[ key ];
            if (data !== '')
                (state as any)[ key ] = State(data);
        })
    };
    websocket.onopen = () => {
        console.log('Connected');
    }
    websocket.onclose = () => {
        setTimeout(() => {
            startConnection();
        }, 5000);
        console.log('Closed');
    }
}