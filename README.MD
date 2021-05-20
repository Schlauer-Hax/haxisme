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

