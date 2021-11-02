import React from "react";
import NavBar from "../Components/Navbar";

function SignUpEmp(){
    return(
        <div>
          <NavBar/>
            <form fluid className="cont">
            <br/>
            <br/>
             <p className="Ftitle">Employee Profile</p>
                    <div class="floating-label-group">
                    <input type="text" class="form-control" required />
                        <label class="floating-label">Full name</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="address" class="form-control" required />
                        <label class="floating-label">Company's name</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="number" class="form-control" autofocus required />
                        <label class="floating-label">Years of experience</label>
                    </div>
                    <div class="floating-label-group">
                    <textarea class="form-control" required rows="2"/>
                        <label class="floating-label">Bio</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="url" class="form-control" required />
                        <label class="floating-label">Link of Company page</label>
                    </div>
                    <div class="floating-label-group">
                    <textarea class="form-control" required rows="2"/>
                        <label class="floating-label">Area of expertise</label>
                    </div>
                    <br/>
                    <button type="submit" className="formbutton2">Create your profile</button>
            <br/>
            <br/>
              </form>
         </div>
           )
        }
        
export default SignUpEmp;
         
  