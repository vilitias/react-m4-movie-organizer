import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

class MainPage extends Component {

    state = {
        movies: [],
        favorites: []
    }

    addMovies = (movs) => {
        this.setState({ movies: movs });
    }

    addToFav = (newMov) => {
        const found = this.state.favorites.find(element => element.id === newMov.id);

        if (!found) {
            this.setState({ favorites: [...this.state.favorites, newMov] });
        }
    }

    removeFromFav = (id) => {
        const updatedFavList = [...this.state.favorites];
        updatedFavList.splice(id, 1);
        this.setState({favorites: updatedFavList})
    }

    

    render() { 

        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox fetchMovies={this.addMovies}/>
                        </div>
                        <div className="main-page__movies">
                            <Movies addToFav={this.addToFav} movies={this.state.movies}/>
                        </div>
                    </section>
                    <aside className="main-page__favorites">
                        <Favorites favs={this.state.favorites} removeFromFav={this.removeFromFav} setListId={this.props.setListId} listId={this.props.listId}/>
                    </aside>
                </main>
            </div>
        );
    }
}
 
export default MainPage;