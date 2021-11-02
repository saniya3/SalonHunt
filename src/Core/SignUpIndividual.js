import React from "react";
import NavBar from "../Components/Navbar";

function SignUpInd(){
    return(
        <div>
          <NavBar/>
            <form fluid className="cont">
            <br/>
            <br/>
             <p className="Ftitle">Individual Business profile</p>
                    <div class="floating-label-group">
                    <input type="text" class="form-control" required />
                        <label class="floating-label">Full name</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="tel" class="form-control" required />
                        <label class="floating-label">Contact Number</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="email" class="form-control" required />
                        <label class="floating-label">Email</label>
                    </div>
                    <div class="floating-label-group">
                    <textarea class="form-control" required rows="2"/>
                        <label class="floating-label">Bio</label>
                    </div>
                    <div class="floating-label-group">
                    <textarea type="address" class="form-control" required rows="2"/>
                        <label class="floating-label">Work Address</label>
                    </div>
                    <br/>
                    <div className="checkbox">
                    <p>Type of Services:</p> 
                    Nails<input type="checkbox" className="tick"/>
                    Hair<input type="checkbox" className="tick"/>
                    Makeup<input type="checkbox" className="tick"/>
                    Lashes<input type="checkbox" className="tick"/>
                    Beauty<input type="checkbox" className="tick"/>
                    Tattoo<input type="checkbox" className="tick"/>
                    </div>
                    <div class="floating-label-group">
                    <input type="number" class="form-control" autofocus required />
                        <label class="floating-label">Years of experience</label>
                    </div>
                    <div class="floating-label-group">
                    <input type="number" class="form-control" required />
                        <label class="floating-label">Number of employees</label>
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
        
export default SignUpInd;
         
  