// const cheerio = require('cheerio');
const request = require('request');

console.log('panel.js here !!!');





console.log(chrome.devtools.inspectedWindow.getResources((resources) => {
    let res = resources.filter((el) => {
        return el.url.includes('/bundle.js');
    })
    request(res.url, (error, response, html) => {
        console.log(html);

      });
}));