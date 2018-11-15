
# fortnite-webapi
Lightweight, Self-hosted Fortnite JSON Web API based on [fortnite-api](https://github.com/qlaffont/fortnite-api) npm package.
# Self-hosted
There is a self-hosted and litte bit different version of this on my servers so, if you don't want to host it yourself, you can jsut sign up and use it. <br/><br/>
URL : https://fortnite-api.tresmos.xyz
# Install
#### Requirements

 - Node v6.0+
 - Epic Games account
 #### Setting Everything Up
 
 - Clone this repo.
 - Use `npm install` to install necessary modules.
- Open config.json file and replace  `Email` with Epic Games account email and `Password` with Epic Games account password. Be sure to disable two-factor sign in or you'll get an error.
- (Optional) Standard port is 3000 but you can change the port by editing config.json.
- Start it by typing `node app.js` and that should be it! You can access using `http://IP:3000` 
# Routes
#### /stats/:platform/:username - Player BR Stats
- `platform` : pc | ps4 | xb1
- `username` : Fortnite Username
##### Example Response
```json
{
   "group": {
      "solo": {
         "wins": 4,
         "top3": 0,
         "top5": 0,
         "top6": 0,
         "top10": 75,
         "top12": 0,
         "top25": 134,
         "k/d": "1.36",
         "win%": "0.85",
         "matches": 468,
         "kills": 629,
         "timePlayed": "37m",
         "killsPerMatch": "1.34",
         "killsPerMin": "17.00",
         "score": 63819
      },
      "duo": {
         "wins": 19,
         "top3": 0,
         "top5": 107,
         "top6": 0,
         "top10": 0,
         "top12": 261,
         "top25": 0,
         "k/d": "1.83",
         "win%": "2.56",
         "matches": 741,
         "kills": 1323,
         "timePlayed": "25m",
         "killsPerMatch": "1.79",
         "killsPerMin": "52.92",
         "score": 135441
      },
      "squad": {
         "wins": 44,
         "top3": 111,
         "top5": 0,
         "top6": 204,
         "top10": 0,
         "top12": 0,
         "top25": 0,
         "k/d": "1.99",
         "win%": "6.00",
         "matches": 733,
         "kills": 1372,
         "timePlayed": "4m",
         "killsPerMatch": "1.87",
         "killsPerMin": "343.00",
         "score": 150109
      }
   },
   "info": {
      "accountId": "39cdaa2a4d3a426eaea380ab5e561260",
      "username": "Tresmos",
      "platform": "pc"
   },
   "lifetimeStats": {
      "wins": 67,
      "top3s": 111,
      "top5s": 107,
      "top6s": 204,
      "top10s": 75,
      "top12s": 261,
      "top25s": 134,
      "k/d": "1.77",
      "win%": "3.45",
      "matches": 1942,
      "kills": 3324,
      "killsPerMin": "50.36",
      "timePlayed": "1h 6m",
      "score": 349369,
      "killsPerMatch": "1.71"
   }
}
```
#### /news - BR News
##### Example Response
```json
{
   "br": [
      {
         "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/battleroyalenews/v53/BR05_MOTD_Rifttogo-256x256-3bd010b63911f314abb0bba893a01dc49e1eec3c.png",
         "title": "Rift-To-Go - Coming Soon!\t",
         "body": "A rift you carry in your pocket! Teleport above your current location and glide down."
      },
      {
         "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/battleroyalenews/v52+HF/BR05_MOTD_50v50Velocity-256x256-d4abb0856462bac8199f4bae93e2ff0ee6566ea8.png",
         "title": "Soaring 50's LTM",
         "body": "Jump in and soar with re-deployable gliders in this new twist on the traditional 50v50 mode."
      },
      {
         "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/battleroyalenews/v53/BR05_MOTD_Venture-256x256-db1c277b88909e121402cd264d11e3f7d5697585.png",
         "title": "Venture Onward",
         "body": "Venture Gear and Raptor Outfit in the Item Shop now!"
      }
   ]
}
```
#### /status - Fortnite Server Status
##### Example Response
```json
{
   "boolean": true,
   "status": "Online"
}
```
#### /store - Fortnite BR Store
##### Example Response
```too long```
#### /pveinfo - Fortnite PVE Info
##### Example Response
```too long```
