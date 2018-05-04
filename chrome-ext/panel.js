function do_something(msg) {

    //Loop over object to add component names to divs
    Object.keys(msg.data).forEach(componentName => {
        let value = msg.data[componentName];
        let title = document.createElement('h2');
        let section = document.createElement('div');
        title.innerText = componentName;
        let mainList = document.createElement('ul');


    Object.keys(value).forEach(propComp => {
        let mainListItem = document.createElement('li');
        if(typeof value[propComp] !== 'object' || (typeof value[propComp] === 'object' && value[propComp] === null)){
            mainListItem.innerText = `${propComp} : ${value[propComp]}`;
        }else if(Array.isArray(value[propComp])){
            mainListItem.innerText = `${propComp} : ${value[propComp]}`;
        }
        else{
            let subUl = document.createElement('ul');
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
    
    });
}

function do_somethingElse(msg) {
    let keys = Object.keys(msg)
    keys.forEach((curr, ind) => {
        if (curr !== "stateHasChanged") {
            let div2 = document.createElement('div');
            div2.innerHTML = `<h2>${curr}</h2>`;
            div2.style.color = "green";
            let state = document.createElement('div');
            let obj = msg[curr];
            state.innerHTML =  `${obj.propName} was ${obj.prev} and is now ---> ${obj.curr}`;
            div2.appendChild(state);
            let container = document.querySelector('#container')
            document.querySelector('#container').appendChild(div2);
        }
    })
}

document.documentElement.onclick = function () {
    // No need to check for the existence of `respond`, because
    // the panel can only be clicked when it's visible...
    respond('response from panel upon clicking :)');
};