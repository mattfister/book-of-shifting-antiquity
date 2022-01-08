import { generateArtifact } from "./artifactGenerator";
import { generateHorror } from "./horrorGenerator";

export function generateContent(page, context) {
    let choice = page.charAt(0);
    switch(choice) {
        case 'a':
            return generateArtifact(page, context);
            break;
        case 'h':
            return generateHorror(page,context);
            break;
        default:
            return;
    }
}