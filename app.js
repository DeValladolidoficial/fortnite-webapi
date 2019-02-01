const Fortnite = require('fortnite-api')
const express = require('express')
const morgan = require('morgan')
const app = express()
const config = require('./config.json')
const pkg = require('./package.json')
const request = require('request')

app.use(morgan('combined'))

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

let fortniteAPI = new Fortnite(
  [
    config.email,
    config.password,
    config.clientLauncherToken,
    config.fortniteClientToken
  ], {
    debug: true
  }
)

app.get('/', function (req, res) {
  res.status(200).send(JSON.stringify({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    github: pkg.homepage,
    endpoints: pkg.endpoints
  }, null, 3))
})

app.get('/stats/:platform/:username', function (req, res) {
  fortniteAPI.login().then(() => {
    var username = req.params.username
    var platform = req.params.platform
    fortniteAPI
      .getStatsBR(username, platform, 'alltime')
      .then(stats => {
        res.status(200).send(JSON.stringify(stats, null, 3))
      })
      .catch(err => {
        res.status(400).send(JSON.stringify({'err': err}, null, 3))
      })
  })
})

app.get('/news', function (req, res) {
  var options = {
    url: 'https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game',
    headers: {
      'Accept-Language': 'en'
    }
  }
  request(options, (err, response, data) => {
    if (err) {
      console.log(err)
    } else {
      var parsed = JSON.parse(data)
      res.setHeader('Content-Type', 'application/json')
      res.status(200).send(JSON.stringify({
        br: [
          {
            image: parsed.battleroyalenews.news.messages[0].image,
            title: parsed.battleroyalenews.news.messages[0].title,
            adspace: parsed.battleroyalenews.news.messages[0].adspace,
            body: parsed.battleroyalenews.news.messages[0].body
          }, {
            image: parsed.battleroyalenews.news.messages[1].image,
            title: parsed.battleroyalenews.news.messages[1].title,
            adspace: parsed.battleroyalenews.news.messages[1].adspace,
            body: parsed.battleroyalenews.news.messages[1].body
          }, {
            image: parsed.battleroyalenews.news.messages[2].image,
            title: parsed.battleroyalenews.news.messages[2].title,
            adspace: parsed.battleroyalenews.news.messages[2].adspace,
            body: parsed.battleroyalenews.news.messages[2].body
          }],
         stw: [
        {
            image: parsed.savetheworldnews.news.messages[0].image,
            title: parsed.savetheworldnews.news.messages[0].title,
            adspace: parsed.savetheworldnews.news.messages[0].adspace,
            body: parsed.savetheworldnews.news.messages[0].body
          }, {
            image: parsed.savetheworldnews.news.messages[1].image,
            title: parsed.savetheworldnews.news.messages[1].title,
            adspace: parsed.savetheworldnews.news.messages[1].adspace,
            body: parsed.savetheworldnews.news.messages[1].body
          }]
      }, null, 5))
    }
  })
})

app.get('/status', function (req, res) {
  fortniteAPI.login().then(() => {
    fortniteAPI
      .checkFortniteStatus()
      .then(status => {
        if (status) {
          res.setHeader('Content-Type', 'application/json')
          res.status(200).send(JSON.stringify({'boolean': true, 'status': 'Online'}, null, 3))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.status(200).send(JSON.stringify({'boolean': false, 'status': 'Offline'}, null, 3))
        }
      })
      .catch(err => {
        res.setHeader('Content-Type', 'application/json')
        res.status(400).send(JSON.stringify({'err': err}, null, 3))
      })
  })
})

app.get('/pveinfo', function (req, res) {
  fortniteAPI.login().then(() => {
    fortniteAPI
      .getFortnitePVEInfo('en')
      .then(pveInfo => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(pveInfo)
      })
      .catch(err => {
        res.setHeader('Content-Type', 'application/json')
        res.status(400).send(JSON.stringify({'err': err}, null, 3))
      })
  })
})

app.get('/store', function (req, res) {
  fortniteAPI.login().then(() => {
    fortniteAPI
      .getStore('en')
      .then(store => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(store)
      })
      .catch(err => {
        res.setHeader('Content-Type', 'application/json')
        res.status(400).send(JSON.stringify({'err': err}, null, 3))
      })
  })
})

app.disable('etag')
app.listen(config.port) && console.log(`Listening on port ${config.port}!`)
