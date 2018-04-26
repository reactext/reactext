function do_something(msg) {
    console.log(msg, 'msgg');
    console.log(msg.data, 'with data')
    console.log(typeof msg.data, 'with data type ')

    Object.keys(msg.data).forEach((node) => {
        let stateObj = msg.data[node];
        //make sure we exclude any empty properties
        if (msg.data[node] !== null) {
            let div = document.createElement('div');
            let state = document.createElement('p');
            div.innerHTML = `<h2>${node}</h2>`;

            let list = document.createElement('ul');

            Object.keys(stateObj).forEach(e => {
                let listItem = document.createElement('li');
                listItem.innerText = `${e} : ${stateObj[e]}`;
                list.appendChild(listItem);
            });
            let container = document.querySelector('#container')
            console.log(container, 'container');
            div.appendChild(list);
            document.querySelector('#container').appendChild(div);
        }
    });
}

function do_somethingElse(msg) {
    let keys = Object.keys(msg)
    keys.forEach((curr, ind) => {
        if (curr !== "stateHasChanged") {
            let div2 = document.createElement('div');
            div2.innerHTML = `<h2>${curr}</h2>`;
            let state = document.createElement('div');
            console.log(msg[curr], '<------------CURRRR');
            let obj = msg[curr];
            state.innerHTML =  `Blah was ${obj.prev} and is now ${obj.curr}`;
            div2.appendChild(state);
            let container = document.querySelector('#container')
            document.querySelector('#container').appendChild(div2)

            // let list = document.createElement('ul');

            // Object.keys(msg[curr]).forEach(e => {
            //     console.log("EEEEEEEEEEEE", msg[curr][e])
            //     let listItem = document.createElement('li');
            //     listItem.innerText = `${e} : ${msg[curr][e]}`;
            //     list.appendChild(listItem);
            // });
            // let container = document.querySelector('#container')
            // console.log(container, 'container');
            // div.appendChild(list);
            // document.querySelector('#container').appendChild(div)
        }
        console.log("Values in obj in devtools", curr + " associated value " + JSON.stringify(msg[curr]))
    })
    console.log("Hi, how's it going form panel.js do something else")

}

document.documentElement.onclick = function () {
    // No need to check for the existence of `respond`, because
    // the panel can only be clicked when it's visible...
    respond('response from panel upon clicking :)');
};