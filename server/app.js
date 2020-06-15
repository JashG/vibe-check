const express = require('express');
const router = express.Router();
const cookie = require('cookie-parser');
const cors = require('cors');
// Application services
const spotify = require('spotify-web-api-node');
// Env
require('dotenv').config();

// Global variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3001/api/callback';
const STATE_KEY = 'spotify_auth_state';
const PORT = 3001;

const spotifyApi = new spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
})

const app = express();

const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use(cors()).use(cookie());

router.get('/', (req, res) => res.send('Hello world!'));

router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  const scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'user-read-recently-played'];

  res.cookie(STATE_KEY, state);

  console.log("auth url: ")
  console.log(spotifyApi.createAuthorizeURL(scopes, state));

  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

router.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    console.log('error in callback');
    res.redirect('/error/state mismatch');
  } else {
    res.clearCookie(STATE_KEY);
    console.log('proceed with callback');

    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { access_token, refresh_token } = data.body;

      console.log(data.body);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      // we can also pass the token to the browser to make requests from there
      res.redirect(`http://localhost:3000/profile/${access_token}/${refresh_token}`);
    }).catch(error => {
      res.redirect('http://localhost:3000/error/');
    })
  }
});

router.get('/profile', (req, res) => {
  spotifyApi.getMe().then(response => {
    response.body.responseType = 'profile';
    res.send(response.body);
  }).catch(error => {
    console.log(error);
    res.send(error);
  })
});

router.get('/playlists', (req, res) => {
  spotifyApi.getUserPlaylists().then(response => {
    response.body.responseType = 'playlists';
    res.send(response.body);
  }).catch(error => {
    console.log(error);
    res.send(error);
  })
});

router.get('/recently-played', (req, res) => {
  spotifyApi.getMyRecentlyPlayedTracks().then(response => {
    response.body.responseType = 'recently-played'
    res.send(response.body);
  }).catch(error => {
    console.log(error);
    res.send(error);
  })
});

router.get('/audio-features/:songId', (req, res) => {
  const songId = req.params.songId;
  if (songId) {
    spotifyApi.getAudioFeaturesForTrack(songId).then(response => {
      response.body.responseType = 'audio-features';
      res.send(response.body);
    }).catch(error => {
      res.send(error);
    });
  }
});

app.use('/api/', router);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));