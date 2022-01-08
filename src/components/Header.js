import { Container, Navbar } from "react-bootstrap"

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/book-of-shifting-antiquity/">The Book of Shifting Antiquity</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header;