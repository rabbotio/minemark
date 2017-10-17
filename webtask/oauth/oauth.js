var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var twitterConsumerKey = 'RlLbTDcVvvDjKsiygbwuf4cTv';
var twitterConsumerSecret = 'y4JAKA0evhrvBgixnXrbPLKLatnfjkJtPi3Md8hgLuTxiDlvEu';
var willGetOAuthAccessToken = function (twitterConsumerKey, twitterConsumerSecret) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var OAuth2 = require('oauth').OAuth2;
                var oauth2 = new OAuth2(twitterConsumerKey, twitterConsumerSecret, 'https://api.twitter.com/', null, 'oauth2/token', null);
                oauth2.getOAuthAccessToken('', { 'grant_type': 'client_credentials' }, function (e, access_token, refresh_token, results) {
                    if (!access_token) {
                        return reject(new Error(results + ", " + JSON.stringify(e)));
                    }
                    return resolve(access_token);
                });
            })
            // Twitter API
        ];
    });
}); };
// Twitter API
require('isomorphic-fetch');
var option = function (token, method) {
    if (method === void 0) { method = 'GET'; }
    return ({
        method: method,
        headers: {
            Authorization: "Bearer " + token
        }
    });
};
var user_timeline = function (token, screen_name) {
    return fetch("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + screen_name, option(token));
};
var update = function (token, status) {
    return fetch("https://api.twitter.com/1.1/statuses/update.json?status=" + status, option(token, 'POST'));
};
// Express
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    return willGetOAuthAccessToken(twitterConsumerKey, twitterConsumerSecret)
        .then(function (access_token) {
        update(access_token, 'Test!')
            .then(function (response) { return response.json()
            .then(function (json) { return res.send(json); }); })
            .catch(function (err) { return console.error(err.message); });
    })
        .catch(function (err) { return console.error(err.message); });
});
// Export
var WebTask = require('webtask-tools');
module.exports = WebTask.fromExpress(app);
