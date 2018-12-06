/**
 * MAIN.JS
 * This file contains the p5.js sketch, or at least the starting methods for it. At a later
 * stage some of the logic may be turned into its own file. 
 */
var SKETCH_WIDTH = 1280;
var SKETCH_HEIGHT = 720;

/**
 * Entry point of the P5 code, separate from
 * the JQuery entry point
 */
function setup(){
    //Create a 1280 x 720 pixel canvas. We might need to increase this to improve resolution
    //However this might also mean that we need to lower the framerate.
    createCanvas(SKETCH_WIDTH, SKETCH_HEIGHT);
    $('canvas').attr('style', '');
    //Set the frameRate quite low, we don't need too high and lower might help to increase the
    //Resolution later on.
    frameRate(60);

    //add("thingy", "input type='text'", "Testing");
}

/**
 * Called every frame to update the canvas element
 */
function draw(){
    //Set the background to a weird reddish color, and draw without stroke
    background(255, 125, 125);
    noStroke();

    pos("thingy", mouseX, mouseY);

    //Follow the mouse, and draw a purplish circle
    fill(125, 125, 255);
    ellipse(mouseX, mouseY, 20, 20);
}