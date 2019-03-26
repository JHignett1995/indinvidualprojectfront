import React, { Component } from 'react';
import axios from 'axios';
import './GameUpdate.css';

class GameUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            admin: this.props.admin,
            updRef:"",
            winner: "",
            loser: "",
            count7Ball: false,
            data: ""
        }
        this.handleChange = this.handleChange.bind(this)
    } 

    componentDidMount() {
        axios.get(`http://35.189.110.9:8888/IndividualProject/api/game/getAllGames`).then(response => {
            this.setState({
                data: response.data
            });
        });
    }

    submit = (e) => {
        e.preventDefault();
        if (this.state.count7Ball ==="on" || this.state.count7Ball ==="off") {
            if (this.state.count7Ball ==="on") {
                this.setState({
                    count7Ball: true
                })
            } else {
                this.setState({
                    count7Ball: false
                })
                console.log(this.state.count7Ball);
            }
        }

        axios.post(`http://35.189.110.9:8888/IndividualProject/api/game/updateGame/` 
            + this.state.winner + `/`
            + this.state.loser + `/`
            + this.state.updRef + `/`
            + this.state.count7Ball)
            .then(response => {
            alert(response.data.message);
        });
    }


    handleChange = (event) => {
        if ([event.target.id] != "count7Ball") {
            this.setState({
                [event.target.id]: event.target.value
            });
        } else {
            this.setState({ [event.target.id]: event.target.checked })
        }

    }   

    getGameSelect() {
        let options = []
        for (let i = 0; i < this.state.gameRefs.length; i++) {
            options.push(this.getGameOptions(this.state.data[i].reference));
        }
        return (<select id="refs" size={this.state.data.length}>{options}</select>);
    }

    getGameOptions(ref) {
        return (<option value={ref}>{ref}</option>);
    }

    getPlayerSelect = (e) => {
        let options = []
        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].reference == this.state.gameSelect) {
                options.push(this.getPlayerOptions(this.state.data[i].playerId));
            }
        }
        return (<select onSelect={this.handleChange} id="players">{options}</select>);
    }

    getPlayerOptions(player) {
        return (<option value={player.email}>{player.email}</option>);
    }

    render() {
        return (
            <div>
                <form id="updRef">
                    <p>{this.getOptions}</p>
                    <button onClick={}>Get Game</button>
                </form>
                <form id="updateGame">
                    Game To Update
                    <p><input id="gameSelect" onChange={this.handleChange} list="refs">{this.getDataList}</input></p>
                    <button onClick={this.fetchGame}>Get Game</button>
                    <p>Update</p>
                    <p>{this.getPlayerSelect}</p>
                    <p>{this.getPlayerSelect}</p>
                    <label><input id="count7Ball" type="checkbox" name="Was7Ball" onClick={this.handleChange}></input>Was 7 Ball?</label>
                    <p><button onClick={this.submit}>Update</button></p>
                </form>
            </div>
        );
  }
}

export default GameUpdate;
