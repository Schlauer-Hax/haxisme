import express from 'express';
import { config } from './config';
import expressWs from 'express-ws';
import { auth, getUrl } from './src/spotify';
import { start } from './src/discord';

const ew = expressWs(express());
const app = ew.app;
const port = 3000;

let lastmessage = {
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
    spotify: '',
    audio: {
        dB: 'No Data',
        last: 'No Data',
        duration: 'No Data'
    }
};

let olddata;
export function updateSpotify(message) {
    if (olddata) {
        if (message !== {} && message.item) {
            if (olddata.is_playing !== message.is_playing ||
                (olddata.item && olddata.item.id && message.item.id && olddata.item.id !== message.item.id) ||
                (message.is_playing && olddata.progress_ms / 1000 + 4 > message.progress_ms / 1000) ||
                (message.is_playing && olddata.progress_ms / 1000 < message.progress_ms / 1000 - 6)) {
                updateWebsockets({ spotify: message });
            }
        }
    } else updateWebsockets({ spotify: message });
    olddata = message;
    lastmessage.spotify = message;
}

export function updateDiscord(message) {
    lastmessage.discord = message;
    updateWebsockets({ discord: message });
}

function updateAudio(message) {
    lastmessage.audio = message;
    updateWebsockets({audio: message});
}

function updateWebsockets(message) {
    ew.getWss().clients.forEach(client =>
        client.send(JSON.stringify(message))
    );
}

app.get('/callback/', (req, res) => {
    auth(req.query.code);
    res.end();
})

app.get('/api/data', (req, res) => {
    const entries = Object.entries(req.query);
    if (req.query.password === config.api_pw) {
        const possibledevices = lastmessage.apple.filter(device => device.name === req.query.name);
        if (possibledevices.length===0) return
        const device = possibledevices[0];
        const index = lastmessage.apple.indexOf(device);
        entries.forEach(param => {
            if (Object.entries(device).filter(entry => entry[0] === param[0]).length === 1) {
                device[param[0]] = param[1]
            }
        })
        device.time = new Date().getTime()
        lastmessage.apple[index] = device;
        updateWebsockets({ apple: lastmessage.apple });
    }
    res.end()
})

app.get('/api/audio', (req, res) => {
    console.log(req.query)
    if (req.query.password === config.api_pw) {
        updateAudio({
            dB: Math.round(Number(req.query.dB))+' dB',
            last: req.query.last,
            duration: Math.round(Number(req.query.duration))+' min'
        })
    }
    res.end();
})

app.ws('/', (ws) => {
    ws.send(JSON.stringify(lastmessage));
});

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
    if (config.token) {
        const client = start()
        setTimeout(() =>
            client.users.fetch(config.userid).then(user => user.send(getUrl())), 1000);
    }
});
