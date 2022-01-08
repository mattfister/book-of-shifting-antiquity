import Header from "./Header";
import { Container } from "react-bootstrap";
import { getPageSeedFromPath } from "../utilities/SeedUtils";
import { generateContent } from "../generators/contentGenerator";

const Page = () => {
    let content = generateContent(getPageSeedFromPath());
    return (
        <>
            <Header/>
            <Container className="mx-auto pt-5" style={{width: '640px'}}>
                <h2 className = "text-center">
                    { content.name }
                </h2>
                <h5 className = "text-center pb-4">
                    {content.summary}
                </h5>
                <p>
                    {content.description}
                </p>
            </Container>
        </>
    );
};

export default Page;