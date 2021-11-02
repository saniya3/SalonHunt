import React from "react";
import NavBar from "../Components/Navbar";
import styles from "../Styles/about.css"
import bg from "../Assets/Images/bg.jfif"

function About(){
    return(
        <div>
          <NavBar/>
          <div className="about">
              <section className="colored">
              <h1 className="Ftitle">Our Story</h1>
              <hr/>
              Salon hunt is a online platform wherein a plethora of commercial salons and independent beauticians are listed for you to choose from!
              Salons are listed with the affiliated employees and their portfolio of sorts is published for the consumer front to get familiar with their experience and way of working. 
              In the case of independant beauticians, our main aim is to increase interaction between the consumer and service provider so that you get a better sense of the employee background, with the help of detailed profiles of individual employees and their contact information. 
              We have an inbuilt slot booking mechanism for salons and detailed contact information of independent beauticians. 
              Your one stop shop for all things beauty!
              <br/>
              <img alt="" src={bg} className="salonImg"/>
              </section>
          </div>
        </div>
    );
}


export default About