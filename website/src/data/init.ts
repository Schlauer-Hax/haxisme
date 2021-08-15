import { emitEvent, EventType } from "./eventListener";

export function startConnection() {
    const websocket = new WebSocket((location.protocol == 'http:' ? 'ws://' : 'wss://') + location.hostname + ':' + location.port);
    websocket.onmessage = (message) => {
        const json = JSON.parse(message.data);
        Object.keys(json).forEach(key => {
            const data = json[key];
            if (data !== '') {
                emitEvent({[key]: json[key]}, key as EventType)
            }
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