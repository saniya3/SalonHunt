import React,{useState,useEffect, useRef} from "react";
import NavBar from "./Navbar";
import { Row,Col } from "react-bootstrap";
import "../Styles/salonProfile.css"
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAuth } from "@firebase/auth";
import { ref as Ref ,getDownloadURL} from "@firebase/storage";
import { storage } from "../fire";
import { push,ref, onValue} from "firebase/database";
import { database } from "../fire";
import { database as db } from "../fire";
import RevCard from "./RevCard";
import { faPeopleArrows,faHandsHelping,faLocationArrow,faEnvelope,faPhone,faTimesCircle } from '@fortawesome/free-solid-svg-icons'


function SalonProfile(props){
    const params = new URLSearchParams(window.location.search)
    const URLkey=params.get('id');
    const revRef=useRef(null)
    const keyy=params.get('key');
    const [dataArr,setArr]=useState([])
    const [revArr,setRevArr]=useState([]);
    const [s1,setS1]=useState();
    const [s2,setS2]=useState();
    const[rev,setRev]=useState(false)
    const [isLogged, setLog]=useState(false);
    getAuth().onAuthStateChanged(function(currentUser) {
        if (currentUser) {
           setLog(true);
        } else {
           setLog(false);
        }
     })
    function createRev(data){
        return(
            <RevCard
              name={data.name}
              rev={data.rev}      
              key={data.key}
              id={data.id}
            />
        )

    }

    useEffect(() => {
        onValue(ref(db, 'business/'), (snapshot) => {
            let dataArr2=[]
            snapshot.forEach(function(value){
              if (value.val().uid===URLkey){
                dataArr2.push({
                    key:value.key,
                    id:value.val().uid,
                    title:value.val().company,
                    loc:value.val().location,
                    mail:value.val().email,
                    emp:value.val().employees,
                    exp:value.val().experience,
                    ser:value.val().services,
                    img:value.val().photoURL,
                    phone:value.val().contact
                })
              }
            })
          setArr(dataArr2[0])
        })
        
        
    },[])
   
        
    function handleClick(event) {
        const modal = document.querySelector(".modal")
        modal.style.display = "block";
    }
   
    getDownloadURL(Ref(storage, "/GalleryWall/"+URLkey+"/s1")).then((URL) => {  
        setS1(URL)
    }).catch((error)=>{
        onValue(ref(db, 'business/'+dataArr.key+"/reviews/"), (snap) => {
            let revArr2=[]
            snap.forEach(function(v){
                revArr2.push({
                    name:v.val().user,
                    rev:v.val().review,
                    key:v.key,
                    id:v.val().uid
                })
            }) 
            setRevArr(revArr2.map(createRev))  
        })
    })
    getDownloadURL(Ref(storage, "/GalleryWall/"+URLkey+"/s2")).then((URL) => {  
        setS2(URL)
    }).then(()=>{
        onValue(ref(db, 'business/'+dataArr.key+"/reviews/"), (snap) => {
            let revArr2=[]
            snap.forEach(function(v){
                revArr2.push({
                    name:v.val().user,
                    rev:v.val().review,
                    key:v.key,
                    id:v.val().uid
                })
            }) 
            setRevArr(revArr2.map(createRev))  
        })
    })

    function handleRev(){
        setRev(true);
    }
    function AddRev(){
        if(revRef.current.value!==""){ 
           console.log(dataArr.key)
                    push(ref(database,"/business/"+dataArr.key+"/reviews/"),{
                        user:getAuth().currentUser.displayName,
                        review:revRef.current.value
                    }).then(()=>{
                        console.log("done");
                        revRef.current.value="";
                    })  
        }
    }
    return(
        <div>
           <NavBar/>
            <div className="profileCard">
               <Row>
                   <Col md={6}>
                       <h1 className="Ftitle">{dataArr.title}</h1>
                       <hr/>
                       <div className="exp"><FontAwesomeIcon icon={faPeopleArrows} className="iconStyle" /><b>Employees: </b>
                        {dataArr.emp}
                       </div>
                       <br/>
                       <div className="exp"><FontAwesomeIcon icon={faHandsHelping} className="iconStyle" /><b>Services: </b>
                        {dataArr.ser}
                       </div>
                       <br/>
                       <div className="exp"><FontAwesomeIcon icon={faLocationArrow} className="iconStyle" /><b>Location: </b>
                        {dataArr.loc}
                       </div>
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
                                    <p/>
                                    <div className="exp"><FontAwesomeIcon icon={faPhone} className="iconStyle" /><b>Contact: </b>
                                    {dataArr.phone}
                                    </div>
                                </Row>
                                </Row>   
                         </div>
                        </div>
                       <button className="btn btn-success info">Book a slot</button>
                       <button className="btn btn-info info" onClick={handleClick}>Contact Info</button>
                   </Col>
                   <Col md={6} className="dp">
                      <img alt="dp" style={{width:"90%"}} src={dataArr.img}/>
                   </Col>
               </Row>
               </div>
               <br/>
               {s1&&(<div>
               <h1 className="Ftitle" >Gallery Wall</h1>
                <br/>
                <div>
                    <Row>
                        <Col className="imgs" md={5}>
                        <img alt="dp" src={s1}/>
                        </Col>
                        <Col className="imgs" md={5}>
                        <img alt="dp" src={s2}/>
                        </Col>
                    </Row>
                    <br/> 
                    <br/>
                </div> 
                </div>
                )}  
                <br/>
              <div>
               <a className="view" href={"/Staff?id="+URLkey+"&key="+keyy} style={{cursor:"pointer"}}>Meet Our Staff</a>
                <br/>
           </div>
           <br/>
          <div className="review">
           <hr/>
           <br/>
               <h1 className="Ftitle">Reviews</h1>
                <br/>
                {isLogged&&<div class="rev">
                    <textarea class="area" placeholder="   Write a review..." ref={revRef} onChange={handleRev}/>
                    {rev&&(<button className="btn revBut btn-success" onClick={AddRev}>Add</button>)}  
                </div>}
                <br/>
                    <br/>
                {revArr.length!==0&&(<div className="revCard">
                 {revArr}
                  
                </div>)} 
                <br/>
                <br/>
           </div>
          
        </div>
    )
}


export default SalonProfile;