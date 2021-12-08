import React,{useState,useEffect} from "react";
import NavBar from "../Components/Navbar";
import { getAuth, updateProfile} from "firebase/auth";
import avt from "../Assets/Images/avt.jpg";
import { onValue,ref,update as up } from "@firebase/database";
import { ref as Ref ,uploadBytes,getDownloadURL} from "@firebase/storage";
import { database as db,storage } from "../fire";
import { Row,Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Edit=(props)=>{
  const [role,setRole]=useState(null)
  const [keyy,setKey]=useState("")
  const [s1,setS1]=useState(false)
  const [s2,setS2]=useState(false)
  const [s3,setS3]=useState(false)
  const[displayImage,setImg]=useState(avt);
  const[displayImage2,setImg2]=useState(avt);
  const[displayImage3,setImg3]=useState(avt);
  const [profile,setProfile]=useState({
    username:"",
    photoURL:"",
    phone:"",
    emp:"",
    exp:"",
    loc:"",
    add:"",
    bio:"",
    ser:"",
    link:"",
    uid:""
  })
  const params = new URLSearchParams(window.location.search)
	const key=params.get('key');
  useEffect(() => {
      onValue(ref(db, 'business/'), (snapshot) => {
          snapshot.forEach(function(value){
            if(value.val().uid===key){
              setKey(value.key)
              console.log(value.val().uid)
              setRole("business")
              setProfile({
                username:value.val().company,
                photoURL:value.val().photoURL,
                phone:value.val().contact,
                emp:value.val().employees,
                loc:value.val().location,
                ser:value.val().services
              })
            }
          })
      })
      onValue(ref(db, 'individual/'), (snapshot) => {
        snapshot.forEach(function(value){
          if(value.val().uid===key){
            setKey(value.key)
            console.log(value.val().uid)
            setRole("individual")
            setProfile({
              username:value.val().name,
              photoURL:value.val().photoURL,
              phone:value.val().contact,
              exp:value.val().experience,
              add:value.val().address,
              bio:value.val().bio,
              ser:value.val().services
            })
          }
        })
      })
      onValue(ref(db, 'users/'), (snapshot) => {
        snapshot.forEach(function(value){
          console.log(value.val())
          if(value.val().uid===key){
            setKey(value.key)
            console.log(value.val().uid)
            setRole("user")
            setProfile({
              username:value.val().username,
              photoURL:value.val().photoURL
            })
          }
        })
      })
      onValue(ref(db, 'employee/'), (snapshot) => {
        snapshot.forEach(function(value){
          if(value.val().uid===key){
            setKey(value.key)
            console.log(value.val().uid)
            setRole("employee")
            setProfile({
              username:value.val().username,
              photoURL:value.val().photoURL,
              exp:value.val().experience,
              ser:value.val().expertise,
              bio:value.val().bio,
              link:value.val().link,
              uid:value.val().uid
            })
          }
        })
      })
  },[])
  let photoURL
    const[update,setUpdate]=useState(false);
    const auth=getAuth();
    let user = auth.currentUser;
    const [isLogged, setLog]=useState(false);
    auth.onAuthStateChanged(function(currentUser) {
        if (currentUser) {
           setLog(true);
        } else {
           setLog(false);
        }
     })
    if (isLogged) {
        console.log(user.uid)
        console.log("Sign-in provider: " + user.providerId);
        console.log("  Provider-specific UID: " + user.uid);
        console.log("  Name: " + user.displayName);
        console.log("  Email: " + user.email);
        console.log(user.photoURL);
        photoURL=user.photoURL    
    }
    else{
      console.log("yo");
    }
    function handleChange(event){
        setUpdate(true);
        console.log(update)
        const { name, value } = event.target;
        setProfile(prevValue => {
            if (name === "username") {
              return {
                username: value,
                phone:prevValue.phone,
                emp:prevValue.emp,
                exp:prevValue.exp,
                loc:prevValue.loc,
                add:prevValue.add,
                bio:prevValue.bio,
                ser:prevValue.ser,
                photoURL: prevValue.photoURL
              };
            }
            else if(name === "phone"){
              return {
                username:prevValue.username,
                phone:value,
                emp:prevValue.emp,
                exp:prevValue.exp,
                loc:prevValue.loc,
                add:prevValue.add,
                bio:prevValue.bio,
                ser:prevValue.ser,
                photoURL: prevValue.photoURL
              }  
            }
            else if(name === "emp"){
              return {
                username:prevValue.username,
                phone:prevValue.phone,
                emp:value,
                exp:prevValue.exp,
                loc:prevValue.loc,
                add:prevValue.add,
                bio:prevValue.bio,
                ser:prevValue.ser,
                photoURL: prevValue.photoURL
              }  
            }
            else if(name === "exp"){
              return {
                username:prevValue.username,
                phone:prevValue.phone,
                emp:prevValue.emp,
                exp:value,
                loc:prevValue.loc,
                add:prevValue.add,
                bio:prevValue.bio,
                ser:prevValue.ser,
                photoURL: prevValue.photoURL
              }  
            }
            else if(name === "loc"){
              return {
                username:prevValue.username,
                phone:prevValue.phone,
                emp:prevValue.emp,
                exp:prevValue.exp,
                loc:value,
                add:prevValue.add,
                bio:prevValue.bio,
                ser:prevValue.ser,
                photoURL: prevValue.photoURL
              }  
            }
            else if(name === "add"){
              return {
                username:prevValue.username,
                phone:prevValue.phone,
                emp:prevValue.emp,
                exp:prevValue.exp,
                loc:prevValue.loc,
                add:value,
                bio:prevValue.bio,
                ser:prevValue.ser,
                photoURL: prevValue.photoURL
              }  
            }
            else if(name === "bio"){
              return {
                username:prevValue.username,
                phone:prevValue.phone,
                emp:prevValue.emp,
                exp:prevValue.exp,
                loc:prevValue.loc,
                add:prevValue.add,
                bio:value,
                ser:prevValue.ser,
                photoURL: prevValue.photoURL
              }  
            }
            else if(name === "ser"){
              return {
                username:prevValue.username,
                phone:prevValue.phone,
                emp:prevValue.emp,
                exp:prevValue.exp,
                loc:prevValue.loc,
                add:prevValue.add,
                bio:prevValue.bio,
                ser:value,
                photoURL: prevValue.photoURL
              }  
            }
            
          // } else if (name === "photo") {
            //   return {
            //     username: prevValue.username,
            //     photoURL: value
            //   };
            // }
        })
     }
     function updatePro(event){
        event.preventDefault();
        updateProfile(auth.currentUser, {
                displayName: profile.username
            }).then(() => {
              if(role==="business"){
                console.log("yes")
                up(ref(db,'business/'+keyy+"/"),{
                  company:profile.username,
                  contact:profile.phone,
                  employees:profile.emp,
                  location:profile.loc,
                  services:profile.ser
                }).then((employees)=>{
                   console.log(employees)
                })
              }
              else if(role==="individual"){
                up(ref(db,'individual/'+keyy+"/"),{
                  name:profile.username,
                  contact:profile.phone,
                  experience:profile.exp,
                  address:profile.add,
                  bio:profile.bio,
                  services:profile.ser
                })
              }
              else if(role==="employee"){ 
                up(ref(db,'employee/'+keyy+"/"),{
                  username:profile.username,
                  experience:profile.exp,
                  expertise:profile.ser,
                  bio:profile.bio
                }).then(()=>{
                  let id;
                  let paramString;
                  profile.link&&(paramString= profile.link.split("=")[1]);
                  paramString&&(paramString=paramString.split("&")[0]);
                  let queryString = new URLSearchParams(paramString);
                  for (let pair of queryString.entries()) {
                      id=pair[0]
                  }
                  console.log(id)
                  onValue(ref(db,'business/'),(snapshot) => {
                    snapshot.forEach(function(value){
                        if(value.val().uid===id){
                          onValue(ref(db,'business/'+value.key+"/employee"),(snap) => {
                            snap.forEach(function(v){
                                if(v.val().uid===profile.uid){
                                  up(ref(db,'business/'+value.key+'/employee/'+v.key+'/'),{
                                    username:profile.username,
                                    experience:profile.exp,
                                    expertise:profile.ser,
                                    bio:profile.bio
                                  })
                                }
                              })
                            })
                        }
                      })
                    })

                })

              }
              else{
                up(ref(db,'users/'+keyy+"/"),{
                   username:profile.username
                })
              }
              console.log(" updated");
            }).then(()=>{
              if(role==="business"){
                if(s1){
                const displayImg=document.getElementById("displayImg");
                const file = displayImg.files[0];
                var storageRef = Ref(storage,"/GalleryWall/"+user.uid+"/s1");
                const metadata = {
                    contentType: 'image/jpg'
                };
                uploadBytes(storageRef, file,metadata).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                })
              }
              if(s2){
                const displayImg2=document.getElementById("displayImg2");
                const file2 = displayImg2.files[0];
                var storageRef2 = Ref(storage,"/GalleryWall/"+user.uid+"/s2");
                const metadata2 = {
                    contentType: 'image/jpg'
                };
                uploadBytes(storageRef2, file2,metadata2).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                })
              }
            }
            else if(role==="individual"){
              if(s1){
                const displayImg=document.getElementById("displayImg");
                const file = displayImg.files[0];
                var storage1= Ref(storage,"/Work/"+user.uid+"/s1");
                const metadata = {
                    contentType: 'image/jpg'
                };
                uploadBytes(storage1, file,metadata).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                })
              }
              if(s2){
                const displayImg2=document.getElementById("displayImg2");
                const file2 = displayImg2.files[0];
                var storage2 = Ref(storage,"/Work/"+user.uid+"/s2");
                const metadata2 = {
                    contentType: 'image/jpg'
                };
                uploadBytes(storage2, file2,metadata2).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                })
              }
              if(s3){
                const displayImg3=document.getElementById("displayImg3");
                const file3 = displayImg3.files[0];
                var storageRef3 = Ref(storage,"/Work/"+user.uid+"/s3");
                const metadata3 = {
                    contentType: 'image/jpg'
                };
                uploadBytes(storageRef3, file3,metadata3).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                })
              }

            }
            }).then(()=>{
              const modal = document.querySelector(".modal")
              modal.style.display = "block";
            }).catch((error) => {
            // An error occurred
            // ...
            });
     }
     if(role==="business"){
      if(Ref(storage, "/GalleryWall/"+key+"/s1")){
        getDownloadURL(Ref(storage, "/GalleryWall/"+key+"/s1")).then((URL) => {  
        setImg(URL)
      })
      }
      if(Ref(storage, "/GalleryWall/"+key+"/s2")){
        getDownloadURL(Ref(storage, "/GalleryWall/"+key+"/s2")).then((URL) => {  
          setImg2(URL)
        })
      }
    }
    else if(role==="individual"){
      if(Ref(storage, "/Work/"+key+"/s1")){
        getDownloadURL(Ref(storage, "/Work/"+key+"/s1")).then((URL) => {  
        setImg(URL)
      })
      }
      if(Ref(storage, "/Work/"+key+"/s2")){
        getDownloadURL(Ref(storage, "/Work/"+key+"/s2")).then((URL) => {  
          setImg2(URL)
        })
      }
      if(Ref(storage, "/Work/"+key+"/s3")){
        getDownloadURL(Ref(storage, "/Work/"+key+"/s3")).then((URL) => {  
          setImg3(URL)
        })
      }
    }
 
    function imageHandler(event){
      setS1(true)
      setUpdate(true)
        const displayImg=document.getElementById("displayImg");
        const files = displayImg.files[0];
        displayImg.src = URL.createObjectURL(event.target.files[0]);
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
                setImg(displayImg.src);
                console.log(displayImage);
            });    
        }
    }
    console.log(role)
    function imageHandler2(event){
      setS2(true)
      setUpdate(true)
        const displayImg=document.getElementById("displayImg2");
        const files = displayImg.files[0];
        displayImg.src = URL.createObjectURL(event.target.files[0]);
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
                setImg2(displayImg.src);
                console.log(displayImage2);
            });    
        }
    }
    function imageHandler3(event){
      setS3(true)
      setUpdate(true)
        const displayImg=document.getElementById("displayImg3");
        const files = displayImg.files[0];
        displayImg.src = URL.createObjectURL(event.target.files[0]);
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
                setImg3(displayImg.src);
                console.log(displayImage3);
            });    
        }
    }
    return(
        <div>
          <NavBar/>
          <br/>
          <h1 className="Ftitle">Edit your Profile</h1>
          <hr style={{width:"80%",marginInlineStart:"10%"}}/>
              <img alt="dp" src={photoURL} style={{width:"150px"}}/>
                {role==="business"&& (<form className="form1">
                    User Name:<input type="text" onChange={handleChange} name="username" value={profile.username}/>
                    <br/>
                    Contact Number:<input type="tel" onChange={handleChange} name="phone" value={profile.phone}/>
                    <br/>
                    Employees:<input type="number" onChange={handleChange} name="emp" value={profile.emp}/>
                    <br/>
                    Location:<input type="text" onChange={handleChange} name="loc" value={profile.loc}/>
                    <br/>
                    Services:<input type="text" onChange={handleChange} name="ser" value={profile.ser}/>
                    <br/>
                    <div class="wall">
                    <p>Add Gallery Wall:</p>
                    <br/>
                    <Row>
                        <Col className="imgs" md={5}>
                        <input type="file" id="displayImg" accept="image/*" class="form-control" style={{display:"none",visibility:"none"}} onChange={imageHandler}/>
                         <label for="displayImg" class="floating-label"><img src={displayImage} alt="img" style={{width:"50%",height:"30%",cursor:"pointer"}}/>
                           <p className="headingImg" style={{fontSize:"13px"}}>{<FontAwesomeIcon icon={faPlus}/>}Upload a gallery wall picture</p>
                         </label>
                        </Col>
                        <Col className="imgs" md={5}>
                        <input type="file" id="displayImg2" accept="image/*" class="form-control" style={{display:"none",visibility:"none"}} onChange={imageHandler2}/>
                         <label for="displayImg2" class="floating-label"><img src={displayImage2} alt="img" style={{width:"50%",height:"30%",cursor:"pointer"}}/>
                           <p className="headingImg" style={{fontSize:"13px"}}>{<FontAwesomeIcon icon={faPlus}/>}Upload a gallery wall picture</p>
                         </label>
                        </Col>
                    </Row>
                    <br/> 
                    <br/>
                    </div>
               </form>)}
               {role==="employee"&& (<form className="form1">
                    User Name:<input type="text" onChange={handleChange} name="username" value={profile.username}/>
                    <br/>
                    Experience:<input type="text" onChange={handleChange} name="ser" value={profile.exp}/>
                    <br/>
                    Expertise:<input type="text" onChange={handleChange} name="ser" value={profile.ser}/>
                    <br/>
                    Bio:<input type="text" onChange={handleChange} name="bio" value={profile.bio}/>
                    <br/>
          
               </form>)}
               {role==="individual"&& (<form className="form1">
                    User Name:<input type="text" onChange={handleChange} name="username" value={profile.username}/>
                    <br/>
                    Contact Number:<input type="tel" onChange={handleChange} name="phone" value={profile.phone}/>
                    <br/>
                    Experience:<input type="number" onChange={handleChange} name="emp" value={profile.exp}/>
                    <br/>
                    Bio:<input type="text" onChange={handleChange} name="bio" value={profile.bio}/>
                    <br/>
                    Address:<input type="text" onChange={handleChange} name="loc" value={profile.add}/>
                    <br/>
                    Services:<input type="text" onChange={handleChange} name="ser" value={profile.ser}/>
                    <br/>
                    <div class="wall">
                    <p>Add Work Sample:</p>
                    <br/>
                    <Row>
                        <Col className="imgs" md={3}>
                        <input type="file" id="displayImg" accept="image/*" class="form-control" style={{display:"none",visibility:"none"}} onChange={imageHandler}/>
                         <label for="displayImg" class="floating-label"><img src={displayImage} alt="img" style={{width:"50%",height:"30%",cursor:"pointer"}}/>
                           <p className="headingImg" style={{fontSize:"13px"}}>{<FontAwesomeIcon icon={faPlus}/>}Upload a sample</p>
                         </label>
                        </Col>
                        <Col className="imgs" md={3}>
                        <input type="file" id="displayImg2" accept="image/*" class="form-control" style={{display:"none",visibility:"none"}} onChange={imageHandler2}/>
                         <label for="displayImg2" class="floating-label"><img src={displayImage2} alt="img" style={{width:"50%",height:"30%",cursor:"pointer"}}/>
                           <p className="headingImg" style={{fontSize:"13px"}}>{<FontAwesomeIcon icon={faPlus}/>}Upload a sample</p>
                         </label>
                        </Col>
                        <Col className="imgs" md={3}>
                        <input type="file" id="displayImg3" accept="image/*" class="form-control" style={{display:"none",visibility:"none"}} onChange={imageHandler3}/>
                         <label for="displayImg3" class="floating-label"><img src={displayImage3} alt="img" style={{width:"50%",height:"30%",cursor:"pointer"}}/>
                           <p className="headingImg" style={{fontSize:"13px"}}>{<FontAwesomeIcon icon={faPlus}/>}Upload a sample</p>
                         </label>
                        </Col>
                    </Row>
                    <br/> 
                    <br/>
                    </div>
               </form>)}
               {role==="user"&& (<form className="form1">
                    User Name:<input type="text" onChange={handleChange} name="username" value={profile.username}/>
                    <br/>
               </form>)}
               <div class="modal">
               <Row>
                 <Col md={10}>
                     <div style={{marginTop:"15%"}}>Your data has been succesfully updated!</div>
                 </Col>
                 <Col md={2}>
                 <FontAwesomeIcon icon={faTimesCircle} className="close" style={{cursor:"pointer"}} onClick={()=>document.querySelector(".modal").style.display="none"}/>
                 </Col>
               </Row>
                </div>
                <div>
                  {update&&(<button className="btn btn-success" onClick={updatePro}>Update</button>)}
                  <br/>
                  <br/>
                </div>  
        </div>
    );
    }

export default Edit;