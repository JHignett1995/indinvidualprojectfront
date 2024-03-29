import React, { Component } from 'react';
import axios from 'axios';
import './PlayerUpdate.css';

class PlayerUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updEmail: this.props.email,
                email: "",
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

    componentDidMount() {
        axios.get("http://35.189.110.9:8888/IndividualProject/api/player/getAPlayerEmail/" + this.state.updEmail).then(response => {

            console.log(response.data);
            this.setState({
                name: response.data[0].name,
                email: response.data[0].email,
                title: response.data[0].title,
                games: response.data[0].games,
                winCount: response.data[0].winCount,
                loseCount: response.data[0].loseCount,
                count7Ball: response.data[0].count7Ball,
                rivalID: response.data[0].rivalID,
                isAdmin: response.data[0].isAdmin
            });
        });
    }

    submit = (e) => {
        e.preventDefault();

        axios.post(`http://35.189.110.9:8888/IndividualProject/api/player/updatePlayer/` + this.state.updEmail, {
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
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <form id="updatePlayer">
                    As a Player you can only update your details listed:
                    <p>New Credentials</p>
                    <input id="name" type="text" placeholder={this.state.name} onChange={this.handleChange}></input>
                    <input id="password" placeholder="Password" type="password" onChange={this.handleChange}></input>
                    <p><button onClick={this.submit}>Update</button></p>
                </form>
            </div>
        );
  }
}

export default PlayerUpdate;
