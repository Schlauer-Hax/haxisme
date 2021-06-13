import { App, WebSocket } from 'uWebSockets.js';
import * as fs from 'fs';
import * as spotify from './spotify';
import { config } from '../config';
const service = App()

spotify

const createStatic = (path: string, location: string) => service.get(path, (res) => {
    const array = path.split('.');
    switch (path.split('.')[array.length - 1]) {
        case 'svg':
            res.writeHeader('Content-Type', 'image/svg+xml');
            break;
        case 'css':
            res.writeHeader('Content-Type', 'text/css');
            break;
    }

    res.end(fs.readFileSync(location));
})

createStatic('/', './public/index.html');

fs.readdirSync('./public/').filter(x => x != "index.html").forEach(x => {
    createStatic('/' + x, './public/' + x);
})

service.get('/callback/', (res, req) => {
    console.log(req.getQuery())
    const code = req.getQuery().replace("code=", "");
    console.log(code)
    spotify.auth(code)
    res.end();
})

service.get('/api/battery', (res, req) => {
    if (req.getQuery().split("password=")[1]==config.api_pw) {
        console.log(req.getQuery())
        const params: string[][] = req.getQuery().split('&').map(val=>val.split('='));
        const percent: number = Math.round(+params.filter(val => val[0]=='percentage')[0][1]);
        const name = params.filter(val => val[0]=='name')[0][1].split("%20").join(" ");
        updateAppleStatus(name, percent, undefined)
    }
    res.end();
})

service.get('/api/charging', (res, req) => {
    if (req.getQuery().split("password=")[1]==config.api_pw) {
        console.log(req.getQuery())
        const params: string[][] = req.getQuery().split('&').map(val=>val.split('='));
        const charging: boolean = params.filter(val => val[0]=='charging')[0][1]==='true';
        const name = params.filter(val => val[0]=='name')[0][1].split("%20").join(" ");
        updateAppleStatus(name, undefined, charging)
    }
    res.end();
})

let activeConnections: WebSocket[] = [];
export const setLastDiscordMessage = (message: any) => lastmessage.discord = message;

const devices = config.devices.map(device => {
    return {
        name: device,
        battery: 0,
        charging: false,
        time: 0
    }
})

let lastmessage = {
    discord: '',
    apple: devices,
    spotify: ''
};

export function updateSpotify(message: any) {
    lastmessage.spotify = message;
    updateAllSockets(lastmessage)
}

export function updateDiscord(message: any) {
    lastmessage.discord = message;
    updateAllSockets(lastmessage)
}

function updateAppleStatus(name: string, battery: number | undefined, charging: boolean | undefined) {
    lastmessage.apple = lastmessage.apple.map(device => {
        if (device.name==name) {
            if (battery)
            device.battery = battery;
            if (charging!=undefined)
            device.charging = charging;
            device.time = new Date().getTime()
        }
        return device;
    })
    updateAllSockets(lastmessage);
}

function updateAllSockets(message: any) {
    activeConnections.forEach(x => x.send(JSON.stringify(lastmessage)))
    lastmessage = message;
}

service.ws('/*', {
    close: (ws) => {
        activeConnections = activeConnections.filter(x => x != ws);
    },
    open: (ws) => {
        activeConnections.push(ws);
        ws.send(JSON.stringify(lastmessage));
        console.log(new TextDecoder("utf-8").decode(ws.getRemoteAddressAsText()) + ' connected to Websocket!')
    }
})
service.listen('0.0.0.0', 3000, (err) => {
    console.log(!err ? 'Failed to listen' : 'Listen on port 3000')
});