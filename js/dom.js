/**
 * DOM.JS
 * In this file some methods reside that can be used to interact with HTML elements.
 * This is mostly to interact with native elements for input, such as textareas, sliders,
 * radiobuttons etc.
 */

//The factor that the screen is larger compared to 1280x720
var RESIZE_FACTOR = 0;
//The easing factor.
const EASE_FACTOR = 0.1;

 /**
  * JQuery entry point, this will probably trigger the loading of the external data files.
  * Also calculates the resize factor.
  */
$(document).ready(function(){
    //Add a resize handler
    $(window).resize(function(){
        //Calculate the resize factor
        RESIZE_FACTOR = window.innerWidth / SKETCH_WIDTH;
    });
    //Also actually trigger it a first time
    $(window).resize();
    //Prevent caching of AJAX requests
    $.ajaxSetup({cache:false});
    //Load the language file
    loadLang();
});

//If we use the hand icon
var USE_POINTER = false
/**
 * Sets the hoverhand status on the document, used to make 
 * onhover effects
 * @param {Boolean} enabled 
 */
function setHover(enabled){
    if(USE_POINTER != enabled){//Only change CSS if we're really changing shit
        if(enabled) $('body').attr('style', 'cursor:pointer;');
        else $('body').attr('style', 'cursor:default;');
        //Now also update the flag
        USE_POINTER = enabled;
    }
}


/**
 * Adds a new element to the document. Use the provided tagname and
 * tagContent.
 * @param {String} id   the id we have to give to the entity
 * @param {String} tagName  the name of the tag. f.e. h1
 * @param {String} innerHTML the content of the tag. Can be text but also more HTML.
 * @return the JQuery selection of the element
 */
function addElement(id, tagName, innerHTML){
    //Append the html for the new object
    $('body').append("<" + tagName + " style='display:none;' id='" + id + "'>" + innerHTML + "</" + tagName + ">");
    //Set the position of the element offscreen
    pos(id, -10000, -10000);
    //Show the object
    $('#' + id).show();
    //now return the object we added
    return $('#' + id);
}
/**
 * Adds a new element to the document. Use the provided tagname and
 * tagContent.
 * @param {String} id   the id we have to give to the entity
 * @param {String} tagName  the name of the tag. f.e. h1
 * @param {String} innerHTML the content of the tag. Can be text but also more HTML.
 * @return the JQuery selection of the element
 */
const add = addElement;

/**
 * Adds a new paragraph, and returns a reference to the JQ selection
 * @param {String} id 
 * @param {Number} width 
 * @param {The text} text 
 * @return the JQuery selection of the element
 */
function par(id, width, text){
    return add(id, "p", text).attr('style', 'width: ' + width + 'px;');
}

/**
 * Sets the element with the given id to the provided positions
 * @param {String} id  the id of the element
 * @param {Number} x   the x-coord we have to place the element at.
 * @param {Number} y   the y-coord we have to place the element at.
 * @return the JQuery object that we modified
 */
function setPosition(id, x, y){
    //Check if the id contains a hash, if so, remove it.
    id = id.replace(/#/g, '');
    //Calculate the change factor
    x *= RESIZE_FACTOR;
    y *= RESIZE_FACTOR;
    //Set the position of the element
    $('#' + id).offset({top: y, left: x});
    //Return the object we moved
    return $('#' + id);
}
/**
 * Sets the element with the given id to the provided positions
 * @param {String} id  the id of the element
 * @param {Number} x   the x-coord we have to place the element at.
 * @param {Number} y   the y-coord we have to place the element at.
 * @return the JQuery object that we modified
 */
const pos = setPosition;