function createPanel() {
    console.log('createeeee Panel FIRREEEDDDD!')
    chrome.devtools.panels.create('Reactext', //names tab in devTool
        '/icon.png',
        '/panel.html',
        function (extensionPanel) {
            let _window; // This will hold the reference to panel.html's `window`

            let data = [];

            let init;

            //store tabId as variable
            let portId = JSON.stringify(chrome.devtools.inspectedWindow.tabId);

            //connect to background.js with connect method, pass in object with name property
            let backgroundConnection = chrome.runtime.connect({ name: 'devtool' });

            backgroundConnection.postMessage({
                name: 'connectBackAndDev',
                tabId: chrome.devtools.inspectedWindow.tabId,
            });

            backgroundConnection.onMessage.addListener(msg => {
                console.log('immmm in the devtools port.onMessage line 25', msg);
                console.log('windowwww from the devtools', window);

                // Write information to the panel, if exists.
                // If panel does not exist (yet), the data will be queued.
                // if (_window && msg.data) {

                if (_window && msg.name === 'stateHasChanged') {
                    console.log('we made it inside if statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!')
                    _window.renderFunc(msg.init, msg.changes, [])
                    // chrome.runtime.sendMessage({ name: 'stateChanges', stateChanges: msg, initState: init.data })
                }

                if (_window) {
                    console.log('went inside line 51', _window)
                    // init = msg.data;
                    // _window.renderApp(init, [], [])
                    // chrome.runtime.sendMessage({ name: 'sendUpdate', initState: msg.data });
                }
                else {
                    console.log('we made it inside ELSEEE statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!', msg)
                    data.push(msg);
                    // init = msg;
                }
            });

            //show extension panel
            extensionPanel.onShown.addListener(function tmp(panelWindow) {
                console.log('immmm in the extension panel on shown', panelWindow);

                extensionPanel.onShown.removeListener(tmp); // Run once only

                _window = panelWindow;
                console.log('immmm the __window variable  line 544', _window);
                // Release queued data
                let msg;
                while (msg = data.shift()) {
                    console.log('mssssg in devtoool line 32', msg)
                    console.log('immmm the __window variable  line 59', _window);
                    // chrome.runtime.sendMessage({ name: 'sendData', initState: msg.data });
                    _window.renderFunc(msg.data, [], []);
                }
                // _window.respond = function(msg) {
                //     port.postMessage(msg)
                // }
            });
        });
};

createPanel();