/**
 * LANG.JS
 * Holds all the lanugage functionality, this file is used to load and take care of internationalization.
 * Basically loads an external file that has definitions for both languages this application supports, and 
 * depending on the currently active language, it will return the correct phrase tied to a specific language.
 */

//Language constant, used to set the language
const ENGLISH = 0;
//Lanuage constant, used to set the language
const DUTCH = 1;
//Holds the currently active language, default is ENGLISH
var LANGUAGE = ENGLISH;

//The language database, holds all the lanugage values in a hash table like structure
var langDB = {};

/**
 * Starts loading and parsing the language file
 */
function loadLang(){
    $.get("data/lang.hsv?v=3", function(response){
        //Remove any carriage returns
        response = response.replace(/\r/g, '');
        //Split on newlines;
        let lines = response.split("\n");
        //Go through each line and parse into lang file
        lines.forEach(function(line){
            //Split everything by tabs
            let parts = line.split("#");
            //Ignore the header line
            if(parts[0] === 'NAME') return;
            //Now parse each part
            langDB[parts[0]] = {
                nl: parts[1],
                en: parts[2]
            }
        });
    });
}

/**
 * Sets the active language to one of the provided languages
 * @param {Integer} lang  ENGLISH || DUTCH
 */
function setLanguage(lang){
    //Check if it is a recognized language
    if(lang != ENGLISH && lang != DUTCH) {
        console.error("Unrecognized language: " + lang);
    }
    //If it is, set the current language to it
    LANGUAGE = lang;
}

/**
 * Gets the internationalized String for the provided name. 
 * @param {String} name the name of the internationalized string
 */
function getS(name){
    //Check if the DB has the entry
    let pair = langDB[name];
    //If no, return only name
    if(!pair) return name;
    //If we have the pair, return the correct one for the active language
    return LANGUAGE == ENGLISH ? pair.en : pair.nl;
}