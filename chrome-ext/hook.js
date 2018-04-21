console.log("Innnnn hooooookkkkk!!!!!!!")

//access React devTools in hook.js page
const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
console.log("devTools in hook.js", devTools);

const reactInstances = devTools._renderers;
console.log("reactInstances in hook.js", reactInstances);

const rid = Object.keys(reactInstances)[0];
const reactInstance = reactInstances[rid];

let fiberDOM;
let currState;
let initialState;
let reduxStore15;
let runFifteen = false;

//get initial state and only run once
const getInitialStateOnce = () => {
    console.log("getInitialStateOnce is running")
    let run = false;
    return function getInitialState() {
        if (!run) {
            //grab initial state set from _REACT__DEVTOOLS__GLOBAL__HOOK
            let initStateSet = devTools._fiberRoots[rid];
            //save object within set to global variable initialState
            initStateSet.forEach((item) => {
                initialState = item;
                console.log(initialState, "<------initialState")
            });
            // parse state
            console.log("initialState before cRDOM", initialState.current.stateNode)
            initialState = checkReactDOM(initialState.current.stateNode);
            run = true;
            console.log("initialState after cRDOM", initialState);
        }
    };
};

// set initial state
const setInitialStateOnce = getInitialStateOnce();
(function setInitialState() {
    if (reactInstance && reactInstance.version) {
        // get initial state for 16 or higher
        console.log("setInitial State is running ")
        setInitialStateOnce();
        setTimeout(() => {
            console.log('initial state: ', initialState)
            transmitData(initialState);
        }, 100);
        // }  else if (reactInstance && reactInstance.Mount) {
        //     // get initial state for 15
        //     console.log('getting intial state for 15')
        //     getFiberDOM15();
    } else {
        console.log("React Dev Tools is not found")
    }
}());

// // convert data to JSON for storage
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

alert('here comes iffe')

// // Monkey patch to listen for state changes
(function connectReactDevTool() {
    // Error if React Developer Tools is not installed
    if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        console.log('React Developer Tools must be installed for Reactext');
        return;
    } else if (!reactInstance) {
        // Error if React app is not detected
        console.log('React not detected.');
        return;
    }

    
    // for react16 or 16+
    if (reactInstance && reactInstance.version) {
        //insert getFiberDOM16 function into native onCommitFiberRoot built-in React DevTools method
        devTools.onCommitFiberRoot = (function (original) {
            return function (...args) {
                console.log('line 99')
                getFiberDOM16(args[1]);
                console.log('line 101')
                return original(...args);
            };
            console.log('line 104')
        }(devTools.onCommitFiberRoot));

        // } else if (reactInstance && reactInstance.Mount) {
        //     // lower than React 16
        //     reactInstance.Reconciler.receiveComponent = (function (original) {
        //         return function (...args) {
        //             if (!runFifteen) {
        //                 runFifteen = true;
        //                 setTimeout(() => {
        //                     getFiberDOM15(); // here you are getting the data from the DOM
        //                     runFifteen = false;
        //                 }, 10);
        //             }
        //             return original(...args);
        //         };
        //     }(reactInstance.Reconciler.receiveComponent));

    }
}());

// //for React 15
// async function getFiberDOM15() {
//   // console.log("getFiberDOM15 is running")
//   try {
//     currState = await parseData();
//     // don't send if state is null
//     transmitData(currState);
//   } catch (e) {
//     console.log(e);
//   }
// }

// // parse data from React 15
// async function parseData(components = []) {
//   let root = reactInstance.Mount._instancesByReactRootID[1]._renderedComponent;
//   traverseFifteen(root, components);
//   // console.log(components)
//   let data = { currentState: components };
//   return data;
// }

//for React 16+
async function getFiberDOM16(instance) {
    console.log('heyyyyyyyyyyyyyyyyyy')
    alert("getFiberDOM16 is running")
    try {
        fiberDOM = await instance;
        currState = await checkReactDOM(fiberDOM);
        console.log("currState in getFiberDOM", currState)
        transmitData(currState);
    } catch (e) {
        console.log(e);
    }
}

//Parse Data for React 16+
function checkReactDOM(reactDOM) {
    console.log("checkReactDOM is running")
    let data = { currentState: null };
    let cache = [];
    if (reactDOM) {
        // console.log(reactDOM.current);
        traverseSixteen(reactDOM.current, cache); // maybe there is no need to use stateNode.current
    } else {
        return;
    }
    console.log('cache in cRDOM', cache)
    data.currentState = cache;
    data.currentState[0].store = reduxStore15;
    console.log('Store with Hierarchy: ', data);
    return data;
}

// //All the traversing algorithims below
// // traverse React 15
// function traverseFifteen(node, cache) {
//   let targetNode = node._currentElement;
//   if (!targetNode) {
//     return;
//   }
//   let component = {
//     name: '',
//     state: null,
//     props: null,
//     children: {},
//     store: null,
//   };

//   if (targetNode.type) {
//     if (targetNode.type.name) {
//       component.name = targetNode.type.name;
//     } else if (targetNode.type.displayName) {
//       component.name = targetNode.type.displayName;
//     } else {
//       component.name = targetNode.type;
//     }
//   }

//   // redux
//   if (targetNode.props) {
//     if (targetNode.type.name === 'Provider') {
//       component.store = targetNode.props.store.getState();
//     }
//   }

//   // State
//   if (node._instance && node._instance.state) {
//     if (component.state === {}) {
//       component.state = null;
//     }
//     else {
//       component.state = node._instance.state
//     }
//   }

//   // props
//   if (targetNode && targetNode.props) {
//     let props = [];
//     if (typeof targetNode.props === 'object') {
//       let keys = Object.keys(targetNode.props);
//       keys.forEach((key) => {
//         props.push(targetNode.props);
//       });
//       component.props = props;
//     } else {
//       component.props = targetNode.props;
//     }
//   }

//   // entering the children components recursively
//   let children = node._renderedChildren;
//   component.children = []; //becomes a new parameter as an empty array for the recursion
//   cache.push(component)
//   if (children) {
//     let keys = Object.keys(children);
//     keys.forEach((key) => {
//       traverseFifteen(children[key], component.children);
//     });
//   } else if (node._renderedComponent) {
//     traverseFifteen(node._renderedComponent, component.children);
//   }
// }

// traverse React 16 fiber DOM
function traverseSixteen(node, cache) {
    console.log('in traverse16 nowwwww')
    // LinkedList Style
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
        // let props = [];
        // if (typeof node.memoizedProps === 'object') {
        //   let keys = Object.keys(node.memoizedProps);
        //   keys.forEach((key) => {
        //     props.push(node.memoizedProps[key]);
        //   });
        //   // need to parse the props if it is a function or an array or an object
        //   component.props = props[0] || props;
        // } else {
        //   component.props = node.memoizedProps;
        // }

        // component.props = node.memoizedProps;
        component.props = stringifyData(node.memoizedProps)
        // if (node.type.name) {
        //   console.log(node.type.name, ": ", node.memoizedProps)
        // }
        // if (typeof node.type === 'string') {
        //   console.log(node.type, ": ", node.memoizedProps)
        // }
    }
    component.children = [];
    cache.push(component)
    if (node.child !== null) {
        traverseSixteen(node.child, component.children);
    }
    if (node.sibling !== null) {
        traverseSixteen(node.sibling, cache);
    }
}

function transmitData(state) {
    console.log('in transmit data')
    console.log('cache', state);
    // create a custom event to dispatch for actions for requesting data from background
    const customEvent = new CustomEvent('Reactext', { detail: { data: stringifyData(state) } });
    window.dispatchEvent(customEvent);
}
