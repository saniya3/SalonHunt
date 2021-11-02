import React,{useState,useRef} from "react";
import NavBar from "../Components/Navbar";
import { ref, push} from "firebase/database";
import { ref as Ref ,uploadBytes,getDownloadURL} from "@firebase/storage";
import {database,storage} from "../fire";
import { updateProfile,getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import avt1 from "../Assets/Images/avt1.png"; 

function SignUpBus(){
    const [pic,setPic]=useState();
    const [check,setCheck]=useState({
        nails:false,
        hair:false,
        makeup:false,
        tattoo:false,
        beauty:false,
        lashes:false
    })
    const[displayImage,setImg]=useState(avt1);
    function imageHandler(event) {
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
    function handleCheckN(){
        setCheck(prevValue=>{
            return{
               nails:!prevValue.nails,
               hair:prevValue.hair,
               makeup:prevValue.makeup,
               tattoo:prevValue.tattoo,
               beauty:prevValue.beauty,
               lashes:prevValue.lashes
            }
        })
    }
    function handleCheckH(){
        setCheck(prevValue=>{
            return{
               nails:prevValue.nails,
               hair:!prevValue.hair,
               makeup:prevValue.makeup,
               tattoo:prevValue.tattoo,
               beauty:prevValue.beauty,
               lashes:prevValue.lashes
            }
        })
    }
    function handleCheckM(){
        setCheck(prevValue=>{
            return{
               nails:prevValue.nails,
               hair:prevValue.hair,
               makeup:!prevValue.makeup,
               tattoo:prevValue.tattoo,
               beauty:prevValue.beauty,
               lashes:prevValue.lashes
            }
        })
    }
    function handleCheckT(){
        setCheck(prevValue=>{
            return{
               nails:!prevValue.nails,
               hair:prevValue.hair,
               makeup:prevValue.makeup,
               tattoo:!prevValue.tattoo,
               beauty:prevValue.beauty,
               lashes:prevValue.lashes
            }
        })
    }
    function handleCheckB(event){
        setCheck(prevValue=>{
            return{
               nails:prevValue.nails,
               hair:prevValue.hair,
               makeup:prevValue.makeup,
               tattoo:prevValue.tattoo,
               beauty:!prevValue.beauty,
               lashes:prevValue.lashes
            }
        })
    }
    function handleCheckL(event){
        setCheck(prevValue=>{
            return{
               nails:!prevValue.nails,
               hair:prevValue.hair,
               makeup:prevValue.makeup,
               tattoo:prevValue.tattoo,
               beauty:prevValue.beauty,
               lashes:!prevValue.lashes
            }
        })
    }
    const auth=getAuth();
    const [errorMessage, setErrorMessage]=useState("");
    const emailRef=useRef(null);
    const passwordRef=useRef(null);
    const userRef=useRef(null);
    const contactRef=useRef(null);
    const locRef=useRef(null);
    const empRef=useRef(null);

    function SignUp(event){
        event.preventDefault();
            createUserWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value)
            .then((user) => {
            
                // Signed in 
                console.log(user);
                updateProfile(auth.currentUser,{
                    photoURL:displayImage,
                    displayName:userRef.current.value,
                    email:emailRef.current.value,
                })
                
                const displayImg=document.getElementById("displayImg");
                const file = displayImg.files[0];
                var storageRef = Ref(storage,"/ProfilePictures/"+user.user.uid+"/");
                const metadata = {
                    contentType: 'image/jpg'
                };
                uploadBytes(storageRef, file,metadata).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                }).then(()=>{
                    getDownloadURL(Ref(storage, "/ProfilePictures/"+user.user.uid)).then((url) => {
                        setPic(url);
                        updateProfile(auth.currentUser,{
                            photoURL:pic
                        })
                    })

                })
                // ...
                
                push(ref(database,"/business"),{
                    company:userRef.current.value,
                    email:emailRef.current.value,
                    contact:contactRef.current.value,
                    location:locRef.current.value,
                    employees:empRef.current.value,
                    services:{check},
                    uid:user.user.uid,
                    photoURL:user.user.photoURL
                    
                }).then(()=>{
                    console.log(user.user.photoURL);
                    // window.open('/',"_self"); 
                })
                
            })      
            .catch((error) => {
                const errorM = error.message;
                setErrorMessage(errorM);
                console.log(errorM);
            });   
       }
        
    return(
        <div>
          <NavBar/>
            <form fluid className="cont">
            <br/>
            <br/>
             <p className="Ftitle">Business profile</p>
                   <br/>
                   <div style={{border:"1px solid beige",width:"25%",height:"10%",marginLeft:"auto",marginRight:"auto"}}>
                    <input type="file" id="displayImg" accept="image/*" class="form-control" style={{display:"none",visibility:"none"}} onChange={imageHandler}/>
                    <label for="displayImg" class="floating-label"><img src={displayImage} alt="img" style={{width:"100%",height:"50%",cursor:"pointer"}}/>
                      <p className="headingImg" style={{fontSize:"13px"}}>Choose a display picture</p>
                    </label>
                   </div>
                   
                    <div class="floating-label-group">
                    <input type="text" class="form-control" ref={userRef} required />
                        <label class="floating-label">Company's name</label>
                    </div>
                    <div class="floating-label-group">
                    <input  type="tel" class="form-control" ref={contactRef} required/>
                        <label class="floating-label">Contact Number</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="email" class="form-control" ref={emailRef} required />
                        <label class="floating-label">Email</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="password" class="form-control" ref={passwordRef} required />
                        <label class="floating-label">Set a Password</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="address" class="form-control" ref={locRef} required />
                        <label class="floating-label">Location</label>
                    </div>
                    <br/>
                    <div className="checkbox">
                    <p>Type of Services:</p> 
                    Nails<input type="checkbox" name="nails" className="tick" onChange={handleCheckN}/>
                    Hair<input type="checkbox"  name="hair" className="tick" onChange={handleCheckH}/>
                    Makeup<input type="checkbox"  name="makeup" className="tick" onChange={handleCheckM}/>
                    Lashes<input type="checkbox"  name="lashes" className="tick" onChange={handleCheckL}/>
                    Beauty<input type="checkbox"  name="beauty" className="tick" onChange={handleCheckB}/>
                    Tattoo<input type="checkbox"  name="tattoo" className="tick" onChange={handleCheckT}/>
                    </div>
                    <div class="floating-label-group">
                    <input type="number" class="form-control" ref={empRef} required />
                        <label class="floating-label">Number of employees</label>
                    </div>
                    <br/>
                    <button type="submit" className="formbutton2" onClick={SignUp}>Create your profile</button>
                  <br/>
                 <br/>
                </form>
                {errorMessage &&(
                <p style={{color:"red"}}>{errorMessage}</p>
                )}
         </div>
        )
} 
export default SignUpBus;
         
  