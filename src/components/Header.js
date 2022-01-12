import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import { getRandomPageLink, getRandomPageLinkForType } from "../utilities/SeedUtils";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/book-of-shifting-antiquity/">The Book of Shifting Antiquity</Navbar.Brand>
            </Container>
            <Nav className="me-auto"/>
            <Nav className="d-flex">
                <NavDropdown title="Random Page" id="basic-nav-dropdown">
                    <NavDropdown.Item href={getRandomPageLink()}>Any Page</NavDropdown.Item>
                    <NavDropdown.Item href={getRandomPageLinkForType('artifact')}>Artifact Page</NavDropdown.Item>
                    <NavDropdown.Item href={getRandomPageLinkForType('city')}>City Page</NavDropdown.Item>
                    <NavDropdown.Item href={getRandomPageLinkForType('fable')}>Fable Page</NavDropdown.Item>
                    <NavDropdown.Item href={getRandomPageLinkForType('horror')}>Horror Page</NavDropdown.Item>
                    <NavDropdown.Item href={getRandomPageLinkForType('road')}>Road Page</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}

export default Header;