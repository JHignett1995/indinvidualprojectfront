import React, { Component } from 'react';
import GameSearch from './GameSearch';
import GameCreate from './GameCreate';
import GameUpdate from './GameUpdate';
import './DisplayTable.css';
import axios from 'axios';

class GameNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: "",
            rowNumber: 0,
            data: "",
            user: this.props.email,
            admin: this.props.admin
        }
        this.handleChange = this.handleChange.bind(this);
        this.addRow = this.addRow.bind(this);
    }
    getAllRequest = (e) => {
        axios.get("http://35.189.110.9:8888/IndividualProject/api/game/getAllGames/").then(response => {

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
                <td>{data.reference}</td>
                <td>{data.playerId.email}</td>
                <td>{data.resultStatus}</td>
            </tr>
        );
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

    render() {
        switch (this.state.option) {
            case "create":
                return (
                    <div className="GameNav">
                        <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Game</button>
                        <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Game</button>
                        <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Game</button>
                        <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Games</button>
                        <div id="pageContent">
                            <GameCreate />
                        </div>
                    </div>
                );
                break;
            case "update":
                return (
                    <div className="GameNav">
                        <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Game</button>
                        <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Game</button>
                        <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Game</button>
                        <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Games</button>
                        <div id="pageContent">
                            <GameUpdate admin={this.state.admin} user={this.state.user}/>
                        </div>
                    </div>
                );
                break;
            case "findA":
                return (
                    <div className="gameNav">
                        <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Game</button>
                        <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Game</button>
                        <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Game</button>
                        <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Games</button>
                        <div id="pageContent">
                            <GameSearch/>
                        </div>
                    </div>
                );
                break;
            case "findAll":
                return (
                    <div className="gameNav">
                        <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Game</button>
                        <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Game</button>
                        <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Game</button>
                        <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Games</button>
                        <div id="pageContent">
                            <div className="DisplayTable">
                                <table id="table">
                                    <thead>
                                        <tr>
                                            <th>Game Reference</th>
                                            <th>Game Email</th>
                                            <th>Result</th>
                                        </tr>
                                    </thead>
                                    {this.addRow(this.state.data)}
                                </table>
                            </div>
                        </div>
                    </div>
                );
                break;
            default:
                return (
                    <div className="gameNav">
                        <button id="create" value={this.state.option} onClick={this.handleChange}>Create a Game</button>
                        <button id="update" value={this.state.option} onClick={this.handleChange}>Update a Game</button>
                        <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Game</button>
                        <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Games</button>
                        <div id="pageContent">
                        </div>
                    </div>
                );
        }
  }
}

export default GameNav;
