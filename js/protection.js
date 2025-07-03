// 🛡️ protection.js - Security, UX & slider logic for Narii

// ===== AUTO SLIDESHOW =====
(function() {
  const slides = document.querySelectorAll('.custom-slider .custom-slide');
  let current = 0;
  if (!slides.length) return;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 4000);
})();

// ===== 🔒 DISABLE CONTEXT MENU & KEYS =====
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function (e) {
    // F12
    if(e.keyCode == 123) return false;
    // Ctrl+Shift+I
    if(e.ctrlKey && e.shiftKey && e.keyCode == 73) return false;
    // Ctrl+Shift+J
    if(e.ctrlKey && e.shiftKey && e.keyCode == 74) return false;
    // Ctrl+U
    if(e.ctrlKey && e.keyCode == 85) return false;
}

// ===== 🖱️ MAKE ELEMENTS UNSELECTABLE (legacy jQuery) =====
var makeUnselectable = function( $target ) {
    $target
        .addClass( 'unselectable' )
        .attr( 'unselectable', 'on' ) 
        .attr( 'draggable', 'false' ) 
        .on( 'dragstart', function() { return false; } );  
    $target 
        .find( '*' )
        .attr( 'draggable', 'false' )
        .attr( 'unselectable', 'on' ); 
};

// ===== 🔎 KEYBOARD & ZOOM BLOCKERS (jQuery) =====
$(document).keyup(function(evtobj) {     
    if (!(evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey)) {
        if (evtobj.keyCode == 16) { return false; } // Shift
        if (evtobj.keyCode == 17) { return false; } // Ctrl
        $("body").append(evtobj.keyCode + " ");
    }
});

// Open a new window with custom parameters
function openWindow(url, title) {
    var win = window.open(
        url || "", 
        title || "Title", 
        "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=200, top="+(screen.height-400)+", left="+(screen.width-840));
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