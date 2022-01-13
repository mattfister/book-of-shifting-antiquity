import tracery from '../utilities/tracery'
import alea from 'seedrandom';

export function generatePlant(page, contexts, genContexts=true) {
    
    tracery.setRandom(new alea(page));

    var grammar = tracery.createGrammar({
    
        "type": ["bush", "shrub", "plant"],
        "summary": "A #plantType.capitalize#"

    });

    grammar.addModifiers(tracery.baseEngModifiers);

    let plantType = grammar.flatten("#[plantType:#type#]type#");

    let summary = grammar.flatten("#[plantType:"+plantType+"]summary#");

    let name = "";
    let description = "";

    if (plantType === "bush" || plantType === "shrub" || plantType === "plant" ) {

        var plantGrammar = tracery.createGrammar({
            "syllable1": ["Al", "Il", "Mar", "Cal", "Dian", "Sen"],
            "syllable2": ["oe", "ti", "si", "chi", "li", "lie", "loe", "sel"],
            "syllable3": ["ella", "lis", "tis", "ria", "sum", "tum", "ta"],
            "nameWord": ["#syllable1##syllable2##syllable3#", "#syllable1##syllable2##syllable3#"],
            "name": ["#nameWord#", "#nameWord# #nameWord#", "#nameWord# #nameWord# #nameWord#"],

            "size": ["small", "medium-sized", "large"],
            "leafColor": ["dark-green", "green", "light-green", "yellow", "red", "orange"],

            "sentenceOne": "#plantName# is a #size# #plantType# with #size# #leafColor# leaves.",

            "flowerColor": ["light-blue", "pink", "white", "yellow", "red", "orange", "violet"],

            "flowerDescription": ["", " and blossom in clusters", " and grow on long stems" ],

            "sentenceTwo": "When it blooms, its flowers are #flowerColor##flowerDescription#.",

            "description": "#sentenceOne# #sentenceTwo#"
        })

        name = plantGrammar.flatten("#[plantName:#name#]name#");

        description = plantGrammar.flatten("#[plantName:" + name + "][plantType:" + plantType + "]description#");

    } else {

    }

    let title = name;
    let links = {};

    return {"title": title, "name": name, "description": description, "summary": summary, "type": "plant", "links": links}
}