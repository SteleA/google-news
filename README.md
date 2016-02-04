# Scrapes Google news

Uses ES6

`  
import googleNews from 'google-news';

googleNews({term: 'searchTerm', number: 10}, (err, news) => {
    if(err) throw new Error(err);
    console.log(news)
  });
`
