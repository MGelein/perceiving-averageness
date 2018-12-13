/**
 * SLIDES.JS
 * Contains all the creation and layout off the specific slides
 */
/**
 * Adds the components for slide one to the modal
 * @param {Modal} m 
 */
function slideOne(m){
    m.add(new Para(30, 120, SKETCH_WIDTH - 200, getS("INTRO")));
    m.add(new Button(getS("CONTINUE"), 30, 600, function(){
        console.log("yeah");
    }));
}