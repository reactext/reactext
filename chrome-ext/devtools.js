//NOTES:
// This script is ran as soon as the chrome devtools is open.
console.log("hello from devtools");

//create the initial panel.
chrome.devtools.panels.create(
    "Reactext",
    "icon.png",
    "devtools.html",  //html that is injected into the tab's content
    function (panel) {  //panel returns a panel object panel: {"onShown":{},"onHidden":{},"onSearch":{}}
        console.log(`from the panel CB... panel: ${JSON.stringify(panel.onShow)}`);
    });


////////////////////////////////////////////////////////////////////////

//This pulls the recousrces that build the page.
//This gets the url for the bundle.

chrome.devtools.inspectedWindow.getResources((resources) => {
    console.log(resources, '<=== im the resources');
    let res = resources.filter((e) => {
        return e.url.includes('/bundle.js');
    });
    let url = res[0].url;
    console.log(url, '<=== url');


///////////////
/////fetch/////
///////////////
//NOTES: fetch doesnt seem to work properly to get data

    // const options = {
    //     //options for fetch go here
    //     'credentials': 'same-origin',
    //     headers:{
    //         'content-type': 'application/json',
    //     },
    // }

    // fetch(url, options)

    // ///////////////////////////////////////////////////////////
    // .then(res => {
    //     console.log(JSON.parse(res), 'here!!!');
    //     return res.json();
    // })

    // ///////////////////////////////////////////////////////////
    // .then(data => {
    //     console.log('made it to 2nd .then');
    //     console.log(data);
    // })

    // ///////////////////////////////////////////////////////////
    // .catch(err => {
    //     console.log('im the err from the catch', err);
    // })


});
