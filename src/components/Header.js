import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import { CONTENT_TYPES, getRandomPageLink, getRandomPageLinkForType } from "../utilities/SeedUtils";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container>
                <Navbar.Brand href="/book-of-shifting-antiquity/">The Book of Shifting Antiquity</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"/>
                    <Nav className="d-flex">
                        <NavDropdown title="Random Page" menuVariant='dark' id="basic-nav-dropdown dropdown-menu-left">
                            <NavDropdown.Item href={getRandomPageLink()}>Any Page</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {
                                CONTENT_TYPES.map(type => {
                                    return(
                                        <NavDropdown.Item href={getRandomPageLinkForType(type)}>{type.charAt(0).toUpperCase() + type.slice(1)} Page</NavDropdown.Item>
                                    );
                                })
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    )
}

export default Header;