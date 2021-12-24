export type EventType = 'apple' | 'discord' | 'spotify' | 'audio';
const events: any[] = [];
export function registerEvent(event: any, type: EventType) {
    events.push([ event, type ]);
}

export function emitEvent(data: any, type: EventType) {
    events.forEach(element => {
        if (element[ 1 ] === type) {
            element[ 0 ](data)
        }
    });
}