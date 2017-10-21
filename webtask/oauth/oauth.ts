const twitterConsumerKey = 'KEY';
const twitterConsumerSecret = 'SECRET';

const willGetOAuthAccessToken = async (twitterConsumerKey, twitterConsumerSecret) => new Promise<string>((resolve, reject) => {
  const { OAuth2 } = require('oauth');
  const oauth2 = new OAuth2(
    twitterConsumerKey,
    twitterConsumerSecret,
    'https://api.twitter.com/',
    null,
    'oauth2/token',
    null);

  oauth2.getOAuthAccessToken(
    '',
    { 'grant_type': 'client_credentials' },
    (e, access_token, refresh_token, results) => {
      if (!access_token) {
        return reject(new Error(`${results}, ${JSON.stringify(e)}`))
      }

      return resolve(access_token);
    });
})

// Twitter API
require('isomorphic-fetch')
const option = (token, method = 'GET') => ({
  method,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const user_timeline = (token, screen_name) =>
  fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screen_name}`, option(token))

const update = (token, status) =>
  fetch(`https://api.twitter.com/1.1/statuses/update.json?status=${status}`, option(token, 'POST'))

// Express
const express = require('express')
const app = express()

app.get('/', (req, res) =>
  willGetOAuthAccessToken(twitterConsumerKey, twitterConsumerSecret)
    .then(access_token => {
      update(access_token, 'Test!')
        //user_timeline(access_token, 'katopz')
        .then(response => response.json()
          .then(json => res.send(json)))
        .catch((err) => console.error(err.message));
    })
    .catch((err) => console.error(err.message))
)


// Export
const WebTask = require('webtask-tools')
module.exports = WebTask.fromExpress(app)