import React, { Component } from 'react';
import './SearchBox.css';

const apikey = "73b4663c";

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();

        fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${this.state.searchLine}`)
        .then(response => response.json())
        .then(data => {
            if(data.Search){
                this.props.fetchMovies(data.Search);
            } else {
                this.props.fetchMovies([]);
            }
        })
        .catch(rej => {
            console.log(rej)
        })
    }
    render() {

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={this.state.searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={(event) => this.searchLineChangeHandler(event)}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!this.state.searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;