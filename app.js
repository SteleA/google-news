'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var googleNews = function googleNews(_ref, cb) {
  var _ref$number = _ref.number;
  var number = _ref$number === undefined ? 10 : _ref$number;
  var _ref$term = _ref.term;
  var term = _ref$term === undefined ? '' : _ref$term;

  _request2['default'].get('https://www.google.com/search?num=' + number + '&tbm=nws&q=' + term, function (err, response, html) {
    if (err) return cb(err);

    var $ = _cheerio2['default'].load(html);
    var newsArr = [];

    $('.g').each(function (i, news) {

      var image = $(news).find('img').attr('src');
      var url = $(news).find('a').attr('href').substring(7).split('&sa')[0];
      var title = $(news).find('h3').text();
      var source = $(news).find('h3').next().text().split('-')[0];
      var time = $(news).find('h3').next().text().split('-')[1];
      var desc = $(news).find('h3').next().next().text();

      newsArr = [{ image: image, url: url, title: title, source: source, time: time, desc: desc }].concat(_toConsumableArray(newsArr));
    });

    return cb(null, newsArr);
  });
};

exports['default'] = googleNews;
module.exports = exports['default'];
