import Header from "./Header";
import { Card, Container } from "react-bootstrap"
import { getPageLink, getPageSeed, getRandom } from "../utilities/SeedUtils";
import { Link } from "react-router-dom"
import { generateArtifact } from "../generators/artifact";

function getBookmarkInfo(i) {
    let seed = Math.floor(new Date()/8.64e7) + i;
    let pageLink = getPageLink(seed);
    let pageSeed = getPageSeed(seed);
    let artifact = generateArtifact(pageSeed);
    return {seed, pageLink, artifact}
}

const HomePage = () => {
    return (
        <>
            <Header></Header>
            <Container>
            This book contains descriptions of the legends and mysteries of this world. While I fear it may never be completed it is my best attempt to capture accurately our history and stories.
            { getRandom() }
            </Container>
            
            {[...Array(10)].map((x, i) =>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title><Link to={getBookmarkInfo(i).pageLink}>{getBookmarkInfo(i).artifact.title}</Link></Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>
            )}

        </>
    );
};

export default HomePage;