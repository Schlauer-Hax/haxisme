import { emitEvent } from "./eventListener";

export function startConnection() {
    const websocket = new WebSocket((location.protocol == 'http:' ? 'ws://' : 'wss://') + location.hostname +':'+ location.port);
    websocket.onmessage = (message) => {
        emitEvent(JSON.parse(message.data))
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