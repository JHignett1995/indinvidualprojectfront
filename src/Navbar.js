import React, { Component } from 'react';
import './App.css';
import './Navbar.css';
import PlayerNav from './PlayerNav';
import GameNav from './GameNav';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: this.props.email,
            admin: this.props.admin,
            display: "about"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event) => {
        this.setState({
            display: event.target.id
        });
        console.log(this.state.email);
    }

    render() {
        switch (this.state.display) {
            case "about":
                return (
                    <div className="Navbar">
                        <button id="player" value={this.state.display} onClick={this.handleChange}>Player</button>
                        <button id="game" value={this.state.display} onClick={this.handleChange}>Game</button>
                        <button id="about" value={this.state.display} onClick={this.handleChange}>About</button>
                        <div id="pageContent">
                            <p>The aim of this web app is to keep track of the pool games held internally within QA.</p>
                            <p>Using the player tab you can access all players or a specific one to challenge to a game.</p>
                            <p>Players without admin rights can only view and challenge players.</p>
                            <p>Using the game tab you can view all games played or find a specific one by the given refference.</p>
                        </div>
                    </div>
                );
                break;
            case "player":
                return (
                    <div className="Navbar">
                        <button id="player" value={this.state.display} onClick={this.handleChange}>Player</button>
                        <button id="game" value={this.state.display} onClick={this.handleChange}>Game</button>
                        <button id="about" value={this.state.display} onClick={this.handleChange}>About</button>
                        <div id="pageContent">
                            <PlayerNav email={this.state.email} admin={this.state.admin} />
                        </div>
                    </div>
                );
                break;
            case "game":
                return (
                    <div className="Navbar">
                        <button id="player" value={this.state.display} onClick={this.handleChange}>Player</button>
                        <button id="game" value={this.state.display} onClick={this.handleChange}>Game</button>
                        <button id="about" value={this.state.display} onClick={this.handleChange}>About</button>
                        <div id="pageContent">
                            <GameNav email={this.state.email} admin={this.state.admin} />
                        </div>
                    </div>
                );
                break;
            default:
                return (
                    <div className="Navbar">
                        <button id="player" value={this.state.display} onClick={this.handleChange}>Player</button>
                        <button id="game" value={this.state.display} onClick={this.handleChange}>Game</button>
                        <button id="about" value={this.state.display} onClick={this.handleChange}>About</button>
                        <div id="pageContent">
                            <p>The aim of this web app is to keep track of the pool games held internally within QA.</p>
                            <p>Using the player tab you can access all players or a specific one to challenge to a game.</p>
                            <p>Players without admin rights can only view and challenge players.</p>
                            <p>Using the game tab you can view all games played or find a specific one by the given refference.</p>
                        </div>
                    </div>
                );
        }
  }
}

export default Navbar;
