import React,{useState,useRef} from "react";
import NavBar from "../Components/Navbar";
import { ref, push} from "firebase/database";
import { ref as Ref ,uploadBytes,getDownloadURL} from "@firebase/storage";
import {database,storage} from "../fire";
import { updateProfile,getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import avt1 from "../Assets/Images/avt1.png"; 

function SignUpInd(){
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
               nails:prevValue.nails,
               hair:prevValue.hair,
               makeup:prevValue.makeup,
               tattoo:!prevValue.tattoo,
               beauty:prevValue.beauty,
               lashes:prevValue.lashes
            }
        })
    }
    function handleCheckB(){
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
    function handleCheckL(){
        setCheck(prevValue=>{
            return{
               nails:prevValue.nails,
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
    const addRef=useRef(null);
    const bioRef=useRef(null);
    const expRef=useRef(null);

    let services="";
    function SignUp(event){
        event.preventDefault();
        createUserWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value)
            .then((user) => {
                // Signed in 
                updateProfile(auth.currentUser,{
                    photoURL:displayImage,
                    displayName:userRef.current.value,
                    email:emailRef.current.value,
                })
                for(let k in check){
                    if(check[k]===true){
                        services+=(k.charAt(0).toUpperCase()+k.substr(1).toLowerCase())+" "
                    }   
                }
                const displayImg=document.getElementById("displayImg");
                const file = displayImg.files[0];
                var storageRef = Ref(storage,"/ProfilePictures/"+user.user.uid+"/");
                const metadata = {
                    contentType: 'image/jpg'
                };
                uploadBytes(storageRef, file,metadata).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                }).then(()=>{
                    const promises=getDownloadURL(Ref(storage, "/ProfilePictures/"+user.user.uid)).then((URL) => {  
                        updateProfile(auth.currentUser,{
                            photoURL:URL
                        })
                        console.log(auth.currentUser.photoURL)
                        return URL;
                    })
                    Promise.resolve(promises).then((URL) => {
                        push(ref(database,"/individual"),{
                            name:userRef.current.value,
                            email:emailRef.current.value,
                            contact:contactRef.current.value,
                            address:addRef.current.value,
                            bio:bioRef.current.value,
                            services:services,
                            experience:expRef.current.value,
                            uid:user.user.uid,
                            photoURL:URL
                        }).then(()=>{
                            console.log(auth.currentUser.photoURL)
                            window.open('/?key='+user.user.uid,"_self"); 
                        })
                    })
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
             <p className="Ftitle">Individual Business profile</p>
             <br/>
                   <div style={{border:"1px solid beige",width:"25%",height:"10%",marginLeft:"auto",marginRight:"auto"}}>
                    <input type="file" id="displayImg" accept="image/*" class="form-control" style={{display:"none",visibility:"none"}} onChange={imageHandler}/>
                    <label for="displayImg" class="floating-label"><img src={displayImage} alt="img" style={{width:"100%",height:"50%",cursor:"pointer"}}/>
                      <p className="headingImg" style={{fontSize:"13px"}}>Choose a display picture</p>
                    </label>
                   </div>
                    <div class="floating-label-group">
                    <input type="text" class="form-control" ref={userRef} required />
                        <label class="floating-label">Full name</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="tel" class="form-control" ref={contactRef} required />
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
                    <input type="text" class="form-control" ref={bioRef} required/>
                        <label class="floating-label">Bio</label>
                    </div>
                    <div class="floating-label-group">
                    <textarea type="address" class="form-control" ref={addRef} required rows="2"/>
                        <label class="floating-label">Work Address</label>
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
                    <input type="number" class="form-control" ref={expRef} required />
                        <label class="floating-label">Years of experience</label>
                    </div>
                    {/* <div class="floating-label-group">
                    <input type="number" class="form-control" required />
                        <label class="floating-label">Number of employees</label>
                    </div> */}
                    {/* <div class="floating-label-group">
                    <textarea class="form-control" required rows="2"/>
                        <label class="floating-label">Area of expertise</label>
                    </div> */}
                    <br/>
                    <button type="submit" className="formbutton2" onClick={SignUp}>Create your profile</button>
                <br/>
                <br/>
              </form>
              {errorMessage &&(
                <p style={{color:"red"}}>{errorMessage}</p>
              )}
        </div>
        )}
        
export default SignUpInd;
         
  