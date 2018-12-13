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
 * Slide number
 */
var slideNumber = -1;

/**
 * Sets the colors to their values
 */
function setColors() {
    colorA = color(0, 123, 255);
    colorB = color(255, 255, 255);
    colorC = color(120, 200, 255);
    colorD = color(190, 220, 255);
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
    //Show the first slide
    nextSlide();
    //Nice thick lines
    strokeWeight(2);
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

    //Now show the header
    updateHeader();
}

/**
 * Continue on to the next slide
 */
function nextSlide() {
    //Hide all current modals
    modals.map(function (m) { m.hide() });
    //Increase slidenumber
    slideNumber++;
    //Make a new modal
    let modal = new Modal(getTitle(), getQuestion());
    //Switch slidenumber, to get the correct slide layout
    switch (slideNumber) {
        case 0:
            slideOne(modal);
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }
    //Finally show the modal
    modal.show();
}

/**
 * Gets the appropriate title for the current slide
 */
function getTitle() {
    return getS("TITLE_" + slideNumber);
}

/**
 * Returns the question for this slide
 */
function getQuestion() {
    return getS("QUEST_" + slideNumber);
}

/**
 * Updates and renders the top header
 */
function updateHeader() {
    //Draw the dropshadow
    fill(0, 80);
    noStroke();
    rect(-10, -10, SKETCH_WIDTH + 20, 84);
    //Draw the rect that holds the header
    fill(colorD);
    stroke(colorB);
    //Draw the rect
    rect(-10, -10, SKETCH_WIDTH + 20, 80);
    //Draw the question makrers depending on slideNumber
    drawSlideMarker(slideNumber);
}

/**
 * Draw all the slides, and fill up until the number provided
 * @param {Number} num 
 */
function drawSlideMarker(num) {
    const startX = 140;
    const startY = 35;
    const stepX = 100;
    const radius = 30;
    //First draw a line
    strokeWeight(9);
    stroke(colorA);
    line(-10, startY, SKETCH_WIDTH + 20, startY);
    strokeWeight(3);
    //For all questions
    for (let i = 0; i < 11; i++) {
        if (i < num) {//Questions we've had
            fill(colorC);
            stroke(colorA);
            ellipse(i * stepX + startX, startY, radius, radius);
        } else if (i > num) {//Question's we haven't reached
            fill(colorD);
            stroke(colorA);
            ellipse(i * stepX + startX, startY, radius, radius);
        } else {//The question we're at right now
            fill(colorB);
            stroke(colorA);
            ellipse(i * stepX + startX, startY, radius * 1.3, radius * 1.3);
        }
    }
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