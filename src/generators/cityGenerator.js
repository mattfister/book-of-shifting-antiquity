import tracery from '../utilities/tracery'
import { alea } from 'seedrandom';
import { generateContent } from './contentGenerator';
import { getContextLink} from '../utilities/SeedUtils';


export function generateCity(page, contexts, genContexts=true) {
    
    tracery.setRandom(new alea(page));

    var grammar = tracery.createGrammar({    

        "nameStart": ["Ab", "Arr", "At", "Ap", "As", "Ad", "T", "Y", "P", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
        "nameSyl": ["ia","ar","us","os","in","it","ix","ast","or","arth","irth","aunt","as","y", "asgard", "imont"],
        "name": ["#nameStart##nameSyl#", "#nameStart##nameSyl##nameSyl#", "#nameStart##nameSyl##nameSyl##nameSyl#", "#nameStart##nameSyl# #nameStart##nameSyl#"],
        "size": ["small", "large"],
        "type": ["village", "town", "hamlet", "city"],
        "building": ["academy", "adventurer's guild", "alchemist's shop", "antique store", "apothecary", "aqueduct", "armory", "auction house", "bakery", "bank", "barber", "barracks", "bazaar", "beer garden", "book store", "butcher shop", "chapel", "church", "jail", "clothing shop", "court hosue", "crypt", "farmer's market", "flour mill", "garrison", "graveyard", "harbour", "herbalist shop", "horse trader", "hospital", "inn", "blacksmith's shop", "jail", "jewelry store", "locksmiths's shop", "market", "meadery", "park", "plaza", "pub", "prison", "refinery", "sawmill", "shrine", "spice shop", "stables", "stockade", "tailor's shop", "tannery", "temple", "theater", "townhall", "warehouse", "water mill", "wind mill", "wizard's tower"],
        "buildingMods": ["decrepit", "ruined", "famous", "well renowned", "word renowned", "massive", "magical", "secret", "magic", "dusty", "modern", "well-designed", "antique", "vast", "noisy", "busy", "quiet"],
        "moddedBuilding": ["#buildingMods# #building#", "#building#"],
        "contentRelation": ["It is known for its", "It has a"],
        "contents": ["#contentRelation# #moddedBuilding#.", "#contentRelation# #moddedBuilding# and #moddedBuilding#.", "#contentRelation# #moddedBuilding#, #moddedBuilding#, and #moddedBuilding#.", ""],
        
        "description": "#name# is a #size# #type#. #contents#", 
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
            } else if (content.type === "region") {
                description += " " + name + " is located in the " + content.name + ".";
                links[content.name] = getContextLink(context, [page]);
            }
            
        }) 
    }

    return {"title": title, "name": name, "description": description, "summary": summary, "type": "city", "links": links}
}