import Header from "./Header";
import { Container } from "react-bootstrap";
import { getContextSeedsFromPath, getPageSeedFromPath } from "../utilities/SeedUtils";
import { generateContent } from "../generators/contentGenerator";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { useLocation, useNavigate, useParams } from "react-router-dom";

  
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
        <Component
            {...props}
            router={{ location, navigate, params }}
        />
        );
    }

    return ComponentWithRouterProp;
}

const Page = () => {
    let content = generateContent(getPageSeedFromPath(), getContextSeedsFromPath());

    function replaceLinks(text, links) {
        var outText = text;
        for (const [key, value] of Object.entries(links)) {
            outText = reactStringReplace(outText, key, (match, i) => (
                <Link key={key} to={value}>{match}</Link>
            ))};
        return outText;
    };

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
                    {replaceLinks(content.description, content.links)}
                </p>
            </Container>
        </>
    );
};

export default withRouter(Page);