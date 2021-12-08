import React from "react";
import {Row,Col} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Card from "@material-ui/core/Card";

function IndCard(props){
    console.log("happening");
    console.log(props.urlkey)
    return(
       <Col md={3}>
       <Link to={"/IndProfile?id="+props.id+"&key="+props.urlkey} style={{textDecoration:"none"}}>
        <Card className="profileCard">
            <Row>
                <Col md={8}>
                    <h5 className="Ftitle">{props.name}</h5>
                    <p>Bio:{props.bio}</p>
                    <p>Experience:{props.exp}</p>
                    <p>Expertise:{props.ser}</p>
                </Col>
                <Col md={4}>
                    <img alt="dp" className="profileAv" src={props.img}/>
                </Col>
            </Row>
        </Card>
        </Link>
       </Col>
    );
}

export default IndCard