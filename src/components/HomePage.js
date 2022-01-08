import Header from "./Header";
import { Card, Container } from "react-bootstrap"
import { getPageLink, getPageSeed, getRandom } from "../utilities/SeedUtils";
import { Link } from "react-router-dom"
import { generateContent } from "../generators/contentGenerator";

function getBookmarkInfo(i) {
    let seed = Math.floor(new Date()/8.64e7) + i;
    let pageLink = getPageLink(seed);
    let pageSeed = getPageSeed(seed);
    let artifact = generateContent(pageSeed);
    return {seed, pageLink, artifact}
}

const HomePage = () => {

    let bookmarks = [...Array(10)].map((x, i) => getBookmarkInfo(i) );

    return (
        <>
            <Header></Header>
            <Container>
                This book contains descriptions of the legends and mysteries of this world. While I fear it may never be completed it is my best attempt to capture accurately our history and stories.
            </Container>
            
            {bookmarks.map((x, i) =>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title><Link to={x.pageLink}>{x.artifact.title}</Link></Card.Title>
                        <Card.Text>
                            {x.artifact.summary}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}

        </>
    );
};

export default HomePage;