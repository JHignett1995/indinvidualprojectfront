import React, { Component } from 'react';
import GameSearch from './GameSearch';
class GameNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event) => {
        this.setState({
            option: event.target.id
        });
        
    }

    getState() {
        return this.state.option;
    }

    render() {
        switch (this.state.option) {
            case "findA":
                return (
                    <div className="gameNav">
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
                        <button id="findA" value={this.state.option} onClick={this.handleChange}>Find a Game</button>
                        <button id="findAll" value={this.state.option} onClick={this.handleChange}>Find all Games</button>
                        <div id="pageContent">
                        </div>
                    </div>
                );
                break;
            default:
                return (
                    <div className="gameNav">
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
