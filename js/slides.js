/**
 * SLIDES.JS
 * Contains all the creation and layout off the specific slides
 */
const listDone = {"two": false};

/**
 * Adds the components for slide one to the modal
 * @param {Modal} m 
 */
function slideOne(m){
    m.add(new Para(30, 120, SKETCH_WIDTH - 200, getS("INTRO")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        nextSlide();
    }));
}

/**
 * Adds all the extra stuff for the first name question
 * @param {Modal} m 
 */
function slideTwo(m){
    //If we have already done this, only do the vis part
    if(listDone.two) {
        visTwo(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visTwo(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visTwo(m);
    }));
}

/**
 * Changes the second slight into it's visualization
 * @param {Modal} m 
 */
function visTwo(m){
    //Set this question as answered
    listDone.two = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/piechart.png", 200, 230, -1, 300));
    m.add(new Para(30, 80, SKETCH_WIDTH - 200, getS("NAME")));
}