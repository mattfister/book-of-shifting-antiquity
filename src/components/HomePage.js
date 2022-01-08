import Header from "./Header";
import { Container, Row, Col } from "react-bootstrap"
import { getPageLink, getPageSeed, getRandom } from "../utilities/SeedUtils";
import { generateContent } from "../generators/contentGenerator";
import Bookmark from "./Bookmark";

function getBookmarkInfo(i) {
    let seed = Math.floor(new Date()/8.64e7) + i;
    let pageLink = getPageLink(seed);
    let pageSeed = getPageSeed(seed);
    let content = generateContent(pageSeed);
    return {seed, pageLink, content}
}

const HomePage = () => {

    let bookmarks = [...Array(100)].map((x, i) => getBookmarkInfo(i) );

    return (
        <>
            <Header></Header>
            <Container className="mx-auto pt-5" style={{width: '960px'}}>
                <Row className="mx-auto mb-5" style={{width: '640px'}}>
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