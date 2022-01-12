import tracery from '../utilities/tracery'
import { alea } from 'seedrandom';
import { generateContent } from './contentGenerator';
import { getContextLink, getContextSeedsFromPath, getPageLink } from '../utilities/SeedUtils';


export function generateCity(page, contexts, genContexts=true) {
    
    tracery.setRandom(new alea(page));

    var grammar = tracery.createGrammar({    

        "nameStart": ["Ab", "Arr", "At", "Ap", "As", "Ad", "T", "Y", "P", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
        "nameSyl": ["ia","ar","us","os","in","it","ix","ast","or","arth","irth","aunt","as","y", "asgard", "imont"],
        "name": ["#nameStart##nameSyl#", "#nameStart##nameSyl##nameSyl#", "#nameStart##nameSyl##nameSyl##nameSyl#", "#nameStart##nameSyl# #nameStart##nameSyl#"],
        "size": ["small", "large"],
        "type": ["village", "town", "hamlet", "city"],
        "description": "#name# is a #size# #type#."
    });

    grammar.addModifiers(tracery.baseEngModifiers);
    
    let name = grammar.flatten("#name#");
    let title = name;

    let description = grammar.flatten("#[name:"+name+"]description#");
    let summary = "A City";

    let links = {}
    if (genContexts) {
        contexts.forEach(context => {
            let content = generateContent(context, [page], false);
            if (content.type === "artifact") {
                description += " " + name + " contains the artifact " + content.name + "."
                links[content.name] = getContextLink(context, [page]);
            } else if (content.type === "horror") {
                description += " " + name + " was haunted by the horror " + content.name + "."
                links[content.name] = getContextLink(context, [page]);
            } else if (content.type === "road") {
                description += " " + content.name + " runs through " + name + ".";
                links[content.name] = getContextLink(context, [page]);
            }
            
        }) 
    }

    return {"title": title, "name": name, "description": description, "summary": summary, "type": "city", "links": links}
}