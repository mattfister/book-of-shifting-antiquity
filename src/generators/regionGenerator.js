import tracery from '../utilities/tracery'
import { alea } from 'seedrandom';
import { generateContent } from './contentGenerator';
import { getContextLink, getContextSeedsFromSeedString, getPageSeedAndContext, getSeedForContentType } from '../utilities/SeedUtils';

export function generateRegion(page, contexts, genContexts=true) {
    
    tracery.setRandom(new alea(page));

    var grammar = tracery.createGrammar({    

        "nameStart": ["Qu", "W", "R", "T", "Y", "O", "P", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "C", "V", "B", "N", "M"],
        "nameVowel": ["a", "e", "i", "o", "ou", "oo", "u", "au"],
        "nameConsonant": ["qu", "w", "r", "t", "y", "o", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "c", "v", "b", "n", "m"],
        "name": ["#nameStart##nameVowel#", "#nameStart##nameVowel##nameConsonant#", "#nameStart##nameVowel##nameConsonant##nameVowel##nameConsonant#"],

        "descriptor": ["Expance", "Waste", "Area", "Zone"],
        "fullName": "The #name# #nameDescriptor#",
        "summary": "#nameDescriptor.a.capitalize#",

        "climate": ["temperate", "arid", "hot", "tropical", "frigid", "arctic"],
        "geography": ["island", "mountain", "forest", "plain", "desert", "coast"],

        "description": ["#name# is a #climate# #geography#."],
    });

    grammar.addModifiers(tracery.baseEngModifiers);
    
    let nameDescriptor = grammar.flatten("#[nameDescriptor:#descriptor#]descriptor#")
    let name = grammar.flatten("#[nameDescriptor:"+nameDescriptor+"]fullName#");


    let title = name;

    let description = grammar.flatten("#[name:"+name+"]description#")
    let summary = grammar.flatten("#[nameDescriptor:"+nameDescriptor+"]summary#")

    let links = {}
    if (genContexts) {
        contexts.forEach(context => {
            let content = generateContent(context, [page], false);
            if (content.type === "city") {
                description += " " + content.name + " is located in the " + name +".";
                links[content.name] = getContextLink(context, [page]);
            } else if (content.type === "region") {
                description += " It is located adjacent to " + content.name + "."
                links[content.name] = getContextLink(context, [page]);
            }
            
        }) 
    }

    return {"title": title, "name": name, "description": description, "summary": summary, "type": "region", "links": links}
}