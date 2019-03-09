import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import SignInForm from './SignInForm';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            email: "fail",
            isAdmin: false
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogin = (email, password) => {
        console.log(email);
        var self = this;
        axios.post(`http://localhost:8080/IndividualProject/api/player/login/${email}/${password}`
        ).then(function (response) {
            if (response.data.message === "Login Successful") {
                self.setState({ loggedIn: true, email:email});
            } else {
                alert(response.data.message);
            }
            }).catch(function (error) {
                console.log(error);
            alert("problem");
        });
        
    }
    handleLogout = () => {
        this.setState({ loggedIn: false, email: "" });
    }

    render() {
        if (this.state.loggedIn === false) {
            return (
                <div className="App">
                    <h1>Pool Organizer</h1>
                    <SignInForm email={this.state.email} handleLogin={this.handleLogin}/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <div id="headLine">
                        <h1>Pool Organizer</h1>
                        <div id="logoutBut">
                            <button id="logOut" onClick={this.handleLogout}>Logout</button>
                        </div>
                    </div>
                    <Navbar email={this.state.email}/>
                </div>
        )}
    
  }
}

export default App;
