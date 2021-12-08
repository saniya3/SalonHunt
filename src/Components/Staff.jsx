import React,{useEffect,useState} from "react";
import NavBar from "./Navbar";
import { database as db } from "../fire";
import { onValue,ref } from "@firebase/database";
import EmpCard from "./EmpCard";
import { Row } from "react-bootstrap";

const params = new URLSearchParams(window.location.search)
const URLkey=params.get('id');

function Staff(){
    const [empArr,setEmp]=useState([])
    function createCard(data){
        return(
            <EmpCard
                id={data.uid}
                urlkey={URLkey}
                key={data.key}
                name={data.name.charAt(0).toUpperCase() + data.name.substr(1).toLowerCase()}
                bio={data.bio}
                exp={data.exp}
                ser={data.ser}
                img={data.img}
                mail={data.mail}
            />
        );  
    }
    useEffect(() => {
        let empArr2=[];
        onValue(ref(db, 'business/'), (snapshot) => {
            snapshot.forEach(function(value){
              if (value.val().uid===URLkey){
                  onValue(ref(db,'business/'+value.key+'/employee/'),(snap)=>{
                    snap.forEach(function(value2){
                      empArr2.push({
                        uid:value2.val().uid,
                        key:value2.key,
                        name:value2.val().username,
                        bio:value2.val().bio,
                        exp:value2.val().experience,
                        ser:value2.val().expertise,
                        img:value2.val().photoURL,
                        mail:value2.val().email
                      })
                      console.log(empArr2)
                      setEmp(empArr2.map(createCard))

                  })
                })
              }
            })
        }) 
    },[])
    return(
        <div>
            <NavBar/>
            <br/>
            <Row>
              {empArr}
            </Row>
        </div> 
    );
}

export default Staff