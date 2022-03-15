import React,{useRef,useState} from "react";
import facebook from "../Assets/Icons/facebook.png"
import NavBar from "../Components/Navbar";
import { ref, push } from "firebase/database";
import {database} from "../fire";
import { updateProfile,signInWithPopup,FacebookAuthProvider,getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


const Form=(props)=>{
    const provider = new FacebookAuthProvider();
    const auth=getAuth();
    const [errorMessage, setErrorMessage]=useState("");
    const emailRef=useRef(null);
    const passwordRef=useRef(null);
    const conpasswordRef=useRef(null);
    const userRef=useRef(null);

    function SignUp(event){
        event.preventDefault();
        if(conpasswordRef.current.value===passwordRef.current.value){
            createUserWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value)
            .then((user) => {
                // Signed in 
                console.log(user);
                updateProfile(auth.currentUser,{
                    displayName:userRef.current.value,
                    email:emailRef.current.value
                })
                // ...
                push(ref(database,"/users"),{
                    username:userRef.current.value,
                    email:emailRef.current.value,
                    photoURL:"",
                    uid:user.user.uid
                }).then(()=>{
                window.open('/?key='+user.user.uid,"_self");
                }) 
            })
            .catch((error) => {
                const errorM = error.message;
                setErrorMessage(errorM);
                console.log(errorM);
            });
       }
       else{
        setErrorMessage("Passwords do not match");
       }
    }
    function Login(event){
        event.preventDefault();
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((user) => {
            console.log(user+" loggedin");
            window.open('/?key='+user.user.uid,"_self");  
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorM = error.message;
            console.log(errorCode+errorM);
            setErrorMessage(errorM);
        });  
    }
    function fbAuth(event){
        event.preventDefault();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            push(ref(database,"/users"),{
                username:user.displayName,
                email:user.email,
                photoURL:user.photoURL,
                uid:result.user.uid
            }).then(()=>{
                window.open('/?key='+user.uid,"_self"); 
            })
            
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.log(errorMessage)

            // ...
        });
     }
    return(
        
        <div>
       
         <div className="formCard">
          <form className="form1"> 
            <h3 className="Ftitle">{props.isRegistered ? "Login" : "Sign Up"}</h3>
            {!props.isRegistered && (
            <input type="text" ref={userRef} placeholder="Username" required/>
            )}
            <input type="email" ref={emailRef} placeholder="Email" name="email" required/>
           <input type="password" ref={passwordRef} placeholder="Password" name="password" required/>
           {!props.isRegistered && (
           <input type="password" ref={conpasswordRef} placeholder="Confirm Password" required/>
           )}
           {!props.isRegistered && (
            <button type="submit" className="formbutton" onClick={SignUp}>Sign Up</button>
           )}
           {props.isRegistered && (
            <button type="submit" className="formbutton" onClick={Login}>Login</button>
           )}
           <br/>
           <p/>
           <p style={{fontSize:"15px"}}>
               Or Login with <img alt="Facebook" onClick={fbAuth} src={facebook} style={{width:"25px",cursor:"pointer"}}></img>
           </p>
           </form>
           {props.isRegistered && (<p style={{fontSize:"15px"}}>
               Don't Have an account? <a href="/signUp">Sign Up</a>
           </p>)}

           {errorMessage &&(
               <p style={{color:"red"}}>{errorMessage}</p>
           ) }
        </div>
        </div>
      
    );
}

export default Form;