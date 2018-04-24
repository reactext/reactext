function do_something(msg) {
    document.body.textContent += '\n' + msg; // 
}
document.documentElement.onclick = function() {
    // No need to check for the existence of `respond`, because
    // the panel can only be clicked when it's visible...
    respond('response from panel upon clicking :)');
};