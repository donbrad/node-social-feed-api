import request from 'request';
import API from './API';

export default class Instagram {
  /**
   * @param {string} clientId
   * @param {string} clientSecret
   * @param {string} redirectURI
   */
  constructor(clientId, clientSecret, redirectURI) {
    this.data = {
      clientId,
      clientSecret,
      redirectURI,
      accessToken: null,
    };
  }

  /**
   * Generates an access token from instagram. Access tokens live forever.
   * BEST PRACTICE: log the access token and then store it in your env file.
   * Then you never have to call this method again.
   *
   * @param {string} code
   * @return {Promise}
   */
  initialize(code) {
    // If someway, somehow this is already set (which it shouldn't be at this point)
    if (this.data.accessToken !== null) return Promise.resolve(this.data.accessToken);
    return new Promise((fulfill, reject) => {
      request.post('https://api.instagram.com/oauth/access_token', {
        form: {
          client_id: this.data.clientId,
          client_secret: this.data.clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: this.data.redirectURI,
          code,
        },
      }, (err, response, body) => {
        if (err || response.statusCode >= 400) {
          reject(err || body);
        } else {
          fulfill(body);
        }
      });
    });
  }

  /**
   * Calls instagram's api and gets user's latest posts
   *
   * @param {string} accessToken
   * @return {Promise}
   */
  fetch(accessToken) {
    return new Promise((fulfill, reject) => {
      request(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`, (err, response, body) => {
        if (err || response.statusCode >= 400) {
          reject({
            source: 'instagram',
            error: err || body,
          });
        } else {
          fulfill(API.normalize('instagram', JSON.parse(body).data));
        }
      });
    });
  }
}
