/**
 * MAIN.JS
 * This file contains the p5.js sketch, or at least the starting methods for it. At a later
 * stage some of the logic may be turned into its own file. 
 */ 
var SKETCH_WIDTH = 1280;
var SKETCH_HEIGHT = 720;

/**
 * Color A is the main strong color, used for backgrounds and fills
 */
var colorA;
/**
 * Color B is the opposing color, used for texts etc.
 */
var colorB;
/**
 * Color C is a lighter version of color A
 */
var colorC;
/**
 * Color D is a n even lighter version of Color C, thus colorA
 */
var colorD;

/**
 * Sets the colors to their values
 */
function setColors() {
    colorA = color(255, 66, 75);
    colorB = color(255, 255, 255);
    colorC = color(255, 122, 129);
    colorD = color(255, 160, 170);
}

/**List of all modals currently on screen */
const modals = [];

/**
 * Entry point of the P5 code, separate from
 * the JQuery entry point
 */
function setup() {
    //Create a 1280 x 720 pixel canvas. We might need to increase this to improve resolution
    //However this might also mean that we need to lower the framerate.
    createCanvas(SKETCH_WIDTH, SKETCH_HEIGHT);
    $('canvas').attr('style', '');
    //Set the frameRate quite low, we don't need too high and lower might help to increase the resolution later on.
    frameRate(30);
    //Load the color definitions
    setColors();
}

/**
 * Called every frame to update the canvas element
 */
function draw() {
    //Set the background to a weird reddish color, and draw without stroke
    background(colorA);
    noStroke();

    //Update the modals
    updateModals();
}

/**
 * Catches any mouseclicks, mostly used for dev stuff now
 */
function mousePressed() {
    //Create a new modal
    let m = new Modal(getS("TITLE"));
    //Hide all other modals
    modals.forEach(function(m){m.hide();});
    //Show it
    m.show();
}

/**
 * Updates the modals and takes care of list maintenance
 */
function updateModals() {
    //Draw all the modals that are currently visible
    modals.forEach(function (modal) {
        modal.update();
        modal.render();
    });
    //Now check if we can remove any of them
    for (let i = modals.length - 1; i >= 0; i--) {
        if (modals[i].dead) modals.splice(i, 1);
    }
}