// import { useState } from 'react';
import profile from './profile.png';
import './Header.css';

// This contains the navbar links to navigate through the website
const Header = ({routeChange, isLoggedIn, setJobs}) => {
  const dynamicLog = () =>{
    if(isLoggedIn === true){
      return (<img onClick={() => routeChange("profile")} src={profile} alt="profile" style={{maxWidth: "20px", marginLeft: "10px"}}/>);
    }else{
      return (<button onClick={() => routeChange("register")}>Register</button>);
    }
  }
  const dynamicItem = () =>{
    if(isLoggedIn === false){
      return (<p onClick={() => routeChange("login")}>login</p>);
    }else{
      return (<p onClick={() => routeChange("login")}>logout</p>);
    }
  }
  const dynamicLink = (place) =>{
    if(place === 1){
      if(isLoggedIn === true){
        return(
          <p onClick={() => { 
            routeChange("jobs")
            setJobs()
          }}>Jobs</p>
        )
      }
    }else{
      if(isLoggedIn === true){
        return(
          <p onClick={() => routeChange("addJobs")}>Post Jobs</p>
        )
    }
  }
}

  return (
    <div className='header'>
        <nav className='headerLinks' style={{padding:"10px 20px"}}>
          <h5 onClick={() => routeChange("home")}>Hireme</h5>
          <p onClick={() => routeChange("home")} >Home</p>
          {dynamicLink(1)}
          <select name="jobCategory">
          <option value="NA">Categories</option>
            <option value="Design & Creative">Design & Creative</option>
            <option value="Development & IT">Development & IT</option>
            <option value="Sales & Marketing">Sales & Marketing</option>
            <option value="Writing & Translation">Writing & Translation</option>
          </select>
          <div className='headerRight'>
          {dynamicLink(2)}
            {dynamicItem()}
            {dynamicLog()}
          </div>
        </nav>
    </div>
  );
}
export default Header;
