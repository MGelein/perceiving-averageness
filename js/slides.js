/**
 * SLIDES.JS
 * Contains all the creation and layout off the specific slides
 */
/**
 * Adds the components for slide one to the modal
 * @param {Modal} m 
 */
function slideOne(m){
    //Show the question
    m.add(new Question(getS("LANG_SELECT")))
    //Nederlands button, set language and go to next slide
    m.add(new Button("Nederlands", 30, 200, function(){
        setLanguage(DUTCH);
        nextSlide();
    }));
    //English utton, set language and go to next slide
    m.add(new Button("English", 300, 200), function(){
        setLanguage(ENGLISH);
        nextSlide();
    });
}