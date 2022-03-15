import React from "react";
import NavBar from "../Components/Navbar";
import Form from "../Components/form";

function login(){
    const userIsRegistered=true;
    return(
        <div>
            <NavBar/>
            <Form isRegistered={userIsRegistered}></Form>
        </div>
    )
}

export default login;