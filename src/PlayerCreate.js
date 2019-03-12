import React, { Component } from 'react';
import axios from 'axios';
import './PlayerCreate.css';

class PlayerCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
                email:"",
                name:"",
                title:"",
                password: "",
                games: [],
                winCount:0,
                loseCount:0,
                count7Ball:0,
                rivalID:"",
                isAdmin:false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    submit = (e) => {
        e.preventDefault();
        if (this.state.isAdmin === "on" || this.state.isAdmin === "off") {
            if (this.state.isAdmin ==="on") {
                this.setState({
                    isAdmin: true
                })
            } else {
                this.setState({
                    isAdmin: false
                })
            }
        }
        console.log(this.state);
        axios.post(`http://35.189.110.9:8888/IndividualProject/api/player/createPlayer`, {
            "email": this.state.email,
                "name": this.state.name,
                    "title": this.state.title,
                        "password": this.state.password,
                            "games": this.state.games,
                                "winCount": this.state.winCount,
                                    "loseCount": this.state.loseCount,
                                        "count7Ball": this.state.count7Ball,
                                            "rivalID": this.state.rivalID,
                                                "isAdmin": this.state.isAdmin
        }).then(response => {
            alert(response.data.message);
        });
    }


    handleChange = (event) => {
        if ([event.target.id] != "isAdmin") {
            this.setState({
                [event.target.id]: event.target.value
            });
        } else {
            this.setState({ [event.target.id]: event.target.checked})
        }
        console.log(this.state);

    }

    render() {
        return (
            <div>
                <form id="createPlayer">
                    <input id="name" type="text" placeholder="Name" onChange={this.handleChange}></input>
                    <input id="email" placeholder="Email" type="email" onChange={this.handleChange}></input>
                    <input id="password" placeholder="Password" type="password" onChange={this.handleChange}></input>
                    <p><label><input size="large" id="isAdmin" type="checkbox" name="Is Admin?" onChange={this.handleChange}></input>Admin Account</label></p>
                    <p><button onClick={this.submit}>Create</button></p>
                </form>
            </div>
        );
  }
}

export default PlayerCreate;
