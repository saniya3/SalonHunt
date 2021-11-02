import React from "react";
import Styles from "../Styles/chat.css"
import chat from "../Assets/Icons/chat.png"

function Chat(){
  function openForm3(event){
    event.preventDefault();
     document.getElementById("myForm3").style.display="block";
  }
  function closeForm3(){
    document.getElementById("myForm3").style.display="none";
  }
    return(
      <div>
      <img alt="Chat" className="chatIcon" src={chat} onClick={openForm3}/>
      <div className="form-popup3" id="myForm3">
        <form class="form-container3">
          <h4>Query</h4>
          <input type="email" placeholder="Enter Email" name="email"/>
          <input type="password" placeholder="Enter Password" name="psw"/>
          <button type="submit" class="btn">Login</button>
          <button class="btn cancel" onclick={closeForm3}>Close</button>
        </form>
      </div>
      </div>
    );
}

export default Chat