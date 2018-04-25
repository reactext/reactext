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


document.documentElement.onclick = function () {
    // No need to check for the existence of `respond`, because
    // the panel can only be clicked when it's visible...
    respond('response from panel upon clicking :)');
};