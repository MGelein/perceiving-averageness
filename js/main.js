/**
 * MAIN.JS
 * This file contains the p5.js sketch, or at least the starting methods for it. At a later
 * stage some of the logic may be turned into its own file. 
 */
var SKETCH_WIDTH = 1280;
var SKETCH_HEIGHT = 720;

//The possible program stages
const LANG_SELECT = 1;
const QUESTIONNAIRE = 2;
const OVERVIEW = 3;

//The current program stage
var PROGRAM_STAGE = LANG_SELECT;

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
//Location of  the slide markers
var markers = [];

//Holds the country flag images
var flags = {};

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
    frameRate(60);
    //Load the color definitions
    setColors();
    //Nice thick lines
    strokeWeight(2);
    //Load the country flags
    flags = {
        uk: loadImage("./data/img/uk.png"),
        us: loadImage("./data/img/us.png"),
        nl: loadImage("./data/img/nl.svg"),
        be: loadImage("./data/img/be.jpg")
    }
    setStage(LANG_SELECT);
}

/**
 * Sets the stage to a new stage. Do some init stuff
 * for each stage here
 * @param {Number} stage 
 */
function setStage(stage) {
    PROGRAM_STAGE = stage;
    //Do init for a specific stage
    if (stage == LANG_SELECT) {
        add("NL_TAG", "h1", "Nederlands");
        add("EN_TAG", "h1", "English");
    } else if (stage == QUESTIONNAIRE) {
        //Show the first slide
        nextSlide();
    } else if (stage == OVERVIEW) {

    }
}

/**
 * Called every frame to update the canvas element
 */
function draw() {
    //Set the background to a weird reddish color, and draw without stroke
    background(colorA);
    noStroke();

    //Render depending on the program stage
    if (PROGRAM_STAGE == LANG_SELECT) {
        updateLangSelect();
    } else if (PROGRAM_STAGE == QUESTIONNAIRE) {
        //Update the modals
        updateModals();
        //Now show the header
        updateHeader();
    } else if (PROGRAM_STAGE == OVERVIEW) {

    }
}

/**
 * Show and update the language select window
 */
function updateLangSelect() {
    //Calculate the half width
    let w = SKETCH_WIDTH / 2;
    //Draw the highlighted rect with a different color
    noStroke();
    fill(255, 30);
    let startX = mouseX > w ? w : 0;
    let isDutch = startX == 0;
    rect(startX, 0, w, SKETCH_HEIGHT);

    //Now prepare for the center line
    strokeWeight(6);
    stroke(colorB);
    //Calculate the line
    let offY = 50;
    line(w, 100 + offY, w, SKETCH_HEIGHT - 200 + offY);
    let enSize = 1;
    let nlSize = 1;
    if (isDutch) nlSize = 1.005;
    else enSize = 1.005;
    //Draw the flags
    image(flags.uk, w + 100, 90 + offY, 300 * enSize, 200 * enSize);
    image(flags.us, w + 100, 330 + offY, 300 * enSize, 200 * enSize);
    image(flags.nl, w - 400, 90 + offY, 300 * nlSize, 200 * nlSize);
    image(flags.be, w - 400, 330 + offY, 300 * nlSize, 200 * nlSize);

    //Set the pos of the tags
    pos("NL_TAG", 260, 50);
    pos("EN_TAG", 800, 50);
}

/**
 * Used to handle button presses, first and foremost for the header
 */
function mousePressed() {
    //Mouse handler depedning on stage
    if (PROGRAM_STAGE == LANG_SELECT) {
        if (mouseX < SKETCH_WIDTH / 2) {
            setLanguage(DUTCH);
        } else {
            setLanguage(ENGLISH);
        }
        //Remove the headers
        $('h1').remove();
        setStage(QUESTIONNAIRE);
    } else if (PROGRAM_STAGE == QUESTIONNAIRE) {
        //Only react to header clicks
        if (mouseY < 80) {
            //Check every marker
            let clickedIndex = -1;
            for (let i = 0; i < markers.length; i++) {
                //Calculate distance on axis
                let dx = mouseX - markers[i].x;
                let dy = mouseY - markers[i].y;
                //Skip this one if we're already too far away
                if (dx > 15 || dy > 15) continue;
                //Calculate distance
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 15) {
                    //This was the clicked one, break
                    clickedIndex = i;
                    break;
                }
            }
            //If we did click something, go to that question, also if we aren't there yet
            if (clickedIndex != -1 && clickedIndex != slideNumber) {
                gotoSlide(clickedIndex);
            }
        }
    } else if (PROGRAM_STAGE == OVERVIEW) {

    }
}

