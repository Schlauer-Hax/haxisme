export type EventData = [activties: { name: string, type: string, emoji?: { name: string } }[], status: string];
export type EventType = (data: EventData) => void;
const events: EventType[] = [];
export function registerEvent(event: EventType) {
    events.push(event);
}

export function emitEvent(data: any) {
    events.forEach(element => element(data));
}