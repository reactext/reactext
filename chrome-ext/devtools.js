function createPanel() {
<<<<<<< HEAD
    console.log('createeeee Panel FIRREEEDDDD!')
    chrome.devtools.panels.create('Reactext', //names tab in devTool
=======
    chrome.devtools.panels.create('Reactext',
>>>>>>> 5aeecf82fe68b058b5e48fea98b7d2fd5aae3e43
        '/icon.png',
        '/panel.html',
        function (extensionPanel) {
            let _window; // This will hold the reference to panel.html's `window`

            let data = [];

            //store tabId as variable
            let portId = JSON.stringify(chrome.devtools.inspectedWindow.tabId);

            //connect to background.js with connect method, pass in object with name property
            let port = chrome.runtime.connect({ name: portId });


            //show extension panel
            extensionPanel.onShown.addListener(function tmp(panelWindow) {
                console.log('immmm in the extension panel on shown', panelWindow);

                extensionPanel.onShown.removeListener(tmp); // Run once only
                
                _window = panelWindow;
                console.log('immmm the __window variable  line 2666666', _window);

                // Release queued data
                console.log('data in devtoool line 31', data)

                let msg;
                while (msg = data.shift()) {
<<<<<<< HEAD
                    console.log('mssssg in devtoool line 32', msg)
                    chrome.runtime.sendMessage({name: 'sendData', initState: msg});
=======
                    _window.do_something(msg);
                    // Respond to background
                    _window.respond = function (msg) {
                        port.postMessage(msg);
                    };
>>>>>>> 5aeecf82fe68b058b5e48fea98b7d2fd5aae3e43
                }
            });

            port.onMessage.addListener(msg => {
                console.log('immmm in the port on Messaage line 40', msg);

                // Write information to the panel, if exists.
                // If panel does not exist (yet), the data will be queued.
<<<<<<< HEAD
                console.log('windowwww from the devtools', window);
                console.log('_________WINDOW from the devtools', _window);

                if (_window && msg.data) {
                    console.log('went inside line 51')
                }
                else if (_window && msg.stateHasChanged) {
                    console.log('we made it inside if statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!')
                    chrome.runtime.sendMessage({name: 'stateChanges', stateChanges: msg})
=======
                // if (_window && msg.data) {
                //     _window.do_something(msg);
                // }
                if (_window && msg.stateHasChanged) {
 
                    _window.do_somethingElse(msg)
>>>>>>> 5aeecf82fe68b058b5e48fea98b7d2fd5aae3e43
                }
                else {
                    console.log('we made it inside ELSEEE statement in DEVTOOLSSS!!!!!!!!!!!!!!!!!!', msg)
                    data.push(msg);
                    console.log(data, '<-----data 62')

                }

            });

            port.postMessage({
                name: 'connect',
                tabId: chrome.devtools.inspectedWindow.tabId,
            })
        });
};

createPanel();