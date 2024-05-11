import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import css from "./navbar.module.css";
import { useNavigate,NavLink } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../store/context";
import ProfileIcon from "../Profile/profileIcon";
import { useState } from "react";


function MyNavbar({handleSidebarToggle}) {
  
  const navigate=useNavigate();
  let [searchText,setSearchText]=useState("");
  const handleSearch=async ()=>{
    console.log(searchText);
    let searchedList=await axios.get("http://localhost:8080/api/explore?search="+searchText);
    const searcResult=await searchedList.data; 
    
  }
  let {loginStatus}=useUserContext();
  return (
    <>
      <Navbar expand="lg" className={`bg-body-tertiary ${css.myNavbar}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={`${css.toggleSidebar}bi bi-layout-text-sidebar-reverse`}
          viewBox="0 0 16 16"
          style={{ height: "4%", width: "2%", margin: "1%", cursor: "pointer" }}
          onClick={handleSidebarToggle}
        >
          <path d="M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
          <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5z" />
        </svg>
        <Container fluid>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                {" "}
                <NavLink className={`${css.Links}`} to={"/"}>
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link href="#popular">Popular</Nav.Link>
              <Nav.Link href="#allBooks">All Books</Nav.Link>
              <Nav.Link href="#footer">Footer</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>setSearchText(e.target.value)}
              />
              <Button onClick={handleSearch} variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
        {!loginStatus ? (
          <div className={`text-end ${css.loginButtons}`}>
            <button
              onClick={() => navigate("/login")}
              type="button"
              className={`btn btn-outline-light me-2`}
            >
              Login
            </button>
          </div>
        ) : (
          <ProfileIcon></ProfileIcon>
        )}
      </Navbar>
    </>
  );
}


export default MyNavbar;