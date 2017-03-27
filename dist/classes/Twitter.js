'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Twitter = function () {
  /**
   * @param {string} consumerKey
   * @param {string} consumerSecret
   * @param {string} accessTokenKey
   * @param {string} accessTokenSecret
   * @param {string} screenName
   */
  function Twitter(consumerKey, consumerSecret, accessTokenKey, accessTokenSecret, screenName) {
    _classCallCheck(this, Twitter);

    this.screenName = screenName;
    this.client = new _twitter2.default({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret
    });
  }

  /**
   * Calls twitters API and gets tweets
   *
   * @return {Promise}
   */


  _createClass(Twitter, [{
    key: 'fetch',
    value: function fetch() {
      var _this = this;

      return new Promise(function (fulfill, reject) {
        _this.client.get('statuses/user_timeline', { screen_name: _this.screenName }, function (err, tweets, res) {
          if (err) reject(err);
          if (res.statusCode === 200) fulfill(tweets);
        });
      });
    }
  }]);

  return Twitter;
}();

exports.default = Twitter;