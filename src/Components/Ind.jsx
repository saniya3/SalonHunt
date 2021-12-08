import React,{useState,useEffect} from "react";
import Loader from "react-loader-spinner";
import { database } from "../fire";
import { ref, onValue} from "@firebase/database";
import IndCard from "./IndCard";
import NavBar from "./Navbar/index";
import {Row} from  "react-bootstrap"

function Ind(props){
  const params = new URLSearchParams(window.location.search)
  const URLkey=params.get('id');
  const keyy=params.get('key');
	const service=params.get('service');
    function createCard(data){
        console.log(keyy)
        return(
          <IndCard
              id={data.id}
              urlkey={keyy}
              key={data.key}
              name={data.name.charAt(0).toUpperCase() + data.name.substr(1).toLowerCase()}
              bio={data.bio}
              add={data.add}
              exp={data.exp}
              ser={data.ser}
              phone={data.phone}
              img={data.img}
          />
        );  
      }
    const [dataArr,setArr]=useState([])
    useEffect(() => {
    onValue(ref(database,'individual/'),(snapshot)=>{
      let dataArr2=[]
        snapshot.forEach(function(value){
          if(value.val().services.includes(service)){
            console.log("yes")
            console.log(value.val().name)
            dataArr2.push({
              key:value.key,
              id:value.val().uid,
              name:value.val().name,
              bio:value.val().bio,
              add:value.val().address,
              exp:value.val().experience,
              img:value.val().photoURL,
              ser:value.val().services,
              phone:value.val().contact
            })
          }
        })
      setArr(dataArr2.map(createCard))
    }) 
  },[])
  return(
    <div>
      <NavBar/>
      <br/>
      <Row>
         {dataArr.length!==0?dataArr:<Loader type="BallTriangle" color="tan"/>}
      </Row>
    </div>
  )
}

export default Ind