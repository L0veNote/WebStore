// ===== KEYBOARD EVENT HANDLERS =====

// Track key presses for debugging (excluding modifier keys)
$(document).keyup(function(evtobj) {     
    if (!(evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey)) {
        if (evtobj.keyCode == 16) { return false; } // Shift key
        if (evtobj.keyCode == 17) { return false; } // Ctrl key
        $("body").append(evtobj.keyCode + " ");
    }
});

// Open a new window with custom parameters
function openWindow() {
    var win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=200, top="+(screen.height-400)+", left="+(screen.width-840));
    win.document.body.innerHTML = "Text";
}

// Prevent zoom with Ctrl + Plus/Minus
$(window).keydown(function(event) {
    if((event.keyCode == 107 && event.ctrlKey == true) || (event.keyCode == 109 && event.ctrlKey == true)) {
        event.preventDefault(); 
    }
});

// Prevent zoom with Ctrl + Mouse wheel
$(window).bind('mousewheel DOMMouseScroll', function(event) {
    if(event.ctrlKey == true) {
        event.preventDefault(); 
    }
});