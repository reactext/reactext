function createPanel() {
    console.log('createeeee Panel FIRREEEDDDD!')
    chrome.devtools.panels.create('Reactext',
        '/icon.png',
        '/panel.html',
        function (extensionPanel) {
            let _window; // This will hold the reference to panel.html's `window`
            let data = [];
            //store tabId as variable
            let portId = JSON.stringify(chrome.devtools.inspectedWindow.tabId);

            //connect to background.js with connect method, pass in optional object with name property
            let port = chrome.runtime.connect({ name: portId });

            console.log('im the port object', port);

            //show extension panel
            extensionPanel.onShown.addListener(function tmp(panelWindow) {
                extensionPanel.onShown.removeListener(tmp); // Run once only
                _window = panelWindow;

                // Release queued data
                let msg;
                while (msg = data.shift()) {
                    console.log('mssssg in devtoool line 25', msg)
                    _window.do_something(msg);
                    // Respond to background
                    _window.respond = function (msg) {
                        port.postMessage(msg);
                    };
                }
            });

            port.onMessage.addListener(msg => {
                // Write information to the panel, if exists.
                // If panel does not exist (yet), the data will be queued.
                console.log('message from the devtools', msg);
                console.log(_window, 'im the _window');
                // if (_window && msg.data) {
                //     console.log('went inside line 40')
                //     _window.do_something(msg);
                // }
                if (_window && msg.stateHasChanged) {
                    console.log('we made it inside if statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!')
 
                    _window.do_somethingElse(msg)
                }
                else {
                    data.push(msg);
                }
            });

            port.postMessage({
                name: 'connect',
                tabId: chrome.devtools.inspectedWindow.tabId,
            })
        });
};

createPanel();
