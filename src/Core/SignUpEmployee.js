import React,{useState,useRef} from "react";
import NavBar from "../Components/Navbar";
import avt1 from "../Assets/Images/avt1.png"; 
import { ref, push,onValue} from "firebase/database";
import { ref as Ref ,uploadBytes,getDownloadURL} from "@firebase/storage";
import {database as db,storage} from "../fire";
import { updateProfile,getAuth, createUserWithEmailAndPassword} from "firebase/auth";

function SignUpEmp(){
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
    const auth=getAuth();
    const [errorMessage, setErrorMessage]=useState("");
    const emailRef=useRef(null);
    const passwordRef=useRef(null);
    const userRef=useRef(null);
    const serRef=useRef(null);
    const bioRef=useRef(null);
    const linkRef=useRef(null);
    const expRef=useRef(null);

    function SignUp(event){
        event.preventDefault();
        createUserWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value)
            .then((user) => {
                // Signed in 
                updateProfile(auth.currentUser,{
                    photoURL:displayImage,
                    displayName:userRef.current.value,
                    email:emailRef.current.value
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
                    const promises=getDownloadURL(Ref(storage, "/ProfilePictures/"+user.user.uid)).then((URL) => {  
                        updateProfile(auth.currentUser,{
                            photoURL:URL
                        })
                        console.log(auth.currentUser.photoURL)
                        return URL;
                    })
                    Promise.resolve(promises).then((URL) => {
                        push(ref(db,"/employee"),{
                            username:userRef.current.value,
                            email:emailRef.current.value,
                            bio:bioRef.current.value,
                            experience:expRef.current.value,
                            expertise:serRef.current.value,
                            link:linkRef.current.value,
                            uid:user.user.uid,
                            photoURL:URL
                        }).then(()=>{
                            let id;
                            let paramString = (linkRef.current.value).split('=')[1];
                            paramString=paramString.split("&")[0];
                            let queryString = new URLSearchParams(paramString);
                            for (let pair of queryString.entries()) {
                                id=pair[0]
                            }
                            onValue(ref(db,'business/'),(snapshot) => {
                                snapshot.forEach(function(value){
                                    if(value.val().uid===id){
                                       console.log("yes")
                                       push(ref(db,"/business/"+value.key+"/employee"),{
                                            username:userRef.current.value,
                                            email:emailRef.current.value,
                                            bio:bioRef.current.value,
                                            experience:expRef.current.value,
                                            expertise:serRef.current.value,
                                            link:linkRef.current.value,
                                            uid:user.user.uid,
                                            photoURL:URL
                                       }).then(()=>{
                                        console.log(auth.currentUser.photoURL)
                                        window.open('/?key='+user.user.uid,"_self");
                                    }) 
                                    }
                                })
                            }, {
                                onlyOnce: true
                              })
                        })
                    })
                })
            }).catch((error) => {
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
             <p className="Ftitle">Employee Profile</p>
             <br/>
                   <div style={{border:"1px solid beige",width:"25%",height:"10%",marginLeft:"auto",marginRight:"auto"}}>
                    <input type="file" id="displayImg" accept="image/*" class="form-control" style={{display:"none",visibility:"none"}} onChange={imageHandler}/>
                    <label for="displayImg" class="floating-label"><img src={displayImage} alt="img" style={{width:"100%",height:"50%",cursor:"pointer"}}/>
                      <p className="headingImg" style={{fontSize:"13px"}}>Choose a display picture</p>
                    </label>
                   </div>
                    <div class="floating-label-group">
                    <input type="text" class="form-control" required ref={userRef}/>
                        <label class="floating-label">Full name</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="number" class="form-control" required ref={expRef}/>
                        <label class="floating-label">Years of experience</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="text" class="form-control" required ref={bioRef}/>
                        <label class="floating-label">Bio</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="url" class="form-control" required ref={linkRef}/>
                        <label class="floating-label">Link of Company page</label>
                    </div>
                    <div class="floating-label-group">
                    <textarea class="form-control" required rows="2" ref={serRef}/>
                        <label class="floating-label">Area of expertise</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="email" class="form-control" ref={emailRef} required />
                        <label class="floating-label">Email</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="password" class="form-control" ref={passwordRef} required />
                        <label class="floating-label">Set a Password</label>
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
export default SignUpEmp;
         
  