import React,{useState} from "react";
import styles from "../../Styles/navbar.css"
import logo from "../../Assets/Images/logo.jpeg"
import { Navbar, Nav,NavDropdown} from 'react-bootstrap';
import { update,ref } from "@firebase/database";
import { database as db} from "../../fire";
import {  getAuth, signOut,FacebookAuthProvider } from "firebase/auth";
import { getStorage, ref as Ref, getDownloadURL } from "firebase/storage";
import avt from "../../Assets/Images/avt.jpg";

const NavBar = (props) => {
    const auth=getAuth();
    const user=auth.currentUser;
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
    if(user!==null){
    // if (user!==null) {
    //     console.log("  Photo URL: " + user.photoURL);
    //     user.providerData.forEach((profile) => {
           
    //         if(profile.photoURL==null){
    //             dp=avt;
    //         }
    //         else{
    //             dp=profile.photoURL;
    //             console.log(dp);
    //         }
    // });
    // if(user.providerId===FacebookAuthProvider){
    //     setDp(user.photoURL)
    // }
    // else{
        // const storage = getStorage();
        // getDownloadURL(Ref(storage, "/ProfilePictures/"+user.uid)).then((url) => {
        //     setDp(url);
        // })
    //}
  }
 

    return (
      <Navbar expand="lg" className="navbar">
            <Navbar.Brand href="/"><img alt="Logo" style={{width:"40%"}} src={logo}></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav">
                <Nav.Link className="item" href="/">Home</Nav.Link>
                <Nav.Link className="item" href="/About">About Us</Nav.Link>
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
                    <NavDropdown.Item href="/edit" className="droplink">Edit</NavDropdown.Item>
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