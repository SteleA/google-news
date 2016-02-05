'use strict'

var request = require('request');
var cheerio = require('cheerio');


const googleNews = ({ number = 10, term = ''}, cb) => {
  request.get(`https://www.google.com/search?num=${number}&tbm=nws&q=${term}`, (err, response, html) => {
    if(err) return cb(err);

    const $       = cheerio.load(html);
    let newsArr   = [];

     $('.g').each(function(i, news){

      const image   = $(news).find('img').attr('src');
      const url     = $(news).find('a').attr('href').substring(7).split('&sa')[0];
      const title   = $(news).find('h3').text();
      const source  = $(news).find('h3').next().text().split('-')[0];
      const time    = $(news).find('h3').next().text().split('-')[1];
      const desc    = $(news).find('h3').next().next().text();

      newsArr       = [ {image, url, title, source, time, desc} , ...newsArr];

    });

    return cb(null, newsArr);

  });
};


module.exposts = googleNews;
