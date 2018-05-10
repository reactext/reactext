function createPanel() {
    console.log('createeeee Panel FIRREEEDDDD!')
    chrome.devtools.panels.create('Reactext', //names tab in devTool
        '/icon.png',
        '/panel.html',
        function (extensionPanel) {
            let _window; // This will hold the reference to panel.html's `window`

            //this data object stores the values that come in from content_script upon opening a new tab
            //when the user opens the devTool, we get the info for the corresponding tab from this object 
            let data = {}

            //store tabId as variable
            let portId = JSON.stringify(chrome.devtools.inspectedWindow.tabId);

            //connect to background.js with connect method, pass in object with name property
            let backgroundConnection = chrome.runtime.connect({ name: 'devtool' });

            backgroundConnection.postMessage({
                name: 'connectBackAndDev',
                tabId: chrome.devtools.inspectedWindow.tabId,
            });

            backgroundConnection.onMessage.addListener(msg => {

                //saves data from background.js in data object if the devTool panel has not been opened
                if (msg.name === 'sendingHistory') {
                    return data[msg.tab] = msg;
                    console.log(data, 'data on line 32')
                }
                //this renders the first version of the devTool since _window (ie the panel) is open
                if (_window && msg.name === 'sendingHistory') {
                    return _window.renderFunc(msg.init, msg.changes, [])
                }                
                //rerenders page if receives reload message from background.js
                if (_window && msg.name === 'reloadPage') {
                    return _window.renderFunc(msg.init, msg.changes, [])
                }
                //rerenders page with new state changes if receives stateHasChanged msg from background.js
                if (_window && msg.name === 'stateHasChanged') {
                    return _window.renderFunc(msg.init, msg.changes, [])
                }
            });

            //this listener fires when extension panel is opened
            extensionPanel.onShown.addListener(function tmp(panelWindow) {
                extensionPanel.onShown.removeListener(tmp); // Run once only

                _window = panelWindow;

                //check if active tab is in data object and then use info to render devTool panel
                let activeTab = chrome.devtools.inspectedWindow.tabId
                if (data[activeTab]) {
                    _window.renderFunc(data[activeTab].init, data[activeTab].changes, []);
                    delete data[activeTab];
                }
            });
        });
};

createPanel();