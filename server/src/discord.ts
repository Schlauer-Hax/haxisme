import { Client } from "discord.js";
import { config } from "../config";
import { updateDiscord } from "../app";


export function start() {
    let client = new Client();
    client.on('presenceUpdate', (_, newPresence) => {
        if (newPresence.user!.id == config.userid && newPresence!.guild!.id == config.guildId) {
            updateDiscord(([newPresence.activities, newPresence.status]));
        }
    })
    client.on('ready', () => {
        client.users.fetch(config.userid).then(({ presence }) => {
            updateDiscord([presence.activities, presence.status])
        })
    })
    client.login(config.token);
    return client;
}
