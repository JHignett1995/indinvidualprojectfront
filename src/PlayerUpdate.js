import React, { Component } from 'react';
import axios from 'axios';
import './PlayerUpdate.css';

class PlayerUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updEmail:"",
            email:"",
            name: "",
            title: "",
            password: "",
            games: [],
            winCount: 0,
            loseCount: 0,
            count7Ball: 0,
            rivalID: "",
            isAdmin: false
            
        }
        this.handleChange = this.handleChange.bind(this)
    }

    submit = (e) => {
        e.preventDefault();

        axios.get("http://localhost:8080/IndividualProject/api/player/getAPlayerEmail/" + this.state.updEmail).then(response => {

            console.log(response.data);
            this.setState({
                title: response.data.title,
                games: response.data.games,
                winCount: response.data.winCount,
                loseCount: response.data.loseCount,
                count7Ball: response.data.count7Ball,
                rivalID: response.data.rivalID,
                isAdmin: response.data.isAdmin
            });
        });

        axios.delete(`http://localhost:8080/IndividualProject/api/player/deletePlayer/` + this.state.updEmail).then(response => {
            alert(response.data.message);
        });

            axios.post(`http://localhost:8080/IndividualProject/api/player/createPlayer`, {
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
            
        }).then(response => {
            alert("Player Updated");
        });
    }


    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <form id="updatePlayer">
                    Account To Update
                    <p><input id="updEmail" placeholder="Email" type="email" onChange={this.handleChange}></input></p>
                    <p>New Credentials</p>
                    <input id="email" placeholder="Email" type="email" onChange={this.handleChange}></input>
                    <input id="name" type="text" placeholder="Name" onChange={this.handleChange}></input>
                    <input id="password" placeholder="Password" type="password" onChange={this.handleChange}></input>
                    <p><button onClick={this.submit}>Create</button></p>
                </form>
            </div>
        );
  }
}

export default PlayerUpdate;
