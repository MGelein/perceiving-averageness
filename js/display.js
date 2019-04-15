/**
 * DISPLAY.JS
 * This document contains all the classes that are used to
 * display shit on screen
 */
const MODAL_Y = 100;
const MODAL_W = 1200;
const MODAL_H = 530;
const MODAL_X = 40;
const SHADOW_OFF = 4;

/**
 * Creates a new modal
 */
function Modal(titleText, questionText) {
    //Create the title and question
    let title = new Title(titleText);
    let question = new Question(questionText);
    //The position we're currently at
    this.pos = { x: 2000, y: MODAL_Y };
    //The position we want to be in
    this.targetPos = { x: 2000, y: MODAL_Y };
    //If we're on our way out
    this.dying = false;
    //If we're ready to be removed
    this.dead = false;
    //List of components that we need to render
    this.components = [title, question];

    /**
     * Updates this modal, makes it move etc.
     */
    this.update = function () {
        //See how far we are removed from the target position
        let dx = this.pos.x - this.targetPos.x;
        let dy = this.pos.y - this.targetPos.y;
        //See if we're close to the target, if we're dying and close enough, we can be removed from the list of modals
        if (abs(dx + dy) < 0.5 && this.dying) {
            this.dead = true;
            //And remove all components
            this.components.forEach(function (c) {
                //Remove these DOM elements
                $('#' + c.id).remove()
            });
            this.components = [];
        }
        //Now ease towards that position
        this.pos.x -= dx * EASE_FACTOR;
        this.pos.y -= dy * EASE_FACTOR;
    }

    /**
     * Adds a new component to this modal
     */
    this.add = function (comp) {
        this.components.push(comp);
    }

    /**
     * Removes everything but the title component
     */
    this.empty = function(){
        //Save the title
        let title = this.components[0];
        //And remove all components
        this.components.forEach(function (c) {
            //Skip the title
            if(c == title) return;
            //Remove these DOM elements
            $('#' + c.id).fadeOut();
        });
    }

    /**
     * Set target position outside of the screen
     */
    this.hide = function (backwards) {
        //Ignore any more hide commands after you've had one
        if (this.dying) return;
        //Explicitly set backwards to false if not set
        if (!backwards) backwards = false;
        //Set target position outside of screen
        this.targetPos = { x: -MODAL_W - MODAL_X, y: MODAL_Y };
        //Dissappear on the other side
        if (backwards) this.targetPos = { x: MODAL_W * 2, y: MODAL_Y };
        //Set dying to true
        this.dying = true;
    }

    /**
     * Set the target position inside of the screen
     */
    this.show = function (backwards) {
        //Explicitly set backwards to false if not set
        if (!backwards) backwards = false;
        //Set target position inside of the screen
        this.targetPos = { x: MODAL_X, y: MODAL_Y };
        //If we're coming in from the other position, set us to come from there
        if (backwards) this.pos = { x: -MODAL_W - MODAL_X, y: MODAL_Y };
        //Set dying to false
        this.dying = false;
        //Add myself to the list of modals
        modals.push(this);
    }


    /**
     * Render this modal
     */
    this.render = function () {
        //Don't draw if out of bounds
        if (this.pos.x > width || this.pos.x < -MODAL_W) return;
        if (this.pos.y > height || this.pos.y < -MODAL_H) return;
        //First draw a dropshadow
        noStroke();
        fill(0, 80);//Translucent black
        //Draw the rectangle
        rect(this.pos.x + SHADOW_OFF, this.pos.y + SHADOW_OFF, MODAL_W, MODAL_H, 10);
        //Now draw the rect shadow
        //Fill the rectangle
        stroke(colorB);
        fill(colorD);
        //Draw the rectangle
        rect(this.pos.x, this.pos.y, MODAL_W, MODAL_H, 10);
        var selfRef = this;

        //Now render each of the components
        this.components.forEach(function (c) { c.render(selfRef) });
    }
}

/**
 * Creates a new Title component for the modals
 */
function Title(text) {
    //Save the text we're going to draw
    this.string = text;
    //Our own position, relative to the modal
    this.pos = { x: 30, y: 10 };
    //Make this text have an id of its milliseconds creation time
    this.id = "title_" + (new Date()).getTime() + "-" + compCount;
    compCount ++;
    //Create the component
    add(this.id, "h1", text);

    /**
     * Renders this component
     */
    this.render = function (modal) {
        //Set the position according to the modal position, and our position
        pos(this.id, modal.pos.x + this.pos.x, modal.pos.y + this.pos.y);
    }
}

/**
 * Creates a new question component to show
 * @param {String} text 
 */
function Question(text) {
    //Save the text we're going to draw
    this.string = text;
    //Our own position, relative to the modal
    this.pos = { x: 30, y: 80 };
    //Make this text have an id of its milliseconds creation time
    this.id = "question_" + (new Date()).getTime() + "-" + compCount;
    compCount++;
    //Create the component
    add(this.id, "h3", text);

    /**
     * Renders this component
     */
    this.render = function (modal) {
        //Set the position according to the modal position, and our position
        pos(this.id, modal.pos.x + this.pos.x, modal.pos.y + this.pos.y);
    }
}

