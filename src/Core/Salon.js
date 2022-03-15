import React,{useState,useEffect} from "react";
import Loader from "react-loader-spinner";
import NavBar from "../Components/Navbar/index";
import {Row,Col} from "react-bootstrap";
import { database } from "../fire";
import { ref, onValue} from "@firebase/database";
import SalonCard from "../Components/SalonCard";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt ,faSearch,faFilter,faRupeeSign} from '@fortawesome/free-solid-svg-icons'


function SetCase(str){
    if(str!==undefined){
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
    }
}

function createCard(data){
  const params = new URLSearchParams(window.location.search)
  const key=params.get('key');
  console.log(key)
  console.log("done")
  console.log(data.title)
  return(
    <SalonCard
        id={data.id}
        urlkey={key}
        key={data.key}
        title={SetCase(data.title)}
        loc={SetCase(data.loc)}
        exp={data.exp}
        ser={data.ser}
        img={data.img}
    />
  );  
}

function Salon(){
  const[filteredArr,setFiltered]=useState([])
  const [filter,setFilter]=useState({
    title:"",
    loc:"",
    ser:""
  })
  const [dataArr,setArr]=useState([])
  let salonNames=[];
  let location=[];
  useEffect(() => {
  onValue(ref(database,'business/'),(snapshot)=>{
    let dataArr2=[]
      snapshot.forEach(function(value){
        dataArr2.push({
          key:value.key,
          id:value.val().uid,
          title:value.val().company,
          loc:value.val().location,
          exp:value.val().experience,
          img:value.val().photoURL,
          ser:value.val().services
        })
      })
    setArr(dataArr2.map(createCard))
  }) 
},[])

dataArr.map((item)=>{
  salonNames.push(item.props.title)
  location.push(item.props.loc)
})

let salonName=salonNames.map((item)=>
   SetCase(item)
)
salonName=Array.from(new Set(salonName));

let locations=location.map((item)=>
    SetCase(item)
)
locations=Array.from(new Set(locations))

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option,
});

const service=["Hair","Makeup","Lashes","Tattoo","Beauty"];
const priceOptions=["1","2","3","4","5"];

function handleSelect(e){
  console.log("hmm")
  const { name, value } = e.target;
  setFilter(prevValue=>{
    if (name==="title"){
      return {
        title: value,
        loc: prevValue.loc,
        ser: prevValue.ser
      };
    } 
    else if (name==="loc") {
      return {
        title: prevValue.title,
        loc: value,
        ser: prevValue.ser
      };
    }
    else if(name==="ser"){
      console.log("ok")
      return{
        title: prevValue.title,
        loc: prevValue.loc,
        ser: value
      };
    }
  })
}

function filterArray(){
  const filtered=dataArr.filter(function(item){
    console.log(filter)
    if(filter.title==='' && filter.loc===''){
      return item.props.ser.includes(filter.ser)
    }
    else if(filter.title==='' && filter.ser===''){
      return item.props.loc===filter.loc
    }
    else if(filter.loc==='' && filter.ser===''){
      return item.props.title===filter.title
    }
    else if(filter.title===''){
      return item.props.loc===filter.loc && item.props.ser.includes(filter.ser)
    }
    else if(filter.loc===''){
      return item.props.title===filter.title && item.props.ser.includes(filter.ser)
    }
    else if(filter.ser===''){
      return item.props.title===filter.title && item.props.loc===filter.loc
    }
    else{
      return item.props.title===filter.title && item.props.loc===filter.loc && item.props.ser.includes(filter.ser)
    }
  })
  setFiltered(filtered)
  console.log(filteredArr)
}



  return(
      <div>
        <NavBar/>
        <br/>
        <h1 className="Ftitle">Salons</h1>
        <div className="filter">
            <Row>
              <Col md={2} >
              <Autocomplete  
              onChange={(event, value) => console.log(value)}
                 freeSolo
                  filterOptions={filterOptions}
                  options={locations}
                  renderInput={(params) => (
                  <TextField {...params} onSelect={handleSelect} name="loc" value={filter.loc}
                      label={<FontAwesomeIcon icon={faMapMarkerAlt} className="iconStyle"/>}
              />)}/>
              </Col>
              <Col md={2} >
              <Autocomplete
                  freeSolo
                  filterOptions={filterOptions}
                  options={salonName}
                  renderInput={(params) => (
                  <TextField {...params} onSelect={handleSelect} onEmptied={handleSelect} name="title" value={filter.title}
                      label={<FontAwesomeIcon icon={faSearch} className="iconStyle"/>}
                  />
                )}
              />
              </Col>
                <Col md={2} >
                <Autocomplete
                  freeSolo
                  filterOptions={filterOptions}
                  options={service}
                  renderInput={(params) => (
                  <TextField {...params} onSelect={handleSelect} onEmptied={handleSelect} name="ser" value={filter.ser}
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
                  <button className="btn" style={{backgroundColor:"#e8ded1"}} onClick={filterArray}>Apply</button>
              </Col>
            </Row>
        </div>
        <br/>
        <hr/>
        <br/>
       <div>
          <Row>
            {filteredArr.length!==0?filteredArr:(dataArr.length!==0?dataArr:<Loader type="BallTriangle" color="tan"/>)}
          </Row>
        </div>       
      <br/>
      <br/>
    </div>
  )
}

export default Salon;