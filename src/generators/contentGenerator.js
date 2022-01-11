import { generateArtifact } from "./artifactGenerator";
import { generateCity } from "./cityGenerator";
import { generateFable } from "./fableGenerator";
import { generateHorror } from "./horrorGenerator";
import { generateRoad } from "./roadGenerator";

export function generateContent(page, contexts, genContexts=true) {
    console.log('generating page=' + page + " contexts=" + contexts)
    let choice = page.charAt(0);
    switch(choice) {
        case 'a':
            return generateArtifact(page, contexts, genContexts);
        case 'h':
            return generateHorror(page, contexts, genContexts);
        case 'f':
            return generateFable(page, contexts, genContexts);
        case 'c':
            return generateCity(page, contexts, genContexts);
        case 'r':
            return generateRoad(page, contexts, genContexts);
        default:
            break;    
    }
    return;
}