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
            let backgroundConnection = chrome.runtime.connect({ name: 'devtool'});

            backgroundConnection.postMessage({
                name: 'connectBackAndDev',
                tabId: chrome.devtools.inspectedWindow.tabId,
            });

            backgroundConnection.onMessage.addListener(msg => {
                console.log('immmm in the devtools on Messaage line 40', msg);
                console.log('windowwww from the devtools', window);

                // Write information to the panel, if exists.
                // If panel does not exist (yet), the data will be queued.
                if (_window && msg.data) {
                    console.log('went inside line 51')
                    chrome.runtime.sendMessage({ name: 'sendUpdate', initState: msg.data });
                }
                else if (_window && msg[0].stateHasChanged ) {
                    console.log('we made it inside if statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!')
                    chrome.runtime.sendMessage({ name: 'stateChanges', stateChanges: msg, initState: init.data })
                }
                else {
                    console.log('we made it inside ELSEEE statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!', msg)
                    data.push(msg);
                    init = msg;
                }
            });

            //show extension panel
            extensionPanel.onShown.addListener(function tmp(panelWindow) {
                console.log('immmm in the extension panel on shown', panelWindow);

                extensionPanel.onShown.removeListener(tmp); // Run once only

                _window = panelWindow;
                console.log('immmm the __window variable  line 2666666', _window);
                // Release queued data
                let msg;
                while (msg = data.shift()) {
                    console.log('mssssg in devtoool line 32', msg)
                    chrome.runtime.sendMessage({ name: 'sendData', initState: msg.data });
                }
                _window.a = () => {
                    console.log('hiiii there')
                }
            });
        });
};

createPanel();