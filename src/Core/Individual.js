import React from "react";
import NavBar from "../Components/Navbar/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "@material-ui/core/Card";

const Individual=()=>{
  const params = new URLSearchParams(window.location.search)
	const key=params.get('key');
  return(
    <div>
    <NavBar/>
    <br/>
    <br/>
      <div className="center">
        <Row>
            <Col md={3}> <Card className="options" ><div className="title" onClick={()=>window.location.href="/Ind?service=Hair&key="+key}>Hair</div></Card> </Col>
            <Col md={3}> <Card className="options"><div className="title" onClick={()=>window.location.href="/Ind?service=Makeup&key="+key}>Makeup</div></Card> </Col>
            <Col md={3}> <Card className="options"><div className="title" onClick={()=>window.location.href="/Ind?service=Nails&key="+key}>Nails</div></Card> </Col>
        </Row>
        <br/>
        <Row>
            <Col md={3}> <Card className="options"><div className="title" onClick={()=>window.location.href="/Ind?service=Lashes&key="+key}>Lashes</div></Card> </Col>
            <Col md={3}> <Card className="options"><div className="title" onClick={()=>window.location.href="/Ind?service=Tattoo&key="+key}>Tattoo</div></Card> </Col>
            <Col md={3}> <Card className="options"><div className="title" onClick={()=>window.location.href="/Ind?service=Beauty&key="+key}>Beauty</div></Card> </Col>
        </Row>
        </div>
    </div>
  )
}

export default Individual;