import React,{useState,useEffect} from "react";
import NavBar from "./Navbar";
import { Row,Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ref, onValue} from "firebase/database";
import { database as db } from "../fire";
import { faStickyNote,faStar,faEnvelope,faTimesCircle, faCog } from '@fortawesome/free-solid-svg-icons'


function EmpProfile(props){
    const params = new URLSearchParams(window.location.search)
    const URLkey=params.get('id');
    const [dataArr,setArr]=useState([])
    useEffect(() => {
        onValue(ref(db, 'employee/'), (snapshot) => {
            let dataArr2=[]
            snapshot.forEach(function(value){
              if (value.val().uid===URLkey){
                dataArr2.push({
                    key:value.key,
                    id:value.val().uid,
                    name:value.val().username,
                    bio:value.val().bio,
                    add:value.val().address,
                    mail:value.val().email,
                    exp:value.val().experience,
                    ser:value.val().expertise,
                    img:value.val().photoURL,
                    phone:value.val().contact
                })
              }
            })
          setArr(dataArr2[0])
          console.log(dataArr)
        })
        
        
    },[])   
    function handleClick(event) {
        const modal = document.querySelector(".modal")
        modal.style.display = "block";
    }
    
    return(
       
        <div>
           <NavBar/>
            <div className="profileCard">
               <Row>
                   <Col md={6}>
                       <h1 className="Ftitle">{dataArr.name}</h1>
                       <hr/>
                       <div className="exp"><FontAwesomeIcon icon={faStickyNote} className="iconStyle" /><b>Bio: </b>
                        {dataArr.bio}
                       </div>
                       <br/>
                       <div className="exp"><FontAwesomeIcon icon={faStar} className="iconStyle" /><b>Experience: </b>
                        {dataArr.exp}
                       </div>
                       <br/>
                       <div className="exp"><FontAwesomeIcon icon={faCog} className="iconStyle" /><b>Expertise: </b>
                        {dataArr.ser}
                       </div>
                       <br/>
                       <br/>
                       <div class="modal">
                        <div>
                           <br/>
                                <Row>
                                    <Col md={10}>  
                                    </Col>
                                    <Col md={2}>
                                       <FontAwesomeIcon icon={faTimesCircle} className="close" onClick={()=>document.querySelector(".modal").style.display="none"}/>
                                    </Col>
                                <Row class="modal_content">
                                    <div className="exp"><FontAwesomeIcon icon={faEnvelope} className="iconStyle" /><b>Email: </b>
                                    {dataArr.mail}
                                    </div>
                                </Row>
                                </Row>   
                         </div>
                        </div>
                       <button className="btn btn-info info" onClick={handleClick}>Contact Info</button>
                   </Col>
                   <Col md={6} className="dp">
                      <img alt="dp" className="profilePic" src={dataArr.img}/>
                   </Col>
               </Row>
               </div>  
                <br/>
              </div>
    )
}


export default EmpProfile;