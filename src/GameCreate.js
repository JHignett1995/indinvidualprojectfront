import React, { Component } from 'react';
import axios from 'axios';
import './GameCreate.css';

class GameCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            player1: "",
            player2: "",
            data: [],
            p1In: "",
            p2In:""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/IndividualProject/api/player/getAllPlayers/` ).then(response => {

            console.log(response.data);
            this.setState({
                data: response.data
            });
        });
    }
    
    submit=(e) =>{
        e.preventDefault();
        axios.post("http://localhost:8080/IndividualProject/api/game/createGame/" + this.state.player1 +"/"+ this.state.player2
        ).then(response => {
            alert(response.data.message);
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(this.state.player1);
        console.log(this.state.player2);
    }

    validateForm() {
        let p1Good = false;
        let p2Good = false
        if (this.state.player1 != this.state.player2) {
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.data[i].email === this.state.player1) {
                    p1Good = true;
                }
                if (this.state.data[i].email === this.state.player2) {
                    p2Good = true;
                }

            }
        } else {
            console.log("1 Check");
            return false;
        }

        if (!p1Good || !p2Good) {
            if (!p1Good && !p2Good) {
                console.log("2 Check");   
                return false;
            } else if (p1Good) {
                console.log("3 Check"); 
                return false;
            } else {
                console.log("4 Check"); 
                return false;
            }
        }
        
        console.log("all good"); 
        return true;
    }

    render() {
        
        return (
            <div>
                <form id="createGame">
                    <input onChange={this.handleChange} type="email" id="player1" placeholder="Player 1"></input>
                    <input onChange={this.handleChange} type="email" id="player2" placeholder="Player 2"></input>
                    <p><button disabled={!this.validateForm()} onClick={this.submit}>Create</button></p>
                </form>
            </div>
        );
    
  }
}

export default GameCreate;