/**
 * Creates a new button component with the provided text
 * @param {String} text 
 * @param {Number} posX
 * @param {Number} posY
 * @param {Function} callBackFn click handler
 */
function Button(text, posX, posY, callBackFn) {
    //Save the text we're going to draw
    this.string = text;
    //Our own position, relative to the modal
    this.pos = { x: posX, y: posY };
    //Make this text have an id of its milliseconds creation time
    this.id = "question_" + (new Date()).getTime() + "-" + compCount;
    compCount ++;
    //Create the component
    let jqRef = add(this.id, "button", text).addClass('btn btn-primary btn-lg');
    $('#' + this.id).unbind('click').click(callBackFn);

    /**
     * Renders this component
     */
    this.render = function (modal) {
        //Set the position according to the modal position, and our position
        pos(this.id, modal.pos.x + this.pos.x, modal.pos.y + this.pos.y);
    }
}

/**
 * Creates a new text input. This can be used to receive text from the user.
 * @param {String} placeHolder 
 * @param {Number} posX 
 * @param {Number} posY 
 * @param {Function} callBackFn 
 */
function InputField(placeHolder, posX, posY, callBackFn){
    //Save the text we're going to draw
    this.string = placeHolder;
    //Our own position, relative to the modal
    this.pos = { x: posX, y: posY };
    //Make this text have an id of its milliseconds creation time
    this.id = "Input_" + (new Date()).getTime() + "-" + compCount;
    compCount ++;
    //Create the component
    let jqRef = add(this.id, "input", "").addClass('form-control');
    $('#' + this.id).unbind('keyup').keyup((event) => {callBackFn(event)}).attr('type', 'text');
    jqRef.attr('placeholder', placeHolder).addClass('textfield');

    /**
     * Renders this component
     */
    this.render = function (modal) {
        //Set the position according to the modal position, and our position
        pos(this.id, modal.pos.x + this.pos.x, modal.pos.y + this.pos.y);
    }
}

/**
 * Creates a new slider input. This can be used to receive text from the user.
 * @param {Number} posX 
 * @param {Number} posY 
 * @param {Number} min
 * @param {Number} max
 * @param {Number} step
 * @param {Function} callBackFn 
 */
function InputSlider(posX, posY, min, max, step, callBackFn){
    //Our own position, relative to the modal
    this.pos = { x: posX, y: posY };
    //Make this text have an id of its milliseconds creation time
    this.id = "Input_" + (new Date()).getTime() + "-" + compCount;
    compCount ++;
    //Create the component
    this.jqRef = add(this.id, "input", "").addClass('form-control');
    $('#' + this.id).unbind('change').change((event) => {callBackFn(event)}).attr('type', 'range');
    this.jqRef.attr('step', step).attr('min', min).attr('max', max).attr('style', 'width:600px;');

    /**
     * Renders this component
     */
    this.render = function (modal) {
        //Set the position according to the modal position, and our position
        pos(this.id, modal.pos.x + this.pos.x, modal.pos.y + this.pos.y);
    }
}

/**
 * Creates a new Image
 * @param {String} url
 * @param {Number} posX 
 * @param {Number} posY 
 * @param {Number} w
 * @param {Number} h
 */
function Picture(url, posX, posY, w, h){
    //Our own position, relative to the modal
    this.pos = { x: posX, y: posY };
    //Make this text have an id of its milliseconds creation time
    this.id = "Image_" + (new Date()).getTime() + "-" + compCount;
    compCount ++;
    //Create the component
    this.jqRef = add(this.id, "img", "").attr('src', url);
    if(w && w != -1) this.jqRef.attr('width', w);
    if(h && h != -1) this.jqRef.attr('height', h);

    /**
     * Renders this component
     */
    this.render = function (modal) {
        //Set the position according to the modal position, and our position
        pos(this.id, modal.pos.x + this.pos.x, modal.pos.y + this.pos.y);
    }
}

/**
 * Adds a paragraph to the components list
 * @param {Number} posX 
 * @param {Number} posY 
 * @param {Number} width 
 * @param {String} text 
 */
function Para(posX, posY, width, text) {
    //Save the text we're going to draw
    this.string = text;
    //Our own position, relative to the modal
    this.pos = { x: posX, y: posY };
    //Make this text have an id of its milliseconds creation time
    this.id = "par_" + (new Date()).getTime() + "-" + compCount;
    compCount ++;
    //Create the component
    this.jqRef = par(this.id, width, text);

    /**
     * Renders this component
     */
    this.render = function (modal) {
        //Set the position according to the modal position, and our position
        pos(this.id, modal.pos.x + this.pos.x, modal.pos.y + this.pos.y);
    }

    /**
     * Sets the text to something new
     */
    this.setText = function(s){
        this.jqRef.html(s);
    }
}