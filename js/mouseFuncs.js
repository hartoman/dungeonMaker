// this file contains everything that has to do with implementing mouse / touch


// mouse pointer coordinates
let mouseX;
let mouseY;

// moves the player sprite
function onMouseClick(e) {
    isPaused=false;
    getXYpositions(e);
    // must normalize mouse coordinates to canvas pixel size
    mouseX = normalizeX(mouseX);
    mouseY = normalizeY(mouseY);
  
    player.destination.x=mouseX;
    player.destination.y=mouseY;
  }
  
  /** normalizes X value to a given canvas*/
  // credits: https://codepen.io/andyranged/pen/KyMKEB
  function normalizeX(x) {
    // canvasBoundingBox is global constant from canvas.getBoundingClientRect();
    return Math.floor((x - canvasBoundingBox.left) * (ctx.canvas.width / canvasBoundingBox.width));
  }
  /** normalizes Y value to a given canvas */
  // credits: https://codepen.io/andyranged/pen/KyMKEB
  function normalizeY(y) {
    return Math.floor((y - canvasBoundingBox.top) * (ctx.canvas.height / canvasBoundingBox.height));
  }
  
  /** gets positions of x and y based on whether device is touchscreen  */
  function getXYpositions(e) {
    if (is_touch_enabled() && e.touches.length > 0) {
      // credits: https://www.w3schools.com/jsref/event_touch_touches.asp
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    } else {
      mouseX = e.pageX;
      mouseY = e.pageY;
    }
  }
  
  // for mobile devices
  function is_touch_enabled() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }
  