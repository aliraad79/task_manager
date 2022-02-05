import { Container, Navbar, Nav } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <div>
      <svg
        style={{ position: "absolute", top: 0, width: "100%", zIndex: 2 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 27 2"
      >
        <path d="M 0 0 L 27 0 V 2 C 16 -2 9 2 0 2 V 0" fill="#87603C" />
      </svg>
      <div style={{ height: "100px" }}>
        <Navbar scrolling dark expand="md" style={{ zIndex: 3 }}>
          <Container>
            <Navbar.Brand>Task Manger</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signout">Sign Out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default MyNavbar;
