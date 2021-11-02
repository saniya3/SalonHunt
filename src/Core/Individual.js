import React from "react";
import NavBar from "../Components/Navbar/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "@material-ui/core/Card";

const Individual=()=>{
  return(
    <div>
    <NavBar/>
    <br/>
    <br/>
      <div className="center">
        <Row>
               <Col md={3}> <Card className="options"><div className="title">Hair</div></Card> </Col>
               <Col md={3}> <Card className="options"><div className="title">Makeup</div></Card> </Col>
               <Col md={3}> <Card className="options"><div className="title">Nails</div></Card> </Col>
        </Row>
        <br/>
        <Row>
                <Col md={3}> <Card className="options"><div className="title">Lashes</div></Card> </Col>
                <Col md={3}> <Card className="options"><div className="title">Tattoo</div></Card> </Col>
                <Col md={3}> <Card className="options"><div className="title">Beauty</div></Card> </Col>
        </Row>
        </div>
     
    </div>
  )
}

export default Individual;