/**
 * SLIDES.JS
 * Contains all the creation and layout off the specific slides
 */
const listDone = {};
listDone.one = listDone.two = listDone.three = listDone.four = listDone.five = listDone.six = listDone.seven = false;
listDone.eight = listDone.nine = listDone.ten = listDone.eleven = false;

/**
 * Adds the components for slide one to the modal
 * @param {Modal} m 
 */
function slideOne(m){
    m.add(new Para(30, 120, SKETCH_WIDTH - 180, getS("INTRO")));
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
    m.add(new Para(30, 80, SKETCH_WIDTH - 160, getS("NAME_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}

/**
 * Adds all the extra stuff for the surname question
 * @param {Modal} m 
 */
function slideThree(m){
    //If we have already done this, only do the vis part
    if(listDone.three) {
        visThree(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visThree(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visThree(m);
    }));
}

/**
 * Changes the third slide into it's visualization
 * @param {Modal} m 
 */
function visThree(m){
    //Set this question as answered
    listDone.three = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/surnames.png", 240, 230, -1, 330));
    m.add(new Para(30, 80, SKETCH_WIDTH - 80, getS("SURNAME_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}

/**
 * All extra stuff for the age question
 * @param {Modal} m 
 */
function slideFour(m){
    if(listDone.four) {
        visFour(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visFour(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visFour(m);
    }));
}

/**
 * Changes the fourth slide into it's visualization
 * @param {Modal} m 
 */
function visFour(m){
    //Set this question as answered
    listDone.four = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/age.png", 200, 230, -1, 300));
    m.add(new Para(30, 80, SKETCH_WIDTH - 80, getS("AGE_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}


/**
 * All extra stuff for the gender question
 * @param {Modal} m 
 */
function slideFive(m){
    if(listDone.five) {
        visFive(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visFive(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visFive(m);
    }));
}

/**
 * Changes the fifth slide into it's visualization
 * @param {Modal} m 
 */
function visFive(m){
    //Set this question as answered
    listDone.five = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/gender.png", 200, 230, -1, 300));
    m.add(new Para(30, 80, SKETCH_WIDTH - 80, getS("GENDER_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}

/**
 * All extra stuff for the length question
 * @param {Modal} m 
 */
function slideSix(m){
    if(listDone.six) {
        visSix(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visSix(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visSix(m);
    }));
}

/**
 * Changes the sixth slide into it's visualization
 * @param {Modal} m 
 */
function visSix(m){
    //Set this question as answered
    listDone.six = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/height.png", 200, 230, -1, 300));
    m.add(new Para(30, 80, SKETCH_WIDTH - 80, getS("LENGTH_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}

/**
 * All extra stuff for the weight question
 * @param {Modal} m 
 */
function slideSeven(m){
    if(listDone.seven) {
        visSeven(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visSeven(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visSeven(m);
    }));
}

/**
 * Changes the seventh slide into it's visualization
 * @param {Modal} m 
 */
function visSeven(m){
    //Set this question as answered
    listDone.seven = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/piechart.png", 200, 230, -1, 300));
    m.add(new Para(30, 80, SKETCH_WIDTH - 80, getS("WEIGHT_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}

/**
 * All extra stuff for the education question
 * @param {Modal} m 
 */
function slideEight(m){
    if(listDone.eight) {
        visEight(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visEight(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visEight(m);
    }));
}

/**
 * Changes the eigth slide into it's visualization
 * @param {Modal} m 
 */
function visEight(m){
    //Set this question as answered
    listDone.eight = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/education.png", 200, 230, -1, 300));
    m.add(new Para(30, 80, SKETCH_WIDTH - 80, getS("EDUCATION_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}

/**
 * All extra stuff for the income question
 * @param {Modal} m 
 */
function slideNine(m){
    if(listDone.nine) {
        visNine(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visNine(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visNine(m);
    }));
}

/**
 * Changes the ninth slide into it's visualization
 * @param {Modal} m 
 */
function visNine(m){
    //Set this question as answered
    listDone.nine = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/income.png", 200, 230, -1, 300));
    m.add(new Para(30, 80, SKETCH_WIDTH - 80, getS("INCOME_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}

/**
 * All extra stuff for the marital status question
 * @param {Modal} m 
 */
function slideTen(m){
    if(listDone.ten) {
        visTen(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visTen(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visTen(m);
    }));
}

/**
 * Changes the tenth slide into it's visualization
 * @param {Modal} m 
 */
function visTen(m){
    //Set this question as answered
    listDone.ten = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/marital.gif", 200, 230, -1, 300));
    m.add(new Para(30, 80, SKETCH_WIDTH - 80, getS("MARITAL_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}

/**
 * All extra stuff for the migration question
 * @param {Modal} m 
 */
function slideEleven(m){
    if(listDone.eleven) {
        visEleven(m);
        return;
    }
    //Else display the question
    m.add(new InputField(getS("TYPE_HERE"), 30, 150, function(event){
        //Catch enter to also show vis
        if(event.keyCode == 13){
            visEleven(m);
        }
    }));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto data visualization
        visEleven(m);
    }));
}

/**
 * Changes the eleventh slide into it's visualization
 * @param {Modal} m 
 */
function visEleven(m){
    //Set this question as answered
    listDone.eleven = true;
    //Empty the visualization
    m.empty();
    //Now add the new things
    m.add(new Picture("data/img/piechart.png", 200, 230, -1, 300));
    m.add(new Para(30, 80, SKETCH_WIDTH - 80, getS("MIGRATION_RESULT")));
    m.add(new Button(getS("CONTINUE"), 30, 400, function(){
        //Goto next Slide
        nextSlide();
    }));
}

/**
 * The final slide in the presentation. This is the overview slide.
 * @param {Modal} m 
 */
function slideFinal(m){
    
}