import { Container, Navbar, Nav, Dropdown, ListGroup } from "react-bootstrap";
import { useCookies } from "react-cookie";
import AddSpace from "./AddSpace";
import { useEffect, useState } from "react";
import { BASE_SERVER_URL } from "../consts";

const MyNavbar = () => {
  const [cookies, _] = useCookies(["authToken"]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // TODO Fix this call
    const getMembers = async () => {
      await fetch(`${BASE_SERVER_URL}/space/members`, {
        headers: {
          Authorization: cookies.authToken,
        },
      })
        .then((response) => {
          if (response.status !== 401) return response.json();
        })
        .then((response) =>
          setMembers(response !== null ? response.map((x) => x.title) : [])
        );
    };
    // getMembers();
    setMembers(["Ali", "Hamed"]);
  });
  return (
    <div style={{ marginBottom: "50px" }}>
      <Navbar bg="dark" variant="dark" expand="xxl">
        <Container>
          <Navbar.Brand>Task Manger</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {cookies.authToken ? (
                <>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/signout">Sign Out</Nav.Link>
                  <Nav.Link>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-button-dark-example1"
                        variant="secondary"
                      >
                        Spaces
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item href="#/action-1" active="true">
                          {/* TODO list of users spaces  */}
                          My Spaces
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <AddSpace />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>

                  <Nav.Link>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-button-dark-example1"
                        variant="secondary"
                      >
                        Members
                      </Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item active="true">
                          <ListGroup style={{ width: "100px" }}>
                            {members.map((elem) => (
                              <ListGroup.Item>{elem}</ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="/account">Account</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
