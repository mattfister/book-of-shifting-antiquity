import Header from "./Header";
import { Container, Row, Col } from "react-bootstrap"
import { getContextSeedsFromSeedString, getPageLink, getPageSeedAndContext, getPageSeed } from "../utilities/SeedUtils";
import { generateContent } from "../generators/contentGenerator";
import Bookmark from "./Bookmark";
import { useTitle } from "../hooks/useTitle";

function getBookmarkInfo(i) {
    let seed = Math.floor(new Date()/8.64e7) + i;
    let pageLink = getPageLink(seed);
    let pageSeedAndContext = getPageSeedAndContext(seed);
    let pageSeed = getPageSeed(seed);
    let content = generateContent(pageSeed, getContextSeedsFromSeedString(pageSeed));
    return {seed, pageLink, content}
}

const HomePage = () => {

    let bookmarks = [...Array(100)].map((x, i) => getBookmarkInfo(i) );


    useTitle();
    return (
        <>
            <Header></Header>
            <Container className="mx-auto pt-5" style={{maxWidth: '960px'}}>
                <Row className="mx-auto mb-5" style={{maxWidth: '640px'}}>
                This book contains descriptions of the legends and mysteries of this world. While I fear it may never be completed it is my best attempt to capture accurately our history and stories.
                </Row>
                <h4 className="mx-auto pb-3 text-center">Bookmarks</h4>
                <Row xs="auto" className="mb-5">
                    {bookmarks.map((x, i) =>
                    <Col key={i} className="mb-5">
                        <Bookmark title={x.content.title} link={x.pageLink} summary={x.content.summary}/>
                    </Col>
                    )}
                </Row> 
            </Container>
        </>
    );
};

export default HomePage;