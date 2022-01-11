import tracery from '../utilities/tracery'
import seedrandom from 'seedrandom';

export function generateFable(page, contexts, genContexts=true) {
    
    tracery.setRandom(new seedrandom(page));

    var grammar = tracery.createGrammar({
        "title": "Fables",
    
        "typeOfStory": ["Tale", "Fable", "Myth", "Legend"],
        "name": ["The #typeOfStory# of the #subject# and the #object#"],

        "character": ["Turtle", "Frog", "Scorpion", "Snake", "Bear", "Antelope", "Wizard", "Fairy Queen", "Fairy", "Knight", "Warlock", "Witch", "Baker", "King", "Queen", "Merchant"],
        "charAdj": ["wise", "foolish", "stupid", "greedy", "strange"],

        "subjectMaybeAdj": ["#subject#", "#subjectAdj# #subject#"],

        "action": ["who set out to see the world", "who lived in a small hamlet", "who had gotten hurt", "who lost its jewelry"],

        "opening": ["Many years ago,", "A long time ago,", "In an era that predated our time,", "Once upon a time,"],
        "setup": ["there once was", "there lived", "there was"],
        
        "sentenceOne": "#opening# #setup# a #charAdj# #subject# #action#.",

        "weather": ["sunny", "calm", "snowy", "dreary", "rainy"],
        "time": ["morning", "afternoon", "evening"],
        "when": "On a #weather# #time#,",

        "sentenceTwo": "#when# the #subject# met a #objectAdj# #object#.",

        "desire": ["money", "help", "a place to sleep", "food"],
        "interaction": ["asked the #object# for #desire#", "fought the #object# fiercely"],

        "negativeResponseAction": ["refused", "ran away", "hid from the #subjectMaybeAdj#", "struck the #subjectMaybeAdj#"],
        "negativeResponse" : ["but the #object# #negativeResponseAction#"],

        "positiveResponseAction": ["accepted", "granted it",],
        "positiveResponse" : ["and the #object# #positiveResponseAction#"],

        "response" : ["#positiveResponse#", "#negativeResponse#"],
        "sentenceThree": "The #subjectMaybeAdj# #interaction# #response#.",

        "story": "#sentenceOne# #sentenceTwo# #sentenceThree#"
    });

    grammar.addModifiers(tracery.baseEngModifiers);

    let subject = grammar.flatten("#[subject:#character#]subject#")
    let subjectAdj = grammar.flatten("#[subjectAdj:#charAdj#]subjectAdj#")
    
    let object = grammar.flatten("#[object:#character#]object#")
    let objectAdj = grammar.flatten("#[objectAdj:#charAdj#]objectAdj#")

    console.log(object);
    
    let name = grammar.flatten("#[subject:"+subject+"][object:"+object+"]name#");
    let title = name;

    let description = grammar.flatten("#[subject:"+subject+"][subjectAdj:"+subjectAdj+"][object:"+object+"][objectAdj:"+objectAdj+"]story#");
    let summary = "A Well-Known Fable";

    let links = {};

    return {"title": title, "name": name, "description": description, "summary": summary, "type": "fable", "links": links}
}