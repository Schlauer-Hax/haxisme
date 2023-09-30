import config from "./config.json" assert { type: "json" };
import { startBot } from "./src/discord.ts";
import { getRedirectURL, auth } from "./src/spotify.ts";
import { serveDir } from "std/http/file_server.ts";

const lastmessage = {
    discord: '',
    apple: config.devices.map(device => {
        return {
            name: device,
            battery: '0',
            charging: 'false',
            connection: 'NaN',
            time: 0
        }
    }),
    spotify: ''
};

const connections: WebSocket[] = [];

let oldData: any;
export function updateSpotify(message: any) {
    if (oldData) {
        if (message.item) {
            if (oldData.is_playing !== message.is_playing ||
                (oldData.item && oldData.item.id && message.item.id && oldData.item.id !== message.item.id) ||
                (message.is_playing && oldData.progress_ms / 1000 + 4 > message.progress_ms / 1000) ||
                (message.is_playing && oldData.progress_ms / 1000 < message.progress_ms / 1000 - 6)) {
                pushWebsockets({ spotify: message });
            }
        }
    } else pushWebsockets({ spotify: message });
    oldData = message;
    lastmessage.spotify = message;
}

export function updateDiscord(message: any) {
    if (lastmessage.discord === message) return;
    lastmessage.discord = message;
    pushWebsockets({ discord: message });
}

function pushWebsockets(message: any) {
    connections.forEach(client =>
        client.send(JSON.stringify(message))
    );
}

async function startEverything() {
    const client = await startBot()
    setTimeout(() =>
        client.users.fetch(config.userid).then(user => user.send(`${config.url}/api/spotify/redirect`)), 1000);
}
await startEverything();

await Deno.serve({ port: 8080 }, async (rsp) => {
    const url = new URL(rsp.url)
    if (url.pathname == "/api/ws") {
        const { response, socket } = Deno.upgradeWebSocket(rsp);
        connections.push(socket);
        socket.onopen = () =>
            socket.send(JSON.stringify(lastmessage));
        socket.onclose = () =>
            connections.splice(connections.indexOf(socket), 1);

        return response;
    } else if (url.pathname == "/api/spotify/redirect") {
        return new Response("", { statusText: "Redirecting", status: 302, headers: { "Location": getRedirectURL() } });
    } else if (url.pathname == "/api/spotify/callback") {
        const code = url.searchParams.get("code");
        if (code) {
            await auth(code);
            return new Response("", { statusText: "Redirecting", status: 302, headers: { "Location": config.url } });
        } else {
            return new Response("Missing Auth Code. Please try again!", { statusText: "No code", status: 400 });
        }
    } else if (url.pathname == "/api/battery") {
        const entries = url.searchParams;
        if (entries.get("password") === config.api_pw) {
            const possibledevices = lastmessage.apple.filter(device => device.name === entries.get("name"));
            if (possibledevices.length === 0) return new Response("Device not found", { statusText: "Device not found", status: 404 });
            const device = possibledevices[ 0 ];
            const index = lastmessage.apple.indexOf(device);
            device.battery = entries.get("percentage") || device.battery;
            device.connection = entries.get("connection") || device.connection;
            device.charging = entries.get("charging") || device.charging;
            device.time = new Date().getTime()
            lastmessage.apple[ index ] = device;
            pushWebsockets({ apple: lastmessage.apple });
            return new Response("OK", { statusText: "OK", status: 200 });
        }
        return new Response("Unauthorized", { statusText: "Unauthorized", status: 401 });
    }
    return serveDir(rsp, {
        fsRoot: "./dist",
    });
}).finished;