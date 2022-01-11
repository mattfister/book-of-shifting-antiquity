import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import { getRandomPageLink } from "../utilities/SeedUtils";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/book-of-shifting-antiquity/">The Book of Shifting Antiquity</Navbar.Brand>
            </Container>
            <Nav className="me-auto"/>
            <Nav className="d-flex">
                <Nav.Link href={getRandomPageLink()}>Random Page</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Header;