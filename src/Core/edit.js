import React,{useState} from "react";
import NavBar from "../Components/Navbar";
import { getAuth, updateProfile} from "firebase/auth";
import avt from "../Assets/Images/avt.jpg";

const Edit=(props)=>{
    let username,photoURL;
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
     });
    if (isLogged) {
        
            console.log("Sign-in provider: " + user.providerId);
            console.log("  Provider-specific UID: " + user.uid);
            username=user.displayName;
            console.log("  Name: " + user.displayName);
            console.log("  Email: " + user.email);
            console.log(user.photoURL);
            photoURL=user.photoURL
            // if(user.providerId===FacebookAuthProvider){
            //   setDp(user.photoURL);
            // }
            // else{
            //     const storage = getStorage();
            //     getDownloadURL(ref(storage, "/ProfilePictures/"+user.uid))
            //     .then((url) => {
            //         user.photoURL=url;
            //         setDp(user.photoURL)
            //     })
            // }      
    }
    else{
        console.log("yo");
    }
    const [profile,setProfile]=useState({
        username:"",
        photoURL:""
    })
    function handleChange(event){
        setUpdate(true);
        const { name, value } = event.target;
        setProfile(prevValue => {
            if (name === "username") {
              return {
                username: value,
                photoURL: prevValue.photoURL
              };
            } else if (name === "photo") {
              return {
                username: prevValue.username,
                photoURL: value
              };
            }
        })
     }
     function updatePro(event){
        event.preventDefault();
        updateProfile(auth.currentUser, {
                displayName: profile.username,
                photoURL: profile.photoURL
            }).then(() => {
              console.log(" updated");
            }).catch((error) => {
            // An error occurred
            // ...
            });
    }
  //   function uploadDp(event) {
  //     const auth=getAuth();
  //     var file = event.target.files[0];
  //     var user = auth.currentUser;
  //     const storage = getStorage();
  //     const storageRef = ref(storage,user.uid + '/profilePicture/' + file.name);
  
  //     // 'file' comes from the Blob or File API
  //     uploadBytes(storageRef, file).then((snapshot) => {
  //         console.log('Uploaded a blob or file!');
  //     });
  //  }
   

    return(
        <div>
          <NavBar/>
          <br/>
          <h1 className="Ftitle">Edit your Profile</h1>
          <hr style={{width:"80%",marginInlineStart:"10%"}}/>
             
              <img alt="dp" src={photoURL} style={{width:"150px"}}/>
                <form className="form1">
                    User Name:<input type="text" onChange={handleChange} name="username" placeholder={username} value={profile.username}/>
                    
                    <br/>
                    {update&&(<button className="btn btn-success" onClick={updatePro}>Update</button>)}
               </form>
           
         
        </div>
    );
    }

export default Edit;