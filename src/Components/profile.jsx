import React from "react";
import NavBar from "./Navbar";
import {Row,Col } from "react-bootstrap";
import avatar from "../Assets/Images/avatar.png"
import styles from "../Styles/profile.css"
import ex1 from "../Assets/Images/ex1.jfif"
import ex2 from "../Assets/Images/ex2.jfif"
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRibbon,faCheckDouble,faAddressCard,faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Profile=()=>{
    // function CreateCard(){
    //     <Card

    //     />
    // }
    // function CreateTestimonial(){
    //     <Card

    //     />
    // }
    const isIndividual=true;
    return(
        <div>
           <NavBar/>
           <div className="profileCard">
               <Row>
                   <Col md={6}>
                       <h1 className="Ftitle">Name</h1>
                       <hr/>
                       <div className="bio"><FontAwesomeIcon icon={faAddressCard} className="iconStyle"/><b>Bio:</b>
                       <p></p>
                       </div>
                       <div className="expertise"><FontAwesomeIcon icon={faCheckDouble} className="iconStyle" /><b>Area of expertise:</b>
                       <p>Makeup</p>
                       </div>
                       <div className="exp"><FontAwesomeIcon icon={faRibbon} className="iconStyle" /><b>Experience:</b>
                       <p>5 years</p>
                       </div>
                       {isIndividual && (
                           <div>
                           <button className="btn btn-info info">Address</button>
                           <button className="btn btn-success info">Contact Info</button>
                           </div>
                        
                       )}
                       
                   </Col>
                   <Col md={6} className="dp">
                      <img alt="dp" className="profilePic" src={avatar}/>
                   </Col>
               </Row>
               <br/>
            <div className="work">
                <br/>
                <h1 className="Ftitle">Work Sample</h1>
                <br/>
                <Carousel touch interval={null}>
                    <Carousel.Item>
                        <img alt="" src={ex2}/>
                    </Carousel.Item> 
                    <Carousel.Item>
                        <img alt="" src={ex1}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img alt="" src={ex1}/>
                    </Carousel.Item> 
                </Carousel>
                <br/>
                <br/>
                </div>
                </div>
               
                {/* <Row>
                    <Col md={4}>
                        <div className="imgWork">
                            <img src={ex1} alt=""/>
                        </div>
                    </Col>
                    <Col md={4}>
                    <div className="imgWork">
                            <img src={ex1} alt=""/>
                    </div>
                    </Col>
                    <Col md={4}>
                    <div className="imgWork">
                            <img src={ex1} alt=""/>
                    </div>
                    </Col>
                </Row> */}
           <br/>
           <div className="review">
               <h1 className="Ftitle">Reviews</h1>
                <br/>
                <div>
                    <div className="revCard">
                       <h1 className="title"><FontAwesomeIcon icon={faUserCircle} className="iconStyle" />Client</h1>
                       <p>Amazing work done by Ms. xyz</p>
                    </div> 
                </div>
                <br/>
                <br/>
           </div>
           
        </div>
    )
}

export default Profile;