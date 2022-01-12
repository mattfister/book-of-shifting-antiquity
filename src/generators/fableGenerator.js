import tracery from '../utilities/tracery'
import alea from 'seedrandom';

export function generateFable(page, contexts, genContexts=true) {
    
    tracery.setRandom(new alea(page));

    var grammar = tracery.createGrammar({
        "title": "Fables",
    
        "typeOfStory": ["Tale", "Fable", "Myth", "Legend"],
        "name": ["The #typeOfStory# of the #subject# and the #object#"],

        "character": ["Turtle", "Frog", "Scorpion", "Snake", "Bear", "Antelope", "Wizard", "Fairy Queen", "Fairy", "Knight", "Warlock", "Witch", "Baker", "King", "Queen", "Merchant"],
        "charAdj": ["wise", "foolish", "stupid", "greedy", "strange"],

        "subjectMaybeAdj": ["#subject#", "#subjectAdj# #subject#"],

        "action": ["who set out to see the world", "who lived in a small hamlet", "who had gotten hurt", "who wanted #subjectsDesire#", "who wanted #subjectsDesire#, because it had been lost"],

        "opening": ["Many years ago,", "A long time ago,", "In an era that predated our time,", "Once upon a time,"],
        "setup": ["there once was", "there lived", "there was"],
        
        "sentenceOne": "#opening# #setup# a #subjectAdj# #subject# #action#.",

        "weather": ["sunny", "calm", "snowy", "dreary", "rainy"],
        "time": ["morning", "afternoon", "evening"],
        "when": "On a #weather# #time#,",

        "sentenceTwo": "#when# the #subject# met a #objectAdj# #object#.",

        "desire": ["money", "love", "sanity", "food", "magic spells", "sense of purpose", "sight", ],
        "interaction": ["asked the #object# for #subjectsDesire#",],

        "negativeResponseAction": ["refused", "ran away", "hid from the #subjectMaybeAdj#", "struck the #subjectMaybeAdj#"],
        "negativeResponse" : ["but the #object# #negativeResponseAction#"],

        "response" : ["#negativeResponse#"],
        "sentenceThree": "The #subjectMaybeAdj# #interaction# #response#.",

        "subjectWhine" : ['"Oh poor me!"', '"Oh no!"', '"Uh-oh!"', '"What shall I do?"', '"Oh #subjectAdj# me!"'],
        "sentenceFour" : ["#subjectWhine# said the #subjectMaybeAdj#.", "#subjectWhine# #subjectWhine# said the #subjectMaybeAdj#."],

        "hostileAction" : ["trick", "steal from", "fight", "attack", "deceive", "hoodwink", "fool", "double-cross", "outwit", "rob"],
        "sentenceFive" : ["In the face of this difficulty, the #subjectMaybeAdj# decided to #hostileAction# the #object#."],

        "sentenceSix" : ["The #subjectMaybeAdj# waited until a #weather# #time#, and put its plan into action."],

        "positiveMorals" : ["Always take what you deserve.", "Never count yourself out.", "A well made plan pays off."],
        "positiveEnding" : ["It worked! The #subjectMaybeAdj# got #subjectsDesire# from the #object#. The moral of this story: #positiveMorals#"],

        "negativeMorals" : ["A #object# can't be beat.", "Never try to take what you did not earn.", "If you are #subjectAdj# you won't succeed."],
        "negativeEnding" : ["It did not work! The #subjectMaybeAdj# did not get #subjectsDesire# from the #object#. The moral of this story: #negativeMorals#"],

        "sentenceSeven" : ["#positiveEnding#", "#negativeEnding#"],

        "story": "#sentenceOne# #sentenceTwo# #sentenceThree# #sentenceFour# #sentenceFive# #sentenceSix# #sentenceSeven#"

    });

    grammar.addModifiers(tracery.baseEngModifiers);

    let subject = grammar.flatten("#[subject:#character#]subject#")
    let subjectAdj = grammar.flatten("#[subjectAdj:#charAdj#]subjectAdj#")
    
    let object = grammar.flatten("#[object:#character#]object#")
    let objectAdj = grammar.flatten("#[objectAdj:#charAdj#]objectAdj#")

    console.log(object);
    
    let name = grammar.flatten("#[subject:"+subject+"][object:"+object+"]name#");
    let title = name;

    let description = grammar.flatten("#[subject:"+subject+"][subjectAdj:"+subjectAdj+"][object:"+object+"][objectAdj:"+objectAdj+"][subjectsDesire:#desire#][objectAdj:"+objectAdj+"]story#");
    let summary = "A Well-Known Fable";

    let links = {};

    return {"title": title, "name": name, "description": description, "summary": summary, "type": "fable", "links": links}
}