import React,{useState} from "react";
import NavBar from "../Components/Navbar/index";
import { Link } from 'react-router-dom'
import Card from "@material-ui/core/Card";
import 'bootstrap/dist/css/bootstrap.css';
import { getAuth } from "@firebase/auth";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import salon from "../Assets/Images/salon.jfif";
import ind from "../Assets/Images/in.jfif"

const Home =()=>{
    const auth=getAuth()
    const [isLogged, setLog]=useState(false);
    auth.onAuthStateChanged(function(currentUser) {
        if (currentUser) {
           setLog(true);
        } else {
           setLog(false);
        }
     });
    const params = new URLSearchParams(window.location.search)
	let key=params.get('key')
    isLogged?key=auth.currentUser.uid:console.log("no");
    return(
        <div>
         <NavBar/>
         <br/>
         <br/>
            <Container fluid>
            <Row>
            <Col md={6}>
              <Link to={"/salon?key="+key} style={{ textDecoration: 'none' }}>
                   <Card className="card">
                   
                   <div class="go-corner" />
                   <div className="title">
                       Salon Services
                    </div>
                    <br/>
                     <div className="img">
                            <img alt="salon" src={salon}></img>
                     </div>
                   </Card>
                </Link>
            </Col>
            <Col md={6}>
               <Link to={"/individual?key="+key} style={{ textDecoration: 'none' }}>
                   <Card className="card">
                   <div class="go-corner" />
                   <div className="title">
                       Individual Services
                    </div>
                    <br/>
                     <div className="img">
                            <img alt="individual" src={ind}></img>
                     </div>
                   </Card>
                </Link>
            </Col>
            </Row>
            </Container>
               
              
        </div>
        
    );
}

export default Home;