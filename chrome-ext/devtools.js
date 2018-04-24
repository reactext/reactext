chrome.devtools.panels.create('Reactext', '/icon.png', '/panel.html', function(extensionPanel) {
    let _window; // This will hold the reference to panel.html's `window`
    let data = [];
    let port = chrome.runtime.connect({name: 'devtools'});
    console.log('im the port object', port);
    port.onMessage.addListener(function(msg) {
        // Write information to the panel, if exists.
        // If panel does not exist (yet), the data will be queued.
        console.log('message from the devtools', msg);
        console.log(_window, 'im the _window');
        if (_window) {
            _window.do_something(msg);
        } else {
            data.push(msg);
        }
    });

    extensionPanel.onShown.addListener(function tmp(panelWindow) {
        extensionPanel.onShown.removeListener(tmp); // Run once only
        _window = panelWindow;

        // Release queued data
        let msg;
        while (msg = data.shift())
            _window.do_something(msg);
        // Respond to to background
        _window.respond = function(msg) {
            port.postMessage(msg);
        };
    });
});

