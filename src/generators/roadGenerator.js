import tracery from '../utilities/tracery'
import { alea } from 'seedrandom';
import { generateContent } from './contentGenerator';
import { getContextLink, getContextSeedsFromSeedString, getPage, getPageSeedAndContext, getSeedForContentType } from '../utilities/SeedUtils';
import { generateCity } from './cityGenerator';
import { generatePlant } from './plantGenerator';


export function generateRoad(page, contexts, genContexts=true) {
    
    let rng = new alea(page);
    console.log(rng())


    tracery.setRandom(new rng);

    let city1Seed = getSeedForContentType(rng, 'city');
    let city1SeedString = getPageSeedAndContext(city1Seed);
    let city1Contexts = getContextSeedsFromSeedString(city1SeedString);
    let city1 = generateCity(city1Seed, city1Contexts, false);

    let city2Seed = getSeedForContentType(rng, 'city');
    let city2SeedString = getPageSeedAndContext(city2Seed);
    let city2Contexts = getContextSeedsFromSeedString(city2SeedString);
    let city2 = generateCity(city2Seed, city2Contexts, false);

    let plant1Seed = getSeedForContentType(rng, 'plant');
    let plant1SeedString = getPageSeedAndContext(plant1Seed);
    let plant1Contexts = getContextSeedsFromSeedString(plant1SeedString);
    let plant1 = generatePlant(plant1Seed, plant1Contexts, false);

    let plant2Seed = getSeedForContentType(rng, 'plant');
    let plant2SeedString = getPageSeedAndContext(plant2Seed);
    let plant2Contexts = getContextSeedsFromSeedString(plant2SeedString);
    let plant2 = generatePlant(plant2Seed, plant2Contexts, false);

    var grammar = tracery.createGrammar({    

        "nameStart": ["Ab", "Arr", "At", "Ap", "As", "Ad", "T", "Y", "P", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
        "nameSyl": ["ia","ar","us","os","in","it","ix","ast","or","arth","irth","aunt","as","y", "asgard", "imont"],
        "name": ["#nameStart##nameSyl#", "#nameStart##nameSyl##nameSyl#", "#nameStart##nameSyl##nameSyl##nameSyl#", "#nameStart##nameSyl# #nameStart##nameSyl#"],

        "nameDescriptor": ["Road", "Path", "Route", "Way"],
        "fullName": "The #name# #roadType#",


        "material": ["gravel", "cobblestone", "pavers", "brick"],
        'cityVerb': ["winds between", "connects"],
        'sentence1': "#fullName# #cityVerb# #city1Name# and #city2Name#.",
        'sentence2': ["", " #plant1Name.s# grow along it.", " #plant1Name.s# and #plant2Name.s# grow along it."],
        'description': "#sentence1##sentence2#",
    });

    grammar.addModifiers(tracery.baseEngModifiers);
    
    let roadType = grammar.flatten("#[roadType:#nameDescriptor#]roadType#")
    let name = grammar.flatten("#[roadType:"+roadType+"]fullName#");

    let title = name;

    let description = grammar.flatten("#[fullName:"+name+"][city1Name:"+city1.name+"][city2Name:"+city2.name+"][plant1Name:"+plant1.name+"][plant2Name:"+plant2.name+"]description#");
    let summary = "A Road";

    let links = {}
    links[city1.name] = getContextLink(city1Seed, [page]);
    links[city2.name] = getContextLink(city2Seed, [page]);
    links[tracery.baseEngModifiers.s(plant1.name)] = getContextLink(plant1Seed, [page]);
    links[tracery.baseEngModifiers.s(plant2.name)] = getContextLink(plant2Seed, [page]);
    if (genContexts) {
        contexts.forEach(context => {
            let content = generateContent(context, [page], false);
            if (content.type === "city") {
                description += " " + name + " runs through " + content.name +".";
                links[content.name] = getContextLink(context, [page]);
            }
            
        }) 
    }

    return {"title": title, "name": name, "description": description, "summary": summary, "type": "road", "links": links}
}