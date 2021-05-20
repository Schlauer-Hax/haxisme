import { emitEvent } from "./eventListener";

export function startConnection() {
    const websocket = new WebSocket('wss://' + location.hostname);
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