console.log('hook js');
console.log('hook: ',window.__REACT_DEVTOOLS_GLOBAL_HOOK__);

console.log('renderers: ',window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers);
let rid = Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers)[0];
console.log(rid, 'rid');

console.log('here: ',window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots[rid]);
let stateSet = window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots[rid];

let initialState;

stateSet.forEach((e) => {
    initialState = e;
});

console.log('initialState => current', initialState.current);
console.log('initialState => current => state.node', initialState.current.stateNode);
