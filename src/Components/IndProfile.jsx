import React,{useState,useEffect,useRef} from "react";
import NavBar from "./Navbar";
import { Row,Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ref, onValue,push} from "firebase/database";
import { getAuth } from "@firebase/auth";
import { ref as Ref ,getDownloadURL} from "@firebase/storage";
import { storage } from "../fire";
import { database as db } from "../fire";
import Carousel from 'react-bootstrap/Carousel';
import RevCard from "./RevCard";
import { faStickyNote,faHandsHelping,faStar,faEnvelope,faPhone,faTimesCircle,faAddressCard } from '@fortawesome/free-solid-svg-icons'


function IndProfile(props){
    const params = new URLSearchParams(window.location.search)
    const URLkey=params.get('id');
    const revRef=useRef(null)
    const [dataArr,setArr]=useState([])
    const [s1,setS1]=useState()
    const [s2,setS2]=useState()
    const [s3,setS3]=useState()
    const [revArr,setRevArr]=useState([])
    const [rev,setRev]=useState(false)
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
        onValue(ref(db, 'individual/'), (snapshot) => {
            let dataArr2=[]
            snapshot.forEach(function(value){
              if (value.val().uid===URLkey){
                dataArr2.push({
                    key:value.key,
                    id:value.val().uid,
                    name:value.val().name,
                    bio:value.val().bio,
                    add:value.val().address,
                    mail:value.val().email,
                    exp:value.val().experience,
                    ser:value.val().services,
                    img:value.val().photoURL,
                    phone:value.val().contact
                })
              }
            })
          setArr(dataArr2[0])
          console.log(dataArr)
        })
        
        
    },[])    
    function handleClick() {
        const modal = document.querySelector(".modal")
        modal.style.display = "block";
    }
    function handleClick2() {
        const modal2 = document.querySelector(".modal2")
        modal2.style.display = "block";
    }

    function getStorage(){
        getDownloadURL(Ref(storage, "/Work/"+URLkey+"/s1")).then((URL) => {  
            setS1(URL)
        })&& getDownloadURL(Ref(storage, "/Work/"+URLkey+"/s2")).then((URL) => {  
            setS2(URL)
        })&& getDownloadURL(Ref(storage, "/Work/"+URLkey+"/s3")).then((URL) => {  
            setS3(URL)
        })
    }

    function getReviews(){
        onValue(ref(db, 'individual/'+dataArr.key+"/reviews/"), (snap) => {
            let revArr2=[]
            snap.forEach(function(v){
                revArr2.push({
                    name:v.val().user,
                    rev:v.val().review,
                    key:v.key,
                    id:v.val().uid
                })
            }) 
            if(revArr2.length!==0){
                setRevArr(revArr2.map(createRev))
            }  
        })
    }

    if(s1===undefined || s2===undefined || s3===undefined){
        getStorage()
    }

    if(revArr.length===0){
        getReviews()
    }

    function handleRev(){
        setRev(true);
    }
    function AddRev(){
        if(revRef.current.value!==""){ 
            console.log(dataArr.key)
            push(ref(db,"/individual/"+dataArr.key+"/reviews/"),{
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
                       <div className="exp"><FontAwesomeIcon icon={faHandsHelping} className="iconStyle" /><b>Services: </b>
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
                                    <p/>
                                    <div className="exp"><FontAwesomeIcon icon={faPhone} className="iconStyle" /><b>Contact: </b>
                                    {dataArr.phone}
                                    </div>
                                </Row>
                                </Row>   
                         </div>
                        </div>
                        <div class="modal2">
                          <div>
                          <br/>
                            <Row>
                                <Col md={10}>  
                                </Col>
                                <Col md={2}>
                                    <FontAwesomeIcon icon={faTimesCircle} className="close" onClick={()=>document.querySelector(".modal2").style.display="none"}/>
                                </Col>
                            <Row class="modal_content2">
                                <div className="exp"><FontAwesomeIcon icon={faAddressCard} className="iconStyle" /><b>Address: </b>
                                {dataArr.add}
                                <p></p>
                                <br/>
                                </div>
                            </Row>
                            </Row>  
                            </div> 
                        </div>
                       <button className="btn btn-success info" onClick={handleClick2}>Address</button>
                       <button className="btn btn-info info" onClick={handleClick}>Contact Info</button>
                       
                   </Col>
                   <Col md={6} className="dp">
                      <img alt="dp" className="profilePic" src={dataArr.img}/>
                   </Col>
               </Row>
               <br/>
               {(s1||s2||s3)&&<div className="work">
                <br/>
                <h1 className="Ftitle">Work Sample</h1>
                <br/>
                <Carousel touch interval={null}>
                    {s1&&<Carousel.Item>
                        <img alt="" src={s1}/>
                    </Carousel.Item>}
                    {s2&&<Carousel.Item>
                        <img alt="" src={s2}/>
                    </Carousel.Item>}
                    {s3&&<Carousel.Item>
                        <img alt="" src={s3}/>
                    </Carousel.Item>}
                </Carousel>
                <br/>
                <br/>
                </div>}
                </div>
                <br/>
                {revArr.length!==0&&(<div className="review">
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
                    <div className="revCard">
                    {revArr}
                    
                    </div> 
                    <br/>
                    <br/>
                </div>)}
            </div>
    )
}


export default IndProfile;