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
console.log('ORIGINAL DATA TO WORK WITH ', firstStatePull);
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
    // console.log('IM THE NODE!!!!',node);
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
            // console.log(child, '<--- child');
            if (typeof child.name === 'string') {

                componentName = child.name;
                pageSetup[child.name] = {};
                pageSetup[child.name].state = child.state;
                // console.log(pageSetup);
                // console.log(child.children, 'right here!!');
                if (child.children[0]) {
                    let providerOrConsumer = String(child.children[0].name['$$typeof']);
                    // console.log('Should be here !!!!', providerOrConsumer);
                    // console.log('Should be here !!!!', typeof providerOrConsumer);
                    if (providerOrConsumer !== 'undefined') {
                        // console.log('adding to the object!!!');
                        if (providerOrConsumer === 'Symbol(react.provider)') {
                            //get providers tracker symbol and add to providerSymbol [];
                            let subArr = [];
                            subArr.push(child.name, child.children[0].name.tracker)
                            providerSymbols.push(subArr);

                            pageSetup[child.name].trackerStrign = 'Hello world!!'
                            pageSetup[child.name].tracker = child.children[0].name.tracker;
                            pageSetup[child.name].provider = true;
                            pageSetup[child.name].contextValue = child.children[0].props.value;
                            // console.log(child.children[0].props.value, 'hello look here <+++++++++ provider vlaue');
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

                            // console.log(consumerId, 'im the consumer Id');
                            providerSymbols.forEach(arr => {
                                if(consumerId.includes(arr[1])){


                                    // console.log('IT WORKS MOTHAFUCKA!!!!', arr[0]);
                                    trackerId.push(arr[0]);
                                }
                            });

                            pageSetup[child.name].tracker = trackerId;
                            pageSetup[child.name].trackerStrign = 'Hello world!!'
                            pageSetup[child.name].consumer = true;
                        }
                    }
                }
            }


            if (child.children.length >= 1) {
                // console.log('child hit !')
                organizeState(child.children, providerSymbols);
            }

        });
    }
    // console.log(providerSymbols, '<====providerSymbols');
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
    console.log(data, 'this is after data has been changed');
    return data;
}


const transmitData = (state) => {
    // console.log(state, 'im state in the transmit data func');
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
console.log(nestedState.currentState[0].children[0], 'lokie here');

let ProviderSymbol_ProviderONE        = nestedState.currentState[0].children[0].children[0].children[0].name.$$typeof;
let ContextSymbol_ProviderONE         = nestedState.currentState[0].children[0].children[0].children[0].name.context.$$typeof;

let ProviderSymbol_Phillip            = nestedState.currentState[0].children[0].children[0].children[0].children[0].children[0].name.$$typeof;
let ContextSymbol_Phillip             = nestedState.currentState[0].children[0].children[0].children[0].children[0].children[0].name.context.$$typeof;

let ProviderSymbol_Radio              = nestedState.currentState[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].name.Provider.$$typeof;
let ContextSymbol_Radio               = nestedState.currentState[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].name.Consumer.$$typeof;

///////////////////////////////TESTING//////////////////////////////


// console.log( ProviderSymbol_ProviderONE === ContextSymbol_Radio, 'WHY IS THIS TRUE?')


///////////////////////////////TESTING//////////////////////////////

organizeState(nestedState.currentState[0].children);
console.log(pageSetup, 'im the page setup right before transmiting ');
transmitData(pageSetup);

//////////////////////
///Changes to State///
//////////////////////

// Monkey patch into devTools object in React devTools
(function connectReactDevTool() {
    devTools.onCommitFiberRoot = ((original) => {
        return (...args) => {
            // console.log(args, 'im the args from inside monkey patch');

            getStateChanges(args[1]);
            return original(...args);
        };
    })(devTools.onCommitFiberRoot);
}());

//getStatChanges takes in an instance and
async function getStateChanges(instance) {
    // console.log(instance, '<---instance')
    try {
        changes = await instance;
        currNestedState = await checkReactDOM(changes);
        organizeState(currNestedState.currentState[0].children);
        transmitData(pageSetup);
    } catch (e) {
        // console.log(e);
    }
}