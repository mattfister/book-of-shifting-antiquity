import tracery from '../utilities/tracery'
import { alea } from 'seedrandom';
import { getContextLink, getContextSeedsFromPath, getPageLink } from '../utilities/SeedUtils';
import { generateContent } from './contentGenerator';

export function generateArtifact(page, contexts = [], genContexts=true) {
    
    tracery.setRandom(new alea(page));

    var grammar = tracery.createGrammar({
        "title": "Artifacts",
        "description": "The adventurers have found a strange artifact. Let's see what it does.",
        "roll": "1",
        "description-image": "artifact.png",
    
        "nameStart": ["Ch","B","W","T","P","Y","L","G","Gr","Z","C","V","B","N","M"],
        "nameSyl": ["is","ar","us","os","in","it","ix","ast","or","arth","irth","aunt","as","y"],
    
        "name": ["#nameStart##nameSyl#", "#nameStart##nameSyl#", "#nameStart##nameSyl##nameSyl#", "#nameStart##nameSyl##nameSyl##nameSyl#", "#nameStart##nameSyl# #nameStart##nameSyl#"],
    
        "shapephrase": ["has the form of", "is a powerful artifact in the shape of", "looks like"],
        "formAdj": ["broken", "smooth", "warm", "cold", "sharp", "wet", "soft", "hard", "mushy", "transparent", "glassy", "opaque"],
        "shape": ["rock", "doll", "figurine", "amulet", "orb", "gem", "crystal", "sphere", "cube", "prism", "blade", "spear", "monument", "meteorite"],
    
        "formSentence": "#artifact# #shapephrase# #formAdj.a# #shape#.",
    
        "colorAdj": ["sickly", "pale", "bright", "dark", "medium", "light", "shifting"],
        "color": ["blue", "red", "green", "purple", "orange", "indigo", "pink", "yellow", "black", "white", "gold", "silver"],
        "colorSentence": ["", " It is #colorAdj.a# #color# color."],
    
    
        "made": ["built", "forged", "smithed", "created", "produced", "conjured"],
        "maker": ["a powerful wizard", "an extraplanar being", "an ancient civilization", "a master smith", "natural forces", "strange forces"],
        "createdSentence": [" ", " It was #made# by #maker#."],
    
        "action": ["worshipped", "gazed upon", "touched", "smelled", "eaten", "worn", "carried", "held", "cradled", "rubbed", "thrown"],
        "transition": "it",
        "ending": ["becomes hot", "becomes energinzed with a powerful vibration", "liquifies", "glows with an eerie light",
        "dissappears", "shows an image of the future", "becomes a shielding force", "aids memory", "becomes a deadly projectile",
        "projects energy", "tunnels into the earth", "repels insects", "frightens children", "becomes a force of destiny",
        "becomes lost", "burns the mind", "sings the hymn of the damned", "curses all nearby", "illuminates its surroundings",
        "destroys itself", "destroys those nearby", "flies into the air", "floats in the air", "floats above the ground",
        "levitates surrounding objects", "levitates those nearby", "grants power to its owner", "makes its owner invisible",
        "grants a wish", "emits dust", "turns surrounding objects to ashes", "ignites its surroundings", "grants psychic powers",
        "changes the past", "changes probabilities"],
    
        "whenSentence": [" When #activated# #transition# #ending#."],
    
        "inscription": ["For #name#", "#artifact# should not be #activated#"],
        "inscriptionSentence": ["", " Inscribed on it, the following words appear, '#inscription#'."],
    
        "quality": ["A Powerful", "A Mysterious", "An Unknown", "A Legendary", "A Forgotten"],

        "artifactDescription": "#formSentence##colorSentence##createdSentence##whenSentence##inscriptionSentence#",
    
        "1-artifact-title": "",
        "1-artifact-description": "#[artifact:#name#][activated:#action#]artifactDescription#"
    });

    grammar.addModifiers(tracery.baseEngModifiers);

    let name = grammar.flatten("#[artifact:#name#][activated:#action#]name#")
    let title = name;
    let description = grammar.flatten('#[artifact:'+name+'][activated:#action#]artifactDescription#');
    
    let links = {}
    if (genContexts) {
        contexts.forEach(context => {
            let content = generateContent(context, [page], false);
            if (content.type === "city") {
                description += " " + name + " is located in " + content.name + "."
                links[content.name] = getContextLink(context, [page]);
            }
            
        }) 
    }
    let quality = grammar.flatten('#quality#');
    let summary = quality + ' Artifact';

    console.log(links);

    return {"title": title, "name": name, "description": description, "summary": summary, "type": "artifact", "links": links}
}