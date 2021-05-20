import { Client } from "discord.js";
export function start(token) {
    let client = new Client();
    client.on('ready', () => {
    });
    client.login(token);
}
