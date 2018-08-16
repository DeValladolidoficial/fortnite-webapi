
# fortnite-webapi
Lightweight, Self-hosted Fortnite JSON Web API based on [fortnite-api](https://github.com/qlaffont/fortnite-api) npm package.
# Self-hosted
There is a self-hosted and litte bit different version of this on my servers so, if you don't want to host it yourself, message me on Discord to get an api key. Tresmos#9705 <br/><br/>
URL : https://fortnite-api.tresmos.xyz
# Install
#### Requirements

 - Node v6.0+
 - Epic Games account
 - Fiddler 4
 #### Setting Everything Up
 
 - Clone this repo.
 - Use `npm install` to install necessary modules.
 - Install and launch Fiddler 4
-   Go in to `Tools > Options > HTTPS` then enable `Capture HTTPS CONNECTs` and `Decrypt HTTPS traffic`
-   Start your Epic Games launcher.
-   You will see a request with /account/api/oauth/token. Click on it then go in to Inspectors to get the header (Authorization header)
- Open config.json file and replace `YourClientLauncherToken` with the token you get from Fiddler 4 but don't include `basic` at the front.
- Open config.json file again and replace  `Email` with Epic Games account email and `Password` with Epic Games account password. Be sure to disable two-factor sign in or you'll get an error.
- (Optional) Standard port is 3000 but you can change the port by editing config.json.
- Start it by typing `node app.js` and that should be it! You can access using `http://IP:3000` 
# Routes
#### /stats/:platform/:username - Player BR Stats
- `platform` : pc | ps4 | xb1
- `username` : Fortnite Username
#### /news - BR News
#### /status - Fortnite Server Status
#### /store - Fortnite BR Store
#### /pveinfo - Fortnite PVE Info
