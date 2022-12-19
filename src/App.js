// All the dependencies of the Application are imported which includes componenets and other react libraries
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header/Header';
import Intro from './Components/Intro/Intro';
import JobCategory from './Components/JobCategory/JobCategory';
import DreamJob from './Components/DreamJob/DreamJob';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AddJobs from './Components/AddJobs/AddJobs';
import Profile from './Components/Profile/Profile';
import Jobs from './Components/Jobs/Jobs';


// This is the main container which houses the body of the website
class App extends Component {
  constructor(){
    super()
    this.state={
      route: "home",
      token: "",
      isLoggedIn: false,
      userName: "",
      jobs: [],

    }
  }

  setUserName = (nameReceived) =>{
    this.setState({userName: nameReceived});
    
  }

  // setPofileJobs = () =>{
  //   // fetch("http://127.0.0.1:5000/profile", {
  //   //   method: 'get',
  //   //   headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Bearer ${this.state.token}`},
  //   //   })
  //   //   .then(reponse => reponse.json())
  //   //   .then(data =>{
  //   //       this.setState({jobsApplied: data.jobsApplied});
  //   //       this.setState({jobsPosted: data.jobsPosted});          
  //   // }) 
  // }

  setJobs = () =>{
    fetch("http://127.0.0.1:5000/jobs", {
      method: 'get',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Bearer ${this.state.token}`}
  })
    .then(reponse => reponse.json())
    .then(data =>{
      
      if(data.data === undefined){
          this.setState({jobs: []})
          console.log(1);
      }else{
        this.setState({jobs: data.data})

      }
        console.log(data);

  })
  }

  setAccessToken = (accessToken) =>{
    this.setState({token: accessToken});
    this.setState({isLoggedIn: true});
  }
  routeChange = (routeReceived) =>{
    if(routeReceived === "login"|| routeReceived === "register"){
      this.setState({isLoggedIn: false});
    }
    this.setState({route: routeReceived});
  }

  //The render function is called to display all imported components using the return method
  //Routing is done through an if-else if-else statement which checks the state
  render(){
  let route = this.state.route;
  if(route === "home"){
    return(
      <div className='App'>
        <Header routeChange={this.routeChange}  setJobs={this.setJobs} isLoggedIn={this.state.isLoggedIn}/>
        <Intro routeChange={this.routeChange}/>
        <JobCategory />
        <DreamJob />
        <Footer />
      </div>
    );

  }else if(route === "login"){
    return(
      <div>
      <Header routeChange={this.routeChange} setJobs={this.setJobs} currentRoute={this.state.route} isLoggedIn={this.state.isLoggedIn}/>
      <h1 style={{textAlign: "center", color:"#54B435"}}>Login</h1>
      <Login  routeChange={this.routeChange} setUserName={this.setUserName} setAccessToken={this.setAccessToken}/>
    </div>
    )
  }else if(route === "register"){
    return(
      <div>
      <Header routeChange={this.routeChange} setJobs={this.setJobs} currentRoute={this.state.route} isLoggedIn={this.state.isLoggedIn}/>
      <h1 style={{textAlign: "center"}}>Create Account</h1>
      <Register setAccessToken={this.setAccessToken} routeChange={this.routeChange} setUserName={this.setUserName}  />
      </div>
    )
  }else if(route === "profile"){
    return(
      <div>
        <Header routeChange={this.routeChange} setJobs={this.setJobs} isLoggedIn={this.state.isLoggedIn} />
        <Profile routeChange={this.routeChange} userName={this.state.userName} token={this.state.token} />
      </div>
    )
  }else if(route === "addJobs"){
    return(
      <div>
        <Header routeChange={this.routeChange} setJobs={this.setJobs}  currentRoute={this.state.route} isLoggedIn={this.state.isLoggedIn}/>
        <AddJobs token={this.state.token} routeChange={this.routeChange} />
      </div>
    )
  }else if(route === "jobs"){
    return(
      <div>
          <Header routeChange={this.routeChange} setJobs={this.setJobs} currentRoute={this.state.route} isLoggedIn={this.state.isLoggedIn} />
          <Jobs jobs={this.state.jobs} token={this.state.token} setJobs={this.setJobs} />

      </div>
    )
  }
  }
}

export default App;