/**
 * Goto next slide
 */
function nextSlide() {
    gotoSlide(slideNumber + 1);
}

/**
 * Go to any slide
 */
function gotoSlide(num) {
    //See if we're going back
    let backwards = num < slideNumber;
    //Hide all current modals
    modals.map(function (m) { m.hide(backwards) });
    //Increase slidenumber
    slideNumber = num;
    //Make a new modal
    let modal = new Modal(getTitle(), getQuestion());
    //Switch slidenumber, to get the correct slide layout
    switch (slideNumber) {
        case 0:
            slideOne(modal);
            break;
        case 1:
            slideTwo(modal);
            break;
        case 2:
            slideThree(modal);
            break;
        case 3:
            slideFour(modal);
            break;
        case 4:
            slideFive(modal);
            break;
        case 5:
            slideSix(modal);
            break;
        case 6:
            slideSeven(modal);
            break;
        case 8:
            slideEight(modal);
            break;
        case 9:
            slideNine(modal);
            break;
        case 10:
            slideTen(modal);
            break;
        case 11:
            slideEleven(modal);
            break;
    }
    //Finally show the modal
    modal.show(backwards);
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
    //Draw the rect that hold   s the header
    fill(colorD);
    stroke(colorB);
    //Draw the rect
    rect(-10, -10, SKETCH_WIDTH + 20, 80);
    //Draw the question makrers depending on slideNumber
    drawSlideMarker(slideNumber);
    //Also check hover
    let hover = false;
    for (let i = 0; i < markers.length; i++) {
        //Calculate distance on axis
        let dx = mouseX - markers[i].x;
        let dy = mouseY - markers[i].y;
        //Skip this one if we're already too far away
        if (dx > 15 || dy > 15) continue;
        //Calculate distance
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 15) {
            //This was the clicked one, break
            hover = true;
        }
    }
    //Set the hand icon to be matching if we hover
    setHover(hover);
}

/**
 * Draw all the slides, and fill up until the number provided
 * @param {Number} num 
 */
function drawSlideMarker(num) {
    //See if we have to init marker array
    let createMarkers = false;
    if (markers.length == 0) createMarkers = true;
    //Some constants for spacing
    const startX = 140;
    const startY = 35;
    const stepX = 100;
    const radius = 30;
    //First draw a line
    strokeWeight(9);
    stroke(colorA);
    line(-10, startY, SKETCH_WIDTH + 20, startY);
    strokeWeight(3);
    let r2 = radius / 2;
    //For all questions
    for (let i = 0; i < 11; i++) {
        if (i < num) {//Questions we've had
            fill(colorC);
            stroke(colorA);
            if(i == 0) rect(i * stepX + startX - r2, startY - r2 , radius, radius);
            else ellipse(i * stepX + startX, startY, radius, radius);
        } else if (i > num) {//Question's we haven't reached
            fill(colorD);
            stroke(colorA);
            if(i == 0) rect(i * stepX + startX - r2, startY - r2, radius, radius);
            else ellipse(i * stepX + startX, startY, radius, radius);
        } else {//The question we're at right now
            fill(colorB);
            stroke(colorA);
            if(i == 0) rect(i * stepX + startX - r2, startY - r2, radius, radius);
            else ellipse(i * stepX + startX, startY, radius * 1.3, radius * 1.3);
        }
        //If we're making the marker array, add the coords
        if (createMarkers) markers.push({ x: i * stepX + startX, y: startY });
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