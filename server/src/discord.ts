import { updateDiscord } from "../app.ts";
import config from "../config.json" with { type: "json" };
import { Client, Presence } from 'https://deno.land/x/harmony@v2.8.0/mod.ts'


export async function startBot() {
    const client = new Client({
        intents: [
            'GUILDS',
            'GUILD_PRESENCES',
        ],
        token: config.token,
    })

    client.on('ready', async () => {
        console.log("Successfully connected to gateway");
        (await client.guilds.get(config.guildId))!.presences.get(config.userid).then((x) => {
            const activities = []
            if (x) {
                for (const activity of x.activities) {
                    if (activity.type == 2 || activity.type == 4) continue;
                    activities.push(activity)
                }
                updateDiscord({ activities, status: x.status })
            }
        })
    })

    client.on('presenceUpdate', (prs: Presence): void => {
        if (prs.user.id === config.userid) {
            const activities = []
            for (const activity of prs.activities) {
                if (activity.type == 2 || activity.type == 4) continue;
                activities.push(activity)
            }
            updateDiscord({ activities, status: prs.status })
        }
    })

    await client.connect()
    return client;
}