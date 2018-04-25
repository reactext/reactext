//start of vars and main logic
const rid = Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers)[0];
const stateSet = window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots[rid];
let pageSetup = {};
let firstStatePull;
stateSet.forEach((e) => {
    firstStatePull = e;
});

////////////////
///functions////
////////////////
const checkReactDOM =  (reactDOM) => {
    //current state will be an array of all the caches.
    let data = {currentState: null}
    let cache = [];

    if(reactDOM){
        traverseAndGatherReactDOM(reactDOM.current, cache);
    }else{
        return;
    }

    data.currentState = cache;

    return data;
}

///////////////////////////////////////
const traverseAndGatherReactDOM =  (node, cache) => {

    let component = {
        id:null,
        name:'',
        state:null,
        props:null,
        children:[],
        store:null,
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
    if(state.length >= 1){
        state.forEach((child) => {
            // console.log(child, '<--- child');
            componentName = child.name;
            pageSetup[child.name] = child.state;
            if(child.children.length >= 1){
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
    let data = JSON.parse(
      JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (box.indexOf(value) !== -1) {
            return;
          }
          box.push(value);
        }
        return value;
      }));
    box = null;
    return data;
  }


const transmitData = (state) => {
    // console.log('cache', state);
    // console.log('transmit', state);
    // create a custom event to dispatch for actions for requesting data from background
    console.log(state, 'original');
    console.log(JSON.stringify(state), 'stringified');
    const customEvent = new CustomEvent('ReacText', { detail: { data: stringifyData(state) } });
    window.dispatchEvent(customEvent);
}

/////////////////////////////////////////////////

/////////////////
///Main Logic////
/////////////////

let nestedState = checkReactDOM(firstStatePull.current.stateNode);
organizeState(nestedState.currentState[0].children);

console.log('bout to transmit...')
transmitData(pageSetup);

/////console logs to make sure stuff is working properly/////
console.log('hook.js');
// console.log(rid, 'rid');
// console.log('nestedState: ',nestedState);
console.log('pageSetup: ', pageSetup);