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

const organizeState = (state) => {
    //passing in the children array
    // console.log(state, 'state');
    if (state.length >= 1) {
        state.forEach((child) => {
            // console.log(child, '<--- child');
            componentName = child.name;
            pageSetup[child.name] = child.state;
            if (child.children.length >= 1) {
                // console.log('child hit !')
                organizeState(child.children);
            }
        });
    }
}

/////////////////////////////////////////////////

///////////////temp/////////////////////
function stringifyData(obj) {
    let box = [];
    console.log(obj, 'objectttttt uauuuuudugheg')
    let data = JSON.parse(
        JSON.stringify(obj, (key, value) => {
            console.log('im the value',value);
            console.log('im the key',key);
            console.log('im the typeof',typeof value);
            if (typeof value === 'object' || typeof value === 'function'){
                if(value !== null){
                    console.log('im the value after the if.....', value);
                    if (box.indexOf(value) !== -1) {
                        return;
                    }
                    console.log('im getting pushed into box***', value);
                    box.push(value);
                }
            }
            if(typeof value === 'function'){
                value = value.toString();
            }
            return value;
        })
    );
    box = null;
    console.log('im the DATA from inside the stringigy func AT THE END', data);
    return data;
}


const transmitData = (state) => {
    // console.log('cache', state);
    // console.log('transmit', state);
    // create a custom event to dispatch for actions for requesting data from background
    console.log(state, 'im the state withough the stringifyData method');
    console.log(stringifyData(state), 'im the stringifyData method being used');
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
    console.log(instance, '<---instance')
    try {
        changes = await instance;
        currNestedState = await checkReactDOM(changes);
        organizeState(currNestedState.currentState[0].children);
        transmitData(pageSetup);
    } catch (e) {
        console.log(e);
    }
}