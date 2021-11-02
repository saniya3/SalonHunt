import React from "react";
import Form from "../Components/form";

function login(){
    const userIsRegistered=true;
    return(
        <div>
            <Form isRegistered={userIsRegistered}></Form>
        </div>
    )
}

export default login;