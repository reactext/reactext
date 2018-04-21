
console.log('panel.js here !!!');




let hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
console.log(hook, 'here is the hook <----');
chrome.devtools.inspectedWindow.getResources((resources) => {
    console.log(resources, '<=== im the resources');
    let res = resources.filter((e) => {
        return e.url.includes('/bundle.js');
    });
    let url = res[0].url;
    console.log(url, '<=== url');

    const options = {
        //options for fetch go here
        'credentials': 'same-origin',
        headers:{
            'content-type': 'application/json',
        },
    }

    fetch(url, options)

    ///////////////////////////////////////////////////////////
    .then(res => {
        console.log('made it to the 1st .then');
        console.log(JSON.parse(res), 'here!!!');
        return res.json();
    })

    ///////////////////////////////////////////////////////////
    .then(data => {
        console.log('made it to 2nd .then');
        console.log(data);
    })

    ///////////////////////////////////////////////////////////
    .catch(err => {
        console.log('im the err from the catch', err);
    })
});





//if we gget request to work this will be the code
    // request(res.url, (error, response, html) => {
        //     // let $ = cheerio.load(html);
        //     console.log(html);
        //     // res.setHeader('Content-Type', 'application/json');

        //     // res.json($.html());
        //     // next();
        //   });