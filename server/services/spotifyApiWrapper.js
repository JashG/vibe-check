const spotify = require('spotify-web-api-node');

class SpotifyApiWrapper {

  constructor(clientId, clientSecret, redirectUri) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;

    // Init Spotify API node client
    this.api = new spotify({
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: redirectUri
    });
  }

  getApi() {
    return this.api;
  }

  getUserProfile() {
    this.api.getMe().then(response => {
      console.log(response);
      return response;
    }).catch(error => {
      console.log(error);
      return null;
    });
  }

}

module.exports = SpotifyApiWrapper