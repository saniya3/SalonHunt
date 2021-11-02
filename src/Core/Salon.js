import React from "react";
import NavBar from "../Components/Navbar/index";
import {Row,Col} from "react-bootstrap";
import SalonCard from "../Components/SalonCard";
import avatar1 from "../Assets/Images/avatar1.jfif";
import { database } from "../fire";
import { onValue,ref } from "@firebase/database";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt ,faSearch,faFilter,faRupeeSign} from '@fortawesome/free-solid-svg-icons'


function createCard(data){
  console.log("done")
  return(
    <SalonCard
        id={data.key}
        key={data.key}
        title={data.title}
        loc={data.loc}
        exp={data.exp}
        ser={data.ser}
        img={data.img}
    />
  );  
}
let dataArr=[];
onValue(ref(database, 'business/'), (snapshot) => {
  snapshot.forEach(function(value){
    dataArr.push({
      key:value.val().uid,
      title:value.val().company,
      loc:value.val().location,
      exp:value.val().experience,
      img:value.val().photoURL
    })
  })
});

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option,
});
 
// Sample options for search box

const myOptions = ["Looks","Geetanjali","data1","data2","sample text"];
const serviceOptions=["Hair","Makeup","Lashes","Tattoo","Beauty"];
const priceOptions=["1","2","3","4","5"];

function Salon(props){
  return(
      <div>
        <NavBar/>
        <br/>
        <h1 className="Ftitle">Salons</h1>
        <div className="filter">
            <Row>
              <Col md={2} >
              <Autocomplete
                renderInput={(params) => (
                  <TextField {...params}
                      label={<FontAwesomeIcon icon={faMapMarkerAlt} className="iconStyle"/>}
              />)}/>
              </Col>
              <Col md={2} >
              <Autocomplete
                  freeSolo
                  filterOptions={filterOptions}
                  options={myOptions}
                  renderInput={(params) => (
                  <TextField {...params}
                      label={<FontAwesomeIcon icon={faSearch} className="iconStyle"/>}
                  />
                )}
              />
              </Col>
                <Col md={2} >
                <Autocomplete
                  freeSolo
                  filterOptions={filterOptions}
                  options={serviceOptions}
                  renderInput={(params) => (
                  <TextField {...params}
                      label={<FontAwesomeIcon icon={faFilter} className="iconStyle"/>}
                  />
                )}
              />
              </Col>
              <Col md={2} >
                <Autocomplete
                  freeSolo
                  filterOptions={filterOptions}
                  options={priceOptions}
                  renderInput={(params) => (
                  <TextField {...params}
                      label={<FontAwesomeIcon icon={faRupeeSign} className="iconStyle"/>}
                  />
                )}
              />
              </Col>
              <Col md={1}>
                  <button className="btn" style={{backgroundColor:"#e8ded1"}}>Apply</button>
              </Col>
            </Row>
        </div>
        <br/>
        <hr/>
        <br/>
       <div>
           <Row>
             {dataArr.map(createCard)}
           </Row>
        </div>       
        <br/>
        <br/>
    </div>
  )
}

export default Salon;