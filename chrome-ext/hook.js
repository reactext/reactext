//start of vars and main logic
const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
const rid = Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers)[0];
const stateSet = window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots[rid];
let pageSetup = {};
let firstStatePull;
let changes;
let currNestedState;

stateSet.forEach((e) => {
    firstStatePull = e;
});
// console.log('ORIGINAL DATA TO WORK WITH ', firstStatePull);
////////////////
///functions////
////////////////
const checkReactDOM = (reactDOM) => {
    //current state will be an array of all the caches.
    let data = {
        currentState: null



    }
    let cache = [];

    if (reactDOM) {
        traverseAndGatherReactDOM(reactDOM.current, cache);
    } else {
        return;
    }

    data.currentState = cache;

    return data;
}

///////////////////////////////////////
const traverseAndGatherReactDOM = (node, cache) => {
    let component = {
        id: null,
        name: '',
        state: null,
        props: null,
        children: [],
        store: null,
    };

    if (node._debugID) {
        component.id = node._debugID
    }

    if (node.type) {
        if (node.type.name) {
            component.name = node.type.name;
        } else {
            component.name = node.type || 'Default';
        }
    }

    if (node.memoizedState) {
        component.state = node.memoizedState;
    }

    // redux store
    if (node.type) {
        if (node.type.name === 'Provider') {
            reduxStore15 = node.stateNode.store.getState();
        }
    }

    if (node.memoizedProps) {
        // component.props = stringifyData(node.memoizedProps)
        component.props = node.memoizedProps;
    }

    //if the current node has a child it runs it the function again on them
    if (node.child !== null) {
        traverseAndGatherReactDOM(node.child, component.children);
    }

    //if the current node has siblings it runs the function agin on them
    if (node.sibling !== null) {
        traverseAndGatherReactDOM(node.sibling, cache);
    }

    cache.push(component);
}
/////////////////////////////////////////////////

const organizeState = (state, providerSymbols = []) => {
    //passing in the children array
    if (state.length >= 1) {
        state.forEach((child) => {
            if (typeof child.name === 'string') {
                componentName = child.name;
                pageSetup[child.name] = {};
                pageSetup[child.name].state = child.state;
                pageSetup[child.name].children = [];
                let tempChild = child;

                while (tempChild){
                    tempChild.children.forEach(obj => {
                        // if need more data for tree do below
                        if (typeof obj.name === 'string' && obj.name !== 'div' && obj.name !== 'img' && obj.name !== 'h1' && obj.name !== 'h3' && obj.name !== '') { 
                        pageSetup[child.name].children.push(obj.name);
                        }
                    })
                    tempChild = tempChild.children[0];
                }

                if (child.children[0]) {
                    let providerOrConsumer = String(child.children[0].name['$$typeof']);
                    if (providerOrConsumer !== 'undefined') {
                        if (providerOrConsumer === 'Symbol(react.provider)') {
                            //get providers tracker symbol and add to providerSymbol [];
                            let subArr = [];
                            subArr.push(child.name, child.children[0].name.tracker)
                            providerSymbols.push(subArr);
                            pageSetup[child.name].tracker = child.children[0].name.tracker;
                            pageSetup[child.name].provider = true;
                            pageSetup[child.name].contextValue = child.children[0].props.value;
                        } else {
                            //get consumer's tracker symbol and run it against providerSymbol array
                            //set myProvider = name of provider that has same tracker symbol.
                            let trackerId = [];
                            let consumerId = []
                            let currentChild = child.children[0];
                            while(currentChild.name.tracker){
                                consumerId.push(currentChild.name.tracker);
                                currentChild = currentChild.children[0];
                            }

                            providerSymbols.forEach(arr => {
                                if(consumerId.includes(arr[1])){
                                  trackerId.push(arr[0]);

                                    pageSetup[child.name].tracker = trackerId;
                                }
                            });

                            pageSetup[child.name].consumer = true;
                        }
                    }
                }
            }


            if (child.children.length >= 1) {
                organizeState(child.children, providerSymbols);
            }

        });
    }
}

/////////////////////////////////////////////////

///////////////temp/////////////////////
function stringifyData(obj) {
    let data = JSON.parse(
        JSON.stringify(obj, (key, value) => {
            if (typeof value === 'function') {
                value = value.toString();
            }

            return value;
        })
    )
    return data;
}


const transmitData = (state) => {
    const customEvent = new CustomEvent('ReacText', {
        detail: {
            data: stringifyData(state)
        }
    });
    window.dispatchEvent(customEvent);
}

/////////////////////////////////////////////////

/////////////////
///Main Logic////
/////////////////

let nestedState = checkReactDOM(firstStatePull.current.stateNode);

///////////////////////////////TESTING//////////////////////////////




///////////////////////////////TESTING//////////////////////////////

organizeState(nestedState.currentState[0].children);
transmitData(pageSetup);

//////////////////////
///Changes to State///
//////////////////////

// Monkey patch into devTools object in React devTools
(function connectReactDevTool() {
    devTools.onCommitFiberRoot = ((original) => {
        return (...args) => {

            getStateChanges(args[1]);
            return original(...args);
        };
    })(devTools.onCommitFiberRoot);
}());

//getStatChanges takes in an instance and
async function getStateChanges(instance) {
    try {
        changes = await instance;
        currNestedState = await checkReactDOM(changes);
        organizeState(currNestedState.currentState[0].children);
        transmitData(pageSetup);
    } catch (e) {
    }
}