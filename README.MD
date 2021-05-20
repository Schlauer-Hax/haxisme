# haxisme
This is the code for the Website on [haxis.me](https://haxis.me/).

## Building
1. Run `npm i` in both the website and the server directory.
2. Fill `config.ts` located in the server directory.
3. Run `npm run build` in the website directory.
4. Run `npm start` in the server directory.
5. Click the Spotify link in the console and sign in to Spotify.
6. Now the website is deployed at [localhost:3000](http://localhost:3000/). Have Fun!

## Sending Battery Levels to the Website (iOS)
1. Put your device names in `config.ts` in the server directory.
2. Create an iOS Shortcut sending a get request to `/api/battery` with a percentage parameter, 
   a name parameter and a password parameter containing your set password in your `config.ts`. 
   The link should look like this: `https://<yourdomain>/api/battery?percentage=<Battery Percentage>&name=Iphone%20X&password=<Password>`.
3. Create Automations to run the Shortcut every 30mins.

## Getting All Config Values
### Discord
#### Bot Token
1. Go to the [discord developer dashboard](https://discord.com/developers/applications/)
2. Create a new Application
3. Click on Bot
4. Create a new Bot
5. Click on Copy Token

#### User ID
1. Go into your Discord Settings
2. Go to Advanced
3. Turn on Developer Mode
4. Right-Click yourself
5. Click on `Copy ID`

#### Guild ID
1. Go back to the discord developer dashboard
2. Click on your Application
3. Click on OAuth2
4. Check the `bot` checkbox
5. Click on Copy
6. Open the copied link
7. Select your Server
8. Click on invite
9. With Developer Mode turned on (Step 1-3 from User ID instructions) right-click your guild and click on Copy ID

### Spotify
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
2. Create an App
3. Copy the shown Client ID and paste it into your config
4. Click on Show Client Secret and copy and paste it to your config
5. Click on Edit Settings
6. Add your redirect urls (Always `https://<yourdomain>/callback/`) and paste that url also in your config
7. Click on Save

### Api Password
Just generate a random Password, you'll need it when you want to send battery data to the website

### Devices
Type your exact Device Names used when sending Battery Data

