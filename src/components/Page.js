import Header from "./Header";
import { Container } from "react-bootstrap";
import { getContextSeedsFromPath, getPageSeedFromPageString, getPageSeedFromPath, getContextSeedsFromSeedString } from "../utilities/SeedUtils";
import { generateContent } from "../generators/contentGenerator";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, {useState} from 'react';
import { useTitle } from "../hooks/useTitle";

  
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

const Page = (props) => {
    let content = generateContent(getPageSeedFromPageString(props.router.params.page), getContextSeedsFromSeedString(props.router.params.page));

    function replaceLinks(text, links) {
        console.log('text = ' + text);
        console.log(links);

        var outText = text;
        for (const [key, value] of Object.entries(links)) {
            outText = reactStringReplace(outText, key, (match, i) => (
                <Link key={key+i} to={value}>{match}</Link>
            ))};
        return outText;
    };

    useTitle(content.name)
    return (
        <>
            <Header/>
            <Container className="mx-auto pt-5" style={{maxWidth: '640px'}}>
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