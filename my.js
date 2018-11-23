var map = new Datamap({element: document.getElementById('container')});
//

// canvases container
var container = document.getElementById("container");

// bottom canvas
var bottomCanvas = document.getElementById("bottom");
var bottomCtx = bottomCanvas.getContext("2d");

// middle canvas
var middleCanvas = document.getElementById("middle");
var middleCtx = middleCanvas.getContext("2d");

// top canvas
var topCanvas = document.getElementById("top");
var topCtx = topCanvas.getContext("2d");

// load images and draw each one on its respective canvas layer

var dirtyWindow = new Image();
dirtyWindow.onload = function () {
    middleCtx.drawImage(this, 0, 0);
    middleCtx.globalCompositeOperation = "xor";
}
dirtyWindow.src = "https://dl.dropboxusercontent.com/u/37981960/images/stackoverflow/before.png";

var windowBars = new Image();
windowBars.onload = function () {
    topCtx.drawImage(this, 0, 0);
}
windowBars.src = "https://dl.dropboxusercontent.com/u/37981960/images/stackoverflow/bars.png";

var wally = new Image();
wally.onload = function () {
    bottomCtx.drawImage(this, 0, 0, this.width, this.height, 0, 0, bottomCanvas.width, bottomCanvas.height);
}
wally.src = "https://dl.dropboxusercontent.com/u/37981960/images/stackoverflow/wally.jpg";

// brush action
var drawPoint = function (x, y) {
    var gradient = middleCtx.createRadialGradient(x, y, 5, x, y, 60);
    gradient.addColorStop(0, 'rgba(250, 250, 250, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 245, 250, 0.9)');

    middleCtx.arc(x, y, 25, 0, 2 * Math.PI);
    middleCtx.fillStyle = gradient;
    middleCtx.fill();
};

// store the mouse coordinate
var mouse = {
    x: 0,
    y: 0
};

// get the mouse position given a mouse event
function getPosition(event) {
    if (event.x != undefined && event.y != undefined) {
        mouse.x = event.x;
        mouse.y = event.y;
    } else if (event.pageX != undefined && event.pageY != undefined) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    } else {
        mouse.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        mouse.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    mouse.x -= container.offsetLeft;
    mouse.y -= container.offsetTop;
};

var drag = false;

// configure handlers for mouse events

container.addEventListener("mousedown", function (event) {
    drag = true;
    // prevent event defaults
    event.preventDefault();
    event.stopPropagation();
    return false;
}, false);

container.addEventListener("mouseup", function (event) {
    drag = false;
    // prevent event defaults
    event.preventDefault();
    event.stopPropagation();
    return false;
}, false);

container.addEventListener("mousemove", function (event) {
    if (drag) {
        getPosition(event);
        drawPoint(mouse.x, mouse.y);
    }    
    // prevent event defaults
    event.preventDefault();
    event.stopPropagation();
    return false;
}, false);