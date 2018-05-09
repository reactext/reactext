function createPanel() {
    console.log('createeeee Panel FIRREEEDDDD!')
    chrome.devtools.panels.create('Reactext', //names tab in devTool
        '/icon.png',
        '/panel.html',
        function (extensionPanel) {
            let _window; // This will hold the reference to panel.html's `window`

            // let data = [];
            let data2 ={}

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

                if (_window && msg.name === 'reloadPage') {
                    console.log('went inside line 51', _window)
                    _window.renderFunc(msg.init, msg.changes, [])
                }
                if (_window && msg.name === 'stateHasChanged') {
                    console.log('we made it inside if statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!')
                    _window.renderFunc(msg.init, msg.changes, [])
                }
                if (_window && msg.name === 'sendingHistory') {
                    console.log('went inside line 40', _window)
                    _window.renderFunc(msg.init, msg.changes, [])
                }
                if (msg.name === 'sendingHistory') {
                    console.log('went inside line 45', msg)
                    data2[msg.tab] = msg;
                    console.log('data2', data2)
                }
                else {
                    console.log('we made it inside ELSEEE statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!', msg)
                    data.push(msg);
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
                console.log('CDIWT', chrome.devtools.inspectedWindow.tabId)
                console.log('data2', data2)
                let activeTab = chrome.devtools.inspectedWindow.tabId
                if (data2[activeTab]) {
                    _window.renderFunc(data2[activeTab].init, data2[activeTab].changes, []);
                    delete data2[activeTab];
                }
                // while (msg = data.shift()) {
                //     _window.renderFunc(msg.init, msg.changes, []);
                // }
                // _window.respond = function(msg) {
                //     port.postMessage(msg)
                // }
            });
        });
};

createPanel();