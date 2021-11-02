import React,{useState} from "react";
import NavBar from "../Components/Navbar";
import Form from "../Components/form";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function SignUp(){
    const userIsRegistered=false;

    const [isOpen,setOpen]=useState(false);
    function toggle(){
        setOpen(!isOpen);
    }

    return(
        <div>
            <NavBar/>
            <Row>
                <Col md={6}> 
                  <Form isRegistered={userIsRegistered}></Form>
                </Col>
                <Col md={6}>
                <br/>
                <br/>
                    <div className="formCard">
                        <p classname="Ftitle">Sign Up as an agent and host your business</p>
                        
                        {/* <button type="submit" className="formbutton">Create your Business profile</button> */}
                        <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                        <DropdownToggle style={{backgroundColor:" rgba(218, 193, 161, 0.801)",color:"black",border:"rgba(218, 193, 161, 0.801)"}} caret>
                           Create your Business profile
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem href="/SignUpBusiness">Business</DropdownItem>
                            <DropdownItem href="/SignUpEmployee">Business Employee</DropdownItem>
                            <DropdownItem href="/SignUpIndividual">Individual</DropdownItem>
                        </DropdownMenu>
                        </ButtonDropdown>
                        <br/>
                        <br/>
                        </div>
                    
                </Col>
            </Row>  
        </div>
    )
}

export default SignUp;