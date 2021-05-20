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
    var code = req.getQuery().replace("code=", "");
    console.log(code)
    spotify.auth(code)
    res.end();
})

service.get('/api/battery', (res, req) => {
    if (req.getQuery().split("password=")[1]==config.api_pw) {
        console.log(req.getQuery())
        var percent: number = Math.round(+req.getQuery().replace("percentage=", "").split("&")[0]);
        var name = req.getQuery().split("name=")[1].split('&')[0].replace('%20', ' ').replace('%20', ' ');
        updateApplePercentage(name, percent)
    }
    res.end();
})

let activeConnections: WebSocket[] = [];
export const setLastDiscordMessage = (message: any) => lastmessage.discord = message;

let lastmessage = {
    discord: '',
    apple: [
        {
            name: "iPhone von Max",
            battery: 0,
            time: 0
        },
        {
            name: "iPad von Max",
            battery: 0,
            time: 0
        }
    ],
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

function updateApplePercentage(name: string, percent: number) {
    lastmessage.apple = lastmessage.apple.map(device => {
        if (device.name==name) {
            device.battery = percent;
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