function createPanel() {
    console.log('createeeee Panel FIRREEEDDDD!')
    chrome.devtools.panels.create('Reactext', //names tab in devTool
        '/icon.png',
        '/panel.html',
        function (extensionPanel) {
            let _window; // This will hold the reference to panel.html's `window`
            console.log('immmm the __window variable', _window);

            let data = [];

            //store tabId as variable
            let portId = JSON.stringify(chrome.devtools.inspectedWindow.tabId);

            //connect to background.js with connect method, pass in object with name property
            let port = chrome.runtime.connect({ name: portId });

            console.log('im the port object', port);

            //show extension panel
            extensionPanel.onShown.addListener(function tmp(panelWindow) {
                console.log('immmm in the extension panel on shown', panelWindow);

                extensionPanel.onShown.removeListener(tmp); // Run once only
                _window = panelWindow;
                console.log('immmm the __window variable  line 2666666', _window);

                // Release queued data
                let msg;
                while (msg = data.shift()) {
                    console.log('data in devtoool line 31', data)
                    console.log('mssssg in devtoool line 32', msg)
                }
            });

            port.onMessage.addListener(msg => {
                console.log('immmm in the port on Messaage line 40', msg);

                // Write information to the panel, if exists.
                // If panel does not exist (yet), the data will be queued.
                console.log('message from the devtools', msg);
                console.log('windoewwww from the devtools', window);

                if (_window && msg.data) {
                    console.log('went inside line 51')
                    port.postMessage({
                        name: 'sendData',
                        data: msg,
                    })
                }
                if (_window && msg.stateHasChanged) {
                    console.log('we made it inside if statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!')
                }
                else {
                    console.log('we made it inside ELSEEE statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!', msg)
                    data.push(msg);
                    port.postMessage({
                        name: 'sendData',
                        data: msg,
                    })
                }
            });

            port.postMessage({
                name: 'connect',
                tabId: chrome.devtools.inspectedWindow.tabId,
            })


        });
};

createPanel();