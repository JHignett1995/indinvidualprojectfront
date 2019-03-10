import React, { Component } from 'react';
import './PlayerSearch.css';
import './DisplayTable.css';
import axios from 'axios';

class PlayerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            wins:0,
            rowNumber: 0,
            data: "",
            view: "normal"
        };
        this.createRow = this.createRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.getARequestName = this.getARequestName.bind(this);
        this.getARequestEmail = this.getARequestEmail.bind(this);
        this.getARequestWins = this.getARequestWins.bind(this);
        this.getARequestChamp = this.getARequestChamp.bind(this);
    }

    search = (event) => {
        event.preventDefault();
        this.setState({
            search: "",
            rowNumber: "",
            data: ""
        });
        
    }

    getARequestChamp = (e) => {
        e.preventDefault();
        axios.get("http://35.189.110.9:8888/IndividualProject/api/player/getAPlayerChamp/").then(response => {

            console.log(response.data);
            this.setState({
                rowNumber: response.data.length,
                data: response.data
            });
            this.addRow(response.data);
        });
    }

    getARequestEmail = (e) => {
        e.preventDefault();
        axios.get("http://35.189.110.9:8888/IndividualProject/api/player/getAPlayerEmail/" + this.state.email).then(response => {

            console.log(response.data);
            this.setState({
                rowNumber: response.data.length,
                data: response.data
            });
            this.addRow(response.data);
        });
    }
    getARequestName = (e) => {
        e.preventDefault();
        axios.get("http://35.189.110.9:8888/IndividualProject/api/player/getAPlayerName/" + this.state.name).then(response => {

            console.log(response.data);
            this.setState({
                rowNumber: response.data.length,
                data: response.data
            });
            this.addRow(response.data);
        });
    }
    getARequestWins = (e) => {
        e.preventDefault();
        axios.get("http://35.189.110.9:8888/IndividualProject/api/player/getAPlayerWins/" + this.state.wins).then(response => {

            console.log(response.data);
            this.setState({
                rowNumber: response.data.length,
                data: response.data
            });
            this.addRow(response.data);
        });
    }

    createRow(data) {
        return (
            <tr>
                <td>{data.email}</td>
                <td>{data.name}</td>
                <td>{data.winCount}</td>
                <td>{data.loseCount}</td>
                <td>{data.count7Ball}</td>
                <td>{data.rivalID}</td>
                <td>{this.getDeleteButton(data.email)}</td>
            </tr>
        );
    }

    deletePlayer = (user) => {
        axios.delete(`http://35.189.110.9:8888/IndividualProject/api/player/deletePlayer/` + user).then(response => {
            alert(response.data.message);
        });
    }

    getDeleteButton(user) {
        if (this.props.email.includes("@qa.com")) {
            return <button onClick={() => { this.deletePlayer(user) }}>Delete</button>;
        }
    }
    addRow(data) {
        var rows = [];
        for (let i = 0; i < this.state.rowNumber; i++) {
            rows.push(this.createRow(data[i]));
        }
        return <tbody>{rows}</tbody>;
    }

    handleChange = (event)=> {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
       
            return (
                <div className="search">
                    <div id="searchCriteria">
                        <form>
                            <input type="email"
                                id="email"
                                placeholder="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            ></input>
                            <button onClick={this.getARequestEmail}>
                                Search</button>
                        </form>
                        <form>
                            <input
                                type="text"
                                placeholder="name"
                                id="name"
                                value={this.state.name}
                                onChange={this.handleChange}></input>
                            <button onClick={this.getARequestName}>Search</button></form>
                        <form>
                            <input
                                type="number"
                                id="wins"
                                value={this.state.wins}
                                onChange={this.handleChange}
                                placeholder="wins"></input>
                            <button onClick={this.getARequestWins} >
                                Search</button>
                        </form>
                        <button onClick={this.getARequestChamp}>Get Champ</button>
                    </div>
                    <div id="searchContent">
                        <div className="DisplayTable">
                            <table id="table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Wins</th>
                                        <th>Losses</th>
                                        <th>7 ball count</th>
                                        <th>Rival</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {this.addRow(this.state.data)}
                            </table>
                        </div>
                    </div>
                </div>
            );
    }
}

export default PlayerSearch;
