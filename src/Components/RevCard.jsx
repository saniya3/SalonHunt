import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';

function RevCard(props){
    return(
        <div>
        <h1 className="title"><FontAwesomeIcon icon={faUserCircle} className="iconStyle" />{props.name}</h1>
        <p>{props.rev}</p>

        </div>
    )
}

export default RevCard