import React, { Component } from 'react';
import './GameSearch.css';

class GameSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: ""
        }
        this.search = this.search.bind(this)
    }

    search = (event) => {
        event.preventDefault();
        this.setState({
            searchBy: "",



          option: event.target.id
        });
        
    }

    render() {
        return (
            <div className="search">
                <div id="searchCriteria">
                    <form> <input type="number" placeholder="reference"></input> <button onClick={this.search}>Search</button></form>
                    <form> <input type="text" placeholder="player"></input> <button onClick={this.search}>Search</button></form>                
                    <form> <input type="text" placeholder="result"></input> <button onClick={this.search}>Search</button></form>
                </div>
                <div id="searchContent">
                </div>
             </div>
        );
    }
}

export default GameSearch;
