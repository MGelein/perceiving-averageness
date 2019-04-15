/**
 * SLIDES.JS
 * Contains all the creation and layout off the specific slides
 */
const listDone = {};
listDone.one = listDone.two = listDone.three = listDone.four = listDone.five = listDone.six = listDone.seven = false;
listDone.eight = listDone.nine = listDone.ten = listDone.eleven = false;

//If we've seen the overview
var finalSeen = false;

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
    m.add(new Para(30, 200, 200, getS("OR")));
    let p = new Para(580, 250, 100, "50");
    m.add(p);
    m.add(new InputSlider(30, 260, 1, 120, 1, function(event){
        p.setText($(event.target).val());
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
    let nextF = function(){
        visFive(m);
    }
    //Else display the question
    let male = new Picture("data/img/male.png", 30, 160, -1, 200);
    male.jqRef.addClass('hoverable').click(nextF);
    let female = new Picture("data/img/female.png", 530, 160, -1, 200);
    female.jqRef.addClass('hoverable').click(nextF);
    let non = new Picture("data/img/non-binary.png", 265, 160, -1, 200);
    non.jqRef.addClass('hoverable').click(nextF);
    m.add(male);
    m.add(non);
    m.add(female);
    m.add(new Para(50, 330, 200, getS("M")));
    m.add(new Para(285, 330, 200, getS("NB")));
    m.add(new Para(550, 330, 200, getS("F")));
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
    m.add(new Para(30, 200, 200, getS("OR")));
    let p = new Para(580, 250, 100, "150cm");
    m.add(p);
    m.add(new InputSlider(30, 260, 120, 230, 1, function(event){
        p.setText($(event.target).val() + "cm");
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
    m.add(new Para(30, 200, 200, getS("OR")));
    let p = new Para(580, 250, 100, "50kg");
    m.add(p);
    
    m.add(new InputSlider(30, 260, 50, 120, 1, function(event){
        p.setText($(event.target).val() + "kg");
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
    let nextF = function(){visEight(m)};
    let hs = new Picture("data/img/highschool.png", 30, 160, 150, -1);
    hs.jqRef.addClass('hoverable').click(nextF);
    let mbo = new Picture("data/img/highschool.png", 200, 160, 150, -1);
    mbo.jqRef.addClass('hoverable').click(nextF);
    let hbo = new Picture("data/img/highschool.png", 370, 160, 150, -1);
    hbo.jqRef.addClass('hoverable').click(nextF);
    let ba = new Picture("data/img/university.png", 540, 160, 150, -1);
    ba.jqRef.addClass('hoverable').click(nextF);
    let ma = new Picture("data/img/university.png", 710, 160, 150, -1);
    ma.jqRef.addClass('hoverable').click(nextF);
    let phd = new Picture("data/img/university.png", 880, 160, 150, -1);
    phd.jqRef.addClass('hoverable').click(nextF);
    m.add(hs); m.add(mbo); m.add(hbo); m.add(ba); m.add(ma); m.add(phd);
    m.add(new Para(40, 280, 100, getS("HS")));
    m.add(new Para(210, 280, 100, getS("MBO")));
    m.add(new Para(380, 280, 100, getS("HBO")));
    m.add(new Para(550, 280, 100, getS("BA")));
    m.add(new Para(720, 280, 100, getS("MA")));
    m.add(new Para(890, 280, 100, getS("PHD")));
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
    let nextF = function(){visTen(m)};
    let single = new Picture("data/img/single.png", 130, 140, -1, 250);
    single.jqRef.addClass('hoverable').click(nextF);
    let married = new Picture("data/img/married.png", 380, 140, -1, 250);
    married.jqRef.addClass('hoverable').click(nextF);
    let widow = new Picture("data/img/widow.png", 600, 140, -1, 250);
    widow.jqRef.addClass('hoverable').click(nextF);
    let divorced = new Picture("data/img/divorced.png", 850, 140, -1, 250);
    divorced.jqRef.addClass('hoverable').click(nextF);
    m.add(single); m.add(married); m.add(widow); m.add(divorced);
    m.add(new Para(140, 360, 100, getS("SINGLE")));
    m.add(new Para(390, 360, 100, getS("MARRIED")));
    m.add(new Para(600, 360, 100, getS("WIDOW")));
    m.add(new Para(860, 360, 100, getS("DIVORCED")));
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
    m.add(new Picture("data/img/marital.gif", 400, 230, -1, 300));
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
    let world = new Picture("data/img/world.png", 130, 130, -1, 400);
    world.jqRef.click(function(){
        visEleven(m);
    });
    m.add(world);
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
    let world = new Picture("data/img/migration.png", 200, 230, -1, 300);
    m.add(world);
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
    //Rename the continue button
    langDB["CONTINUE"] = {nl: "Overzicht", en:"Overview"};
    finalSeen = true;
    //Create all the buttons
    m.add(new Button(getS("TITLE_1"), 30, 140, function(){gotoSlide(1);}));
    m.add(new Button(getS("TITLE_2"), 30, 200, function(){gotoSlide(2);}));
    m.add(new Button(getS("TITLE_3"), 30, 260, function(){gotoSlide(3);}));
    m.add(new Button(getS("TITLE_4"), 30, 320, function(){gotoSlide(4);}));
    m.add(new Button(getS("TITLE_5"), 30, 380, function(){gotoSlide(5);}));
    m.add(new Button(getS("TITLE_6"), 330, 140, function(){gotoSlide(6);}));
    m.add(new Button(getS("TITLE_7"), 330, 200, function(){gotoSlide(7);}));
    m.add(new Button(getS("TITLE_8"), 330, 260, function(){gotoSlide(8);}));
    m.add(new Button(getS("TITLE_9"), 330, 320, function(){gotoSlide(9);}));
    m.add(new Button(getS("TITLE_10"), 330, 380, function(){gotoSlide(10);}));
}