import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [],
        moviesIds: [],
        listTitle: ""
    }
    componentDidMount() {
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${this.props.listId}`)
        .then(res => res.json())
        .then(data => {


            for (let i = 0; i < data.movies.length; i++) {
                fetch(`http://www.omdbapi.com/?apikey=73b4663c&i=${data.movies[i]}`)
                .then(res => res.json())
                .then(data => {
                    this.setState({movies: [...this.state.movies, data]})
                })
            }

            this.setState({listTitle: data.title});
        })
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.listTitle}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`}> {item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;