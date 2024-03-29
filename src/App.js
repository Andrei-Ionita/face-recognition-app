import React from 'react';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import SignIn from "./components/SignIn/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/rank/Rank";
import Particles from "react-particles-js";
import './App.css';

const particlesOption = {particles: {
  number: {
    value: 100,
    density: {
      enable: true,
      value_area: 800
    }
  }
}};

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    password: "",
    entries: 0,
    joined: ""
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  };

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(data);
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch("http://localhost:3000/imageurl",
    {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
      input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch("http://localhost:3000/image", {
          method: "put",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response)) 
    })
  }



  onRouteChange = (route) => {
    if(route === "signout") {
      this.setState(initialState);
    } else if(route === "home"){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption} />
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        {route === "home" ? 
          <div>
            <Logo /> 
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
            <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onPictureSubmit} />
            <FaceRecognition box = {box} imageURL = {imageURL} />
          </div> 
        :(
          route === "signin" 
          ? <SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/> 
          : <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
        )
        }
      </div>
    );
  }
}

export default App;
