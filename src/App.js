import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"
import Home from "./Core/Home";
import Individual from "./Core/Individual";
import Salon from "./Core/Salon"
import login from "./Core/LogIn";
import SignUp from "./Core/SignUp";
import SignUpInd from "./Core/SignUpIndividual";
import SignUpEmp from "./Core/SignUpEmployee";
import SignUpBus from "./Core/SignUpBusiness";
import About from "./Core/About"
import Profile from "./Components/profile"
import SalonProfile from "./Components/salonProfile";
import Edit from "./Core/edit";
import Ind from "./Components/Ind";
import Staff from "./Components/Staff";
import IndProfile from "./Components/IndProfile";
import EmpProfile from "./Components/EmpProfile";



const Routes = () => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/individual' exact component={Individual} />
          <Route path='/salon' exact component={Salon} />
          <Route path='/About' exact component={About} />
          <Route path='/login' exact component={login} />
          <Route path='/SignUp' exact component={SignUp} />
          <Route path='/SignUpIndividual' exact component={SignUpInd} />
          <Route path='/SignUpEmployee' exact component={SignUpEmp} />
          <Route path='/SignUpBusiness' exact component={SignUpBus} />
          <Route path='/Profile' exact component={Profile} />
          <Route path='/SalonProfile' exact component={SalonProfile} />
          <Route path='/edit' component={Edit} />
          <Route path='/Ind' component={Ind} />
          <Route path='/IndProfile' component={IndProfile} />
          <Route path='/Staff' component={Staff}/>
          <Route path='/EmpProfile' component={EmpProfile} />
          {/* <Route path='/events' exact component={Event} />
          <Route path='/contact' exact component={Contact} />
          <Route path='/edit' component={Edit} /> */} 
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
