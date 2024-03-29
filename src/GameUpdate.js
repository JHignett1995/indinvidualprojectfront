import React, { Component } from 'react';
import axios from 'axios';
import './GameUpdate.css';

class GameUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updRef:"",
            winner: "",
            loser: "",
            count7Ball:false
        }
        this.handleChange = this.handleChange.bind(this)
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

    render() {
        return (
            <div>
                <form id="updateGame">
                    Game To Update
                    <p><input id="updRef" placeholder="Game Ref" type="number" onChange={this.handleChange}></input></p>
                    <p>Update</p>
                    <input id="winner" type="email" placeholder="Winning Player Email" onChange={this.handleChange}></input>
                    <p><input id="loser" placeholder="Losing Player Email" type="email" onChange={this.handleChange}></input></p>
                    <label><input id="count7Ball" type="checkbox" name="Was7Ball" onClick={this.handleChange}></input>Was 7 Ball?</label>
                    <p><button onClick={this.submit}>Update</button></p>
                </form>
            </div>
        );
  }
}

export default GameUpdate;
