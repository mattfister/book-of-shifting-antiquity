import { generateArtifact } from "./artifactGenerator";
import { generateCity } from "./cityGenerator";
import { generateFable } from "./fableGenerator";
import { generateHorror } from "./horrorGenerator";
import { generatePlant } from "./plantGenerator";
import { generateRoad } from "./roadGenerator";

export function generateContent(page, contexts, genContexts=true) {
    console.log('generating page=' + page + " contexts=" + contexts)
    let choice = page.split('-')[0];
    console.log(choice);
    switch(choice) {
        case "artifact":
            return generateArtifact(page, contexts, genContexts);
        case "horror":
            return generateHorror(page, contexts, genContexts);
        case "fable":
            return generateFable(page, contexts, genContexts);
        case "city":
            return generateCity(page, contexts, genContexts);
        case "road":
            return generateRoad(page, contexts, genContexts);
        case "plant":
            return generatePlant(page, contexts, genContexts);
        default:
            console.error("bad!")
            break;    
    }
    return;
}