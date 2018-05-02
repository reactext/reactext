function createPanel() {
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


            //show extension panel
            extensionPanel.onShown.addListener(function tmp(panelWindow) {
                extensionPanel.onShown.removeListener(tmp); // Run once only
                _window = panelWindow;

                // Release queued data
                let msg;
                while (msg = data.shift()) {
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
                // if (_window && msg.data) {
                //     _window.do_something(msg);
                // }
                if (_window && msg.stateHasChanged) {
 
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
