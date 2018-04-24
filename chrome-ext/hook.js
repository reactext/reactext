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
let checkReactDOM =  (reactDOM) => {
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





