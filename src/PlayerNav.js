import React, { Component } from 'react';
import PlayerSearch from './PlayerSearch';
import PlayerCreate from './PlayerCreate';
import PlayerUpdate from './PlayerUpdate';
import './DisplayTable.css';
import axios from 'axios';

class PlayerNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: "",
            rowNumber: 0,
            data: "",
            email: this.props.email,
            admin: this.props.admin
        }
        this.handleChange = this.handleChange.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    getAllRequest = (e) => {
        axios.get("http://35.189.110.9:8888/IndividualProject/api/player/getAllPlayers/").then(response => {

            console.log(response.data);
            this.setState({
                rowNumber: response.data.length,
                data: response.data
            });
            this.addRow(response.data);
        });
        this.render();
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
        this.render();
    }
    
    getDeleteButton(user) {
        if (this.state.admin) {
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

    handleChange = (event) => {
        this.setState({
            option: event.target.id
        });
        if (this.state.option === "findAll") {
            this.getAllRequest();
        }
    }

    getState() {
        return this.state.option;
    }

    render() {
        switch (this.state.option) {
            case "create":
                    return (
                        <div className="playerNav">
                            <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Player</button>
                            <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Player</button>
                            <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Player</button>
                            <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Players</button>
                            <div id="pageContent">
                                <PlayerCreate />
                            </div>
                        </div>
                    );
                break;
            case "update":
                if (this.state.admin) {
                    return (
                        <div className="playerNav">
                            <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Player</button>
                            <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Player</button>
                            <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Player</button>
                            <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Players</button>
                            <div id="pageContent">
                                <PlayerUpdate email={this.state.email}/>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="playerNav">
                            <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Player</button>
                            <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Player</button>
                            <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Players</button>
                            <div id="pageContent">
                                <PlayerUpdate email={this.state.email}/>
                            </div>
                        </div>
                    );
                }
                break;
            case "findA":
                if (this.state.admin) {
                    return (
                        <div className="playerNav">
                            <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Player</button>
                            <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Player</button>
                            <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Player</button>
                            <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Players</button>
                            <div id="pageContent">
                                <PlayerSearch />
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="playerNav">
                            <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Player</button>
                            <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Player</button>
                            <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Players</button>
                            <div id="pageContent">
                                <PlayerSearch />
                            </div>
                        </div>
                    );
                }
                break;
            case "findAll":
                if (this.state.admin) {
                    return (
                        <div className="playerNav">
                            <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Player</button>
                            <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Player</button>
                            <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Player</button>
                            <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Players</button>
                            <div id="pageContent">
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
                                            </tr>
                                        </thead>
                                        {this.addRow(this.state.data)}
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="playerNav">
                            <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Player</button>
                            <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Player</button>
                            <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Players</button>
                            <div id="pageContent">
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
                                            </tr>
                                        </thead>
                                        {this.addRow(this.state.data)}
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                }
                break;
            default:
                if (this.state.admin) {
                    return (
                        <div className="playerNav">
                            <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Player</button>
                            <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Player</button>
                            <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Player</button>
                            <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Players</button>
                            <div id="pageContent">
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="playerNav">
                            <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Player</button>
                            <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Player</button>
                            <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Players</button>
                            <div id="pageContent">
                            </div>
                        </div>
                    );
                }
        }
    }
}

export default PlayerNav;
