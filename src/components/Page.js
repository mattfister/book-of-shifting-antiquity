import Header from "./Header";
import { Container } from "react-bootstrap";
import { getPageSeedFromPath } from "../utilities/SeedUtils";
import { generateArtifact } from "../generators/artifact";

const Page = () => {
    let a = generateArtifact(getPageSeedFromPath());
    return (
        <>
            <Header/>
            <Container>
                 { a.title }
                 { a.name }
                 { a.description }
                 { a.type }
            </Container>
        </>
    );
};

export default Page;