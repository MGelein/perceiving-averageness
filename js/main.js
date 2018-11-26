/**
 * Entry point of the P5 code, separate from
 * the JQuery entry point
 */
function setup(){
    //Create a 1280 x 720 pixel canvas. We might need to increase this to improve resolution
    //However this might also mean that we need to lower the framerate.
    createCanvas(1280, 720);
    $('canvas').attr('style', '');
    //Set the frameRate quite low, we don't need too high and lower might help to increase the
    //Resolution later on.
    frameRate(60);
}

/**
 * Called every frame to update the canvas element
 */
function draw(){
    //Set the background to a weird reddish color, and draw without stroke
    background(255, 125, 125);
    noStroke();

    //Follow the mouse, and draw a purplish circle
    fill(125, 125, 255);
    ellipse(mouseX, mouseY, 20, 20);
    console.log(mouseX, mouseY);
}