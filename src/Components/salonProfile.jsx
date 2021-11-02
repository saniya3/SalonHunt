import React from "react";
import NavBar from "./Navbar";
import { Card,Row,Col } from "react-bootstrap";
import avatar1 from "../Assets/Images/avatar1.jfif"
import styles from "../Styles/salonProfile.css"
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import salonPro from "../Assets/Images/salonProfile.jpg"
import s1 from "../Assets/Images/s1.jpg"
import { faRibbon,faUserCircle } from '@fortawesome/free-solid-svg-icons'

const salonProfile=()=>{
    // function CreateCard(){
    //     <Card

    //     />
    // }
    // function CreateTestimonial(){
    //     <Card

    //     />
    // }
    return(
        <div>
           <NavBar/>
           <div className="profileCard">
               <Row>
                   <Col md={6}>
                       <h1 className="Ftitle">LOOKS</h1>
                       <hr/>
                       <div className="exp"><FontAwesomeIcon icon={faRibbon} className="iconStyle" /><b>Experience:</b>
                       <p>15 years</p>
                       </div>
                       <button className="btn btn-success info">Book a slot</button>
                       <button className="btn btn-info info">Contact Info</button>
                   </Col>
                   <Col md={6} className="dp">
                      <img alt="dp" style={{width:"90%"}} src={salonPro}/>
                   </Col>
               </Row>
               
               </div>
               
               <br/>
               <h1 className="Ftitle">Gallery Wall</h1>
               <br/>
               <div>
                <Row>
                    <Col className="imgs" md={5}>
                    <img alt="dp" src={s1}/>
                    </Col>
                    <Col className="imgs" md={5}>
                    <img alt="dp" src={s1}/>
                    </Col>
                </Row>
                <br/>
                
                <br/>
                </div>
            
               
               
           <br/>
           <div>
               <h1 className="Ftitle">Meet Our Staff</h1><a className="view" href="">View All</a>
                <br/>
                <div>
                   <Row>
                       <Col md={3}>
                           <Card className="profileCard">
                             <Row>
                              <Col md={8}>
                              <h5 className="Ftitle">Name</h5>
                              <p>Experience:</p>
                              <p>Experise:</p>
                              </Col>
                              <Col md={4}>
                              <img alt="dp" className="profileAv" src={avatar1}/>
                              </Col>
                             </Row>
                           </Card>
                       </Col>
                       <Col md={3}>
                           <Card className="profileCard">
                             <Row>
                              <Col md={8}>
                              <h5 className="Ftitle">Name</h5>
                              <p>Experience:</p>
                              <p>Experise:</p>
                              </Col>
                              <Col md={4}>
                              <img alt="dp" className="profileAv" src={avatar1}/>
                              </Col>
                             </Row>
                           </Card>
                       </Col>
                       <Col md={3}>
                           <Card className="profileCard">
                             <Row>
                              <Col md={8}>
                              <h5 className="Ftitle">Name</h5>
                              <p>Experience:</p>
                              <p>Experise:</p>
                              </Col>
                              <Col md={4}>
                              <img alt="dp" className="profileAv" src={avatar1}/>
                              </Col>
                             </Row>
                           </Card>
                       </Col>
                       <Col md={3}>
                           <Card className="profileCard">
                             <Row>
                              <Col md={8}>
                              <h5 className="Ftitle">Name</h5>
                              <p>Experience:</p>
                              <p>Experise:</p>
                              </Col>
                              <Col md={4}>
                              <img alt="dp" className="profileAv" src={avatar1}/>
                              </Col>
                             </Row>
                           </Card>
                       </Col>
                   </Row>
                </div>
                <br/>
                <br/>
           </div>
           <br/>
           <hr/>
           <br/>
           <div className="review">
               <h1 className="Ftitle">Reviews</h1>
                <br/>
                <div>
                    <div className="revCard">
                       <h1 className="title"><FontAwesomeIcon icon={faUserCircle} className="iconStyle" />Client</h1>
                       <p>Amazing work done by Ms. xyz at Looks salon.</p>
                    </div> 
                </div>
                <br/>
                <br/>
           </div>
           
      
        </div>
    )
}

export default salonProfile;