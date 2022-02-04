import { Container, Navbar, Nav } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <Navbar scrolling dark expand="md">
      <Container>
        <Navbar.Brand>Task Manger</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/notes">Home</Nav.Link>
            <Nav.Link href="/signout">Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
