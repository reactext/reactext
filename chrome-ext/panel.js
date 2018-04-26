function do_something(msg) {
    console.log(msg, 'msgg');
    console.log(msg.data, 'with data')
    console.log(typeof msg.data, 'with data type ')

    ////start of the experiment////
    Object.keys(msg.data).forEach(componentName => {
        let value = msg.data[componentName];
        console.log(value, 'vallluuuuuuuuueeeeee');
        let title = document.createElement('h2');
        let section = document.createElement('div');
        title.innerText = componentName;

        let mainList = document.createElement('ul');

        Object.keys(value).forEach(propComp => {
            let mainListItem = document.createElement('li');

            if(typeof value[propComp] !== 'object' || (typeof value[propComp] === 'object' && value[propComp] === null)){
                mainListItem.innerText = `${propComp} : ${value[propComp]}`;
                console.log(value, 'I shouldnt be undefined!!!');
                console.log(propComp, 'i ALSO shouldnt be undefined ');
            }else{
                let subUl = document.createElement('ul');
                console.log('im the test 1', value);
                console.log('im the test 2', propComp);
                console.log('im the test 3', value[propComp]);
                Object.keys(value[propComp]).forEach(subpromp => {
                    let sublistItem = document.createElement('li');
                    sublistItem.innerText = `${subpromp} : ${value[propComp][subpromp]}`;
                    subUl.appendChild(sublistItem);
                });
                mainListItem.appendChild(subUl);
            }
            mainList.appendChild(mainListItem);
        });
        section.appendChild(title);
        section.appendChild(mainList);
        document.querySelector('#container').appendChild(section);
        console.log(document);

    });









    // Object.keys(msg.data).forEach((node) => {
    //     console.log(node,'im the node from panel');
    //     let stateObj = msg.data[node];
    //     //make sure we exclude any empty properties
    //     if (msg.data[node] !== null) {
    //         let div = document.createElement('div');
    //         let state = document.createElement('p');
    //         div.innerHTML = `<h2>${node}</h2>`;

    //         let list = document.createElement('ul');

    //         Object.keys(stateObj).forEach(e => {
    //             if(typeof stateObj[e] === 'object'){
    //                 let tempUl = document.createElement('ul');
    //                 Object.keys(stateObj[e]).forEach((el) => {
    //                     let tempLi = document.createElement('li');
    //                     tempLi.innerText = `${stateObj[e]} : ${stateObj[e][el]}`;
    //                     tempUl.appendChild(tempLi);
    //                 })
    //                 listItem.appendChild(tempUl);

    //             }else{
    //                 console.log(e, 'EEEEEEEEE');
    //                 let listItem = document.createElement('li');
    //                 listItem.innerText = `${e} : ${stateObj[e]}`;
    //                 list.appendChild(listItem);
    //             }
    //         });
    //         let container = document.querySelector('#container')
    //         console.log(container, 'container');
    //         div.appendChild(list);
    //         document.querySelector('#container').appendChild(div);
    //     }
    // });
}


document.documentElement.onclick = function () {
    // No need to check for the existence of `respond`, because
    // the panel can only be clicked when it's visible...
    respond('response from panel upon clicking :)');
};