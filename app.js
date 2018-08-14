const Fortnite = require('fortnite-api')
const express = require('express')
const morgan = require('morgan')
const app = express()
const config = require('./config.json')
const pkg = require('./package.json')

app.use(morgan('combined'))

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
  fortniteAPI.login().then(() => {
    fortniteAPI
      .getFortniteNews('en')
      .then(news => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(JSON.stringify({br: [
          {
            image: news.br[0].image,
            title: news.br[0].title,
            body: news.br[0].body
          }, {
            image: news.br[1].image,
            title: news.br[1].title,
            body: news.br[1].body
          }, {
            image: news.br[2].image,
            title: news.br[2].title,
            body: news.br[2].body
          }]}, null, 3))
      })
      .catch(err => {
        res.setHeader('Content-Type', 'application/json')
        res.status(400).send(JSON.stringify({'err': err}, null, 3))
      })
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
