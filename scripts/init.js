'use strict'

// disabling context menu
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  e.stopPropagation();
});