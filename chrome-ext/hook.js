
// start of vars and main logic
let devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
let reactInstances = devTools._renderers;
let rid = Object.keys(reactInstances)[0];
let reactInstance = reactInstances[rid];

const pageSetup = {};

let firstStatePull;
let initialState;
let nestedState;
let changes;
let currNestedState;

// stateSet.forEach((e) => {
//   firstStatePull = e;
// });

// //////////////
// /functions////
// //////////////
//get initial state and only run once

const getInitialStateOnce = () => {
  let run = false;
  return function getInitialState() {
    if (!run) {
      //grab initial state
      let initStateSet = devTools._fiberRoots[rid];
      initStateSet.forEach(item => initialState = item);
      //parse state
      initialState = checkReactDOM(initialState.current.stateNode);
      run = true;
    }
  };
}

//set initial state
let setInitialStateOnce = getInitialStateOnce();

const checkReactDOM = reactDOM => {
  const data = {
    currentState: null,
  };
  const cache = [];

  if (reactDOM) {
    traverseAndGatherReactDOM(reactDOM.current, cache);
  } else {
    return;
  }
  data.currentState = cache;
  return data;
};

// /////////////////////////////////////
const traverseAndGatherReactDOM = (node, cache) => {
  const component = {
    id: null,
    name: 'dont add me',
    state: null,
    props: null,
    children: [],
    store: null,
  };

  if (node._debugID) {
    component.id = node._debugID;
  }

  if (node.type) {
    if (node.type.name) {
      component.name = node.type.name;
    }
    if (typeof node.type === 'object' && node.type !== null) {
      component.name = node.type;
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

  // if the current node has a child it runs it the function again on them
  if (node.child !== null) {
    traverseAndGatherReactDOM(node.child, component.children);
  }

  // if the current node has siblings it runs the function agin on them
  if (node.sibling !== null) {
    traverseAndGatherReactDOM(node.sibling, cache);
  }
  cache.push(component);
};
// ///////////////////////////////////////////////
// OrganizeState Flattens the nested state array into our pageSetup global variable
const organizeState = (state) => {
  state.forEach((child) => {
    if (typeof child.name === 'string' && child.name !== 'dont add me') {
      componentName = child.name;
      pageSetup[child.name] = {};
      pageSetup[child.name].state = child.state;
      pageSetup[child.name].children = [];
      let tempChild = child;

      // This block is to create the children property on the component object even if they dont actually have children.
      while (tempChild) {
        tempChild.children.forEach((obj) => {
          if (typeof obj.name === 'string' && obj.name !== 'dont add me') {
            pageSetup[child.name].children.push(obj.name);
          }
        });
        tempChild = tempChild.children[0];
      }
    }
    // Recursive call to organizeState to traverse down the current object on the state array to create the rest of the
    // component object on the pageSetup varibale.
    if (child.children.length >= 1) {
      organizeState(child.children);
    }
  });
};

////////////////////////////////////
function stringifyData(obj) {
  const data = JSON.parse(JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function') {
      value = value.toString();
    }
    return value;
  }));
  return data;
}

const transmitInitialData = (state) => {
  const customEvent = new CustomEvent('Reactext', {
    detail: {
      data: stringifyData(state),
    },
  });
  window.dispatchEvent(customEvent);
};

const transmitChangedData = (state) => {
  const customEvent = new CustomEvent('Changed', {
    detail: {
      data: stringifyData(state),
    },
  });
  window.dispatchEvent(customEvent);
};

// ///////////////
// /Main Logic////
// ///////////////

(function setInitialState() {
  if (reactInstance && reactInstance.version) {
    //get initial state for 16 & 16+
    setInitialStateOnce();
    setTimeout(() => {
      organizeState(initialState.currentState[0].children);
      providerConsumerData(initialState.currentState[0].children);
      transmitInitialData(pageSetup);
    }, 100);
  } else {
    console.log("React Dev Tools is not found")
  }
}());

// ////////////////////
// /Changes to State///
// ////////////////////

// Monkey patch into devTools object in React devTools
(function connectReactDevTool() {
  //Error if React Developer Tools is not installed
  if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    console.log('React Dev Tools must be installed for Reactext');
    return;
  } else if (!reactInstance) {
    //Error if React app is not detected
    console.log('React not detected');
    return;
  }
  // for React 16 and 16+
  if (reactInstance && reactInstance.version) {
    devTools.onCommitFiberRoot = (original => (...args) => {
      getStateChanges(args[1]);
      return original(...args);
    })(devTools.onCommitFiberRoot);
  }
}());

// getStateChanges takes in an instance 
async function getStateChanges(instance) {
  try {
    changes = await instance;
    currNestedState = await checkReactDOM(changes);
    organizeState(currNestedState.currentState[0].children);
    providerConsumerData(currNestedState.currentState[0].children);
    transmitChangedData(pageSetup);
  } catch (e) {
  }
}

