chrome.devtools.panels.create('Reactext', '/icon.png', '/panel.html', function(extensionPanel) {
    var _window; // This will hold the reference to panel.html's `window`
    var data = [];
    var port = chrome.runtime.connect({name: 'devtools'});
    port.onMessage.addListener(function(msg) {
        // Write information to the panel, if exists.
        // If panel does not exist (yet), the data will be queued.
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
        var msg;
        while (msg = data.shift()) 
            _window.do_something(msg);
        // Respond to to background
        _window.respond = function(msg) {
            port.postMessage(msg);
        };
    });
});

