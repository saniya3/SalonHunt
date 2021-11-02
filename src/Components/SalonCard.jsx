import React from "react";
import {Row,Col} from "react-bootstrap";
import Card from "@material-ui/core/Card";

function SalonCard(props){
    console.log("happening");
    return(
       <Col md={4}>
        <Card className="profileCard">
            <Row>
                <Col md={8}>
                    <h5 className="Ftitle">{props.title}</h5>
                    <p>Location:{props.loc}</p>
                    <p>Experience:{props.exp}</p>
                    <p>Experise:{props.ser}</p>
                </Col>
                <Col md={4}>
                    <img alt="dp" className="profileAv" src={props.img}/>
                </Col>
            </Row>
        </Card>
       </Col>
    );
}

export default SalonCard