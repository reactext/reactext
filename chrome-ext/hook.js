console.log('hook js');
// console.log('hook: ',window.__REACT_DEVTOOLS_GLOBAL_HOOK__);

// console.log('renderers: ',window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers);
let rid = Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers)[0];
console.log(rid, 'rid');

// console.log('here: ',window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots[rid]);
let stateSet = window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots[rid];

let initialState;

stateSet.forEach((e) => {
    initialState = e;
});

// console.log('initialState => current', initialState.current);
// console.log('initialState => current => state.node', initialState.current.stateNode);


let checkReactDOM = (reactDOM) => {
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



let traverseAndGatherReactDOM = (node, cache) => {

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
initialState = checkReactDOM(initialState.current.stateNode);
console.log(initialState,'HERE IT IS !!!' )