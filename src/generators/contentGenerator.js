import { generateArtifact } from "./artifactGenerator";
import { generateCity } from "./cityGenerator";
import { generateFable } from "./fableGenerator";
import { generateHorror } from "./horrorGenerator";
import { generateIcon } from "./iconGenerator";
import { generatePlant } from "./plantGenerator";
import { generateRoad } from "./roadGenerator";

export function generateContent(page, contexts, genContexts=true) {
    console.log('generating page=' + page + " contexts=" + contexts)
    let choice = page.split('-')[0];
    console.log(choice);
    
    let content = "hey";
    switch(choice) {
        case "artifact":
            content = generateArtifact(page, contexts, genContexts);
            break;
        case "horror":
            content = generateHorror(page, contexts, genContexts);
            break;
        case "fable":
            content = generateFable(page, contexts, genContexts);
            break;
        case "city":
            content = generateCity(page, contexts, genContexts);
            break;
        case "road":
            content = generateRoad(page, contexts, genContexts);
            break;
        case "plant":
            content = generatePlant(page, contexts, genContexts);
            break;
        default:
            console.error("bad!")
            content = "error!"
            break;    
    }
    content.icon = generateIcon(page);
    return content;
}