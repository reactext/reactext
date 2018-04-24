// const cheerio = require('cheerio');
const request = require('request');

console.log('panel.js here !!!');





console.log(chrome.devtools.inspectedWindow.getResources((resources) => {
    let res = resources.filter((el) => {
        return el.url.includes('/bundle.js');
    })
    
    console.log(res.url)
    request(res.url, (error, response, html) => {
        // let $ = cheerio.load(html);
        console.log(html);
        // res.setHeader('Content-Type', 'application/json');
    
        // res.json($.html()); 
        // next();
      });
}));