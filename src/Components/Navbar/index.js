import React,{useState,useEffect} from "react";
import styles from "../../Styles/navbar.css"
import logo from "../../Assets/Images/logo.jpeg"
import Edit from "../../Core/edit";
import { Navbar, Nav,NavDropdown} from 'react-bootstrap';
import {  getAuth, signOut} from "firebase/auth";
import avt from "../../Assets/Images/avt.jpg";

const NavBar = (props) => {
    const auth=getAuth();
    const [dp,setDp]=useState(avt);
    const [isLogged, setLog]=useState(false);
    auth.onAuthStateChanged(function(currentUser) {
        if (currentUser) {
           setLog(true);
           setDp(currentUser.photoURL);
        } else {
           setLog(false);
        }
     });
   
    function logOut(){
        const auth = getAuth();
        signOut(auth).then(() => {
            setLog(false);
            console.log("logged out");
        // Sign-out successful.
        }).catch((error) => {
          console.log(error.message);
        });
    } 
    const params = new URLSearchParams(window.location.search)
	let key=params.get('key');
    isLogged&&(key=auth.currentUser.uid)
    return (
      <Navbar expand="lg" className="navbar">
            <Navbar.Brand href={"/?key="+key}><img alt="Logo" style={{width:"40%"}} src={logo}></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav">
                <Nav.Link className="item" href={"/?key="+key}>Home</Nav.Link>
                <Nav.Link className="item" href={"/About?key="+key}>About Us</Nav.Link>
                <Nav.Link className="item" href="#link">Offers</Nav.Link>
                <Nav.Link className="item" href="#link">Get Involved</Nav.Link>
                {/* <Nav.Link className="item" href="#link">Contact Us</Nav.Link> */}
                {!isLogged && (
                <NavDropdown title="Sign In" id="basic-nav-dropdown" className="drop">
                    <NavDropdown.Item href="/login" className="droplink">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/signUp" className="droplink">Sign Up</NavDropdown.Item>
                </NavDropdown>
                )}
                {isLogged && (
                <div>
                 <img alt="dp" src={dp} style={{width:'45px'}}/>
                 <NavDropdown title="Profile" id="basic-nav-dropdown" className="drop">
                    <NavDropdown.Item href={"/edit?key="+key} className="droplink">Edit</NavDropdown.Item>
                    <NavDropdown.Item onClick={logOut} href="/" className="droplink">Log Out</NavDropdown.Item>
                </NavDropdown>
                </div>
                )}   
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default NavBar;