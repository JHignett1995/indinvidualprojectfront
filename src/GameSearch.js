import React, { Component } from 'react';
import './GameSearch.css';
import axios from 'axios';

class GameSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refNum:0
        }
        this.searchByRef = this.searchByRef.bind(this)
    }

    searchByRef = (event) => {
        
            event.preventDefault();
            axios.get("http://35.189.110.9:8888/IndividualProject/api/game/getAGame/"+this.state.refNum).then(response => {

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
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div className="search">
                <div id="searchCriteria">
                    <form> <input type="number" onChange={this.handleChange} placeholder="reference"></input> <button onClick={this.searchByRef}>Search</button></form>
                   </div>
                <div id="searchContent">
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
    }
}

export default GameSearch;