// state
function getConsumerContext(state, componentName) {
  if (state.length === 0) return;
  if (typeof state === 'object' && !Array.isArray(state)) {
    if (state.props && state.props.children && typeof state.props.children === 'function') {
      const strFunc = state.props.children.toString();
      const regex = /\((.*)\)/;
      const argumentInFunc = regex.exec(strFunc)[1];
      const regex1 = new RegExp(`${argumentInFunc}\\.(.*?)\\W`, 'gm');

      pageSetup[componentName].Consumer_Context_Used = strFunc.match(regex1);
    }
  } else {

    state.forEach((cObj) => {
      if (cObj.props && cObj.props.children && typeof cObj.props.children === 'function') {
        const strFunc = cObj.props.children.toString();
        const regex = /\((.*)\)/;
        const argumentInFunc = regex.exec(strFunc)[1];
        const regex1 = new RegExp(`${argumentInFunc}\\.(.*?)\\s`, 'gm');

        pageSetup[componentName].Consumer_Context_Used = strFunc.match(regex1);
      }
    });
  }
}

/////////////////////////////////// PROVIDER CONSUMER FUNCTION ///////////////////////////////////////////////////// /////////////////

function providerConsumerData(state, componentName = '', providerSymbols = []) {

  //checking to see if the state(typeof array) has more than one object. If it does we should iterate over the array
  if (state.length > 1) {
    state.forEach((obj) => {
      // getting the name of the component for each object
      if (typeof obj.name === 'string' && obj.name !== 'dont add me') {
        componentName = obj.name;
      }
      //******* If the object.na yeah where the new exploits his this a really run it once right what function like that if heme is not a struing type but rather another object than it will be in the format {$$typeof: Symbol(react.provider/context), _context: {…}, tracker: Symbol(uniqeId)}
      // If it is an object than we need to run through provider and consumer blocks and create the appropriate property using the passed in <componentName>
      /////////////////////////////////////////_____ADDITION_____//////////////////////////////////////////////////
      if (typeof obj.name === 'object') {
        if (obj.name.$$typeof.toString() === 'Symbol(react.provider)') {
          // add proper stuff to the pageSetup
          pageSetup[componentName].provider = true;
          pageSetup[componentName].contextValue = obj.props.value;
          pageSetup[componentName].tracker = obj.name.tracker;
          const subArr = [];
          subArr.push(componentName, obj.name.tracker);
          providerSymbols.push(subArr);
        }

        if (obj.name.$$typeof.toString() === 'Symbol(react.context)') {
          if (pageSetup[componentName].Active_Provider) return;

          const trackerId = [];
          pageSetup[componentName].consumer = true;
          getConsumerContext(obj, componentName);
          getConsumerContext(obj.children, componentName);
          const consumerId = [];
          let currentChild = obj;

          while (currentChild.name.tracker) {
            consumerId.push(currentChild.name.tracker);

            currentChild = currentChild.children[0];
          }
          providerSymbols.forEach((arr) => {
            if (consumerId.includes(arr[1])) {
              trackerId.push(arr[0]);
            }
          });
          pageSetup[componentName].Active_Provider = trackerId;
        }
      }
      ////// AFTER getting provider/consumer data from obj.name we still need to call the function for its children
      if (obj.children.length > 0) {
        // if so PCD(children array)
        providerConsumerData(obj.children, componentName, providerSymbols);
      }
    });
  }

  /// SHOULD ONLY RUN WHEN STATE ARRAY HAS ONE OBJECT
  if (state.length === 1) {
    if (typeof state[0].name === 'string' && state[0].name !== 'dont add me') {
      componentName = state[0].name;
    }

    //////////////////////// BLOCK FOR PROVIDER OR CONSUMER DATA
    if (typeof state[0].name === 'object') {

      /////////////////______START____PROVIDER_BLOCK____//////////////////////////////////
      if (state[0].name.$$typeof.toString() === 'Symbol(react.provider)') {
        // do something
        // add proper stuff to the pageSetup
        pageSetup[componentName].provider = true;
        pageSetup[componentName].contextValue = state[0].props.value;
        pageSetup[componentName].tracker = state[0].name.tracker;
        // does children array have any objects?
        const subArr = [];
        subArr.push(componentName, state[0].name.tracker);
        providerSymbols.push(subArr);
      }
      /////////////////______END____PROVIDER_BLOCK____//////////////////////////////////

      /////////////////______START____CONSUMER_BLOCK____//////////////////////////////////
      if (state[0].name.$$typeof.toString() === 'Symbol(react.context)') {
        if (pageSetup[componentName].Active_Provider) return;
        const trackerId = [];
        pageSetup[componentName].consumer = true;

        getConsumerContext(state, componentName);

        const consumerId = [];
        let currentChild = state[0];

        while (currentChild.name.tracker) {
          consumerId.push(currentChild.name.tracker);

          currentChild = currentChild.children[0];
        }

        providerSymbols.forEach((arr) => {
          if (consumerId.includes(arr[1])) {
            trackerId.push(arr[0]);
          }
        });
        pageSetup[componentName].Active_Provider = trackerId;

      }
      /////////////////______END____CONSUMER_BLOCK____//////////////////////////////////
    }
  }
  if (state.length === 1) {
    if (state[0].children.length > 0) {
      providerConsumerData(state[0].children, componentName, providerSymbols);
    }
  }
}

/////////////////////////////////// END ____PROVIDER CONSUMER FUNCTION ///////////////////////////////////////////////////// /////////////////

console.log(pageSetup, 'im the page set up last thing in hook.js');
