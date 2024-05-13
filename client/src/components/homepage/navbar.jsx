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
import Searched from "./searched";
import Spinner from "react-bootstrap/esm/Spinner";


function MyNavbar({handleSidebarToggle}) {
  
  const navigate=useNavigate();
  let [searchText,setSearchText]=useState("");
  let [searched,setSearched]=useState(null);
  let [loading,setLoading]=useState(false);
  const handleSearch=async ()=>{
    // console.log(searchText);
    setLoading(true);
    let searchedList=await axios.get("https://novel-generation-server-0bu2.onrender.com/api/explore?search="+searchText);
    const searchResult=await searchedList.data; 
    // console.log('searched',await searchResult);
    setSearched(await searchResult);
    setLoading(false);
  }
  

  let {loginStatus}=useUserContext();
  return (
    <>
      <Navbar expand="lg" className={`bg-body-tertiary ${css.myNavbar}`}>
        <img
          className={`${css.sidebarToggle}`}
          src="sidebar-2.svg"
          alt=""
          onClick={handleSidebarToggle}
        />
        <Container fluid>
          <Navbar.Brand href="/" style={{ color: "white" }}>
          <span style={{fontSize:'18px'}}>Btech Novelwala</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{ backgroundColor: "#e68a19" }}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link  className={`${css.Links}`}>
                {" "}
                <NavLink className={`${css.Links}`} to={"/"}>
                Home
                </NavLink>
              </Nav.Link>
              <Nav.Link className={`${css.Links}`} href="#popular">
                Popular
              </Nav.Link>
              <Nav.Link className={`${css.Links}`} href="#allBooks">
                All Books
              </Nav.Link>
              <Nav.Link className={`${css.Links}`} href="#footer">
                Footer
              </Nav.Link>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
              {/* <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                className={`${css.searchButton}`}
                onClick={handleSearch}
                variant="outline-success"
              >
                {!loading?"Search":<Spinner></Spinner>}
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
      {searched &&  <Searched searched={searched} setSearched={setSearched}></Searched>}
    </>
  );
}


export default MyNavbar;