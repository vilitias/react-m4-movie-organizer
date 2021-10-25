import React, { Component } from 'react';
import './Favorites.css';


class Favorites extends Component {

    state = {
        inputValue: ""
    }

    changeInput = (event) => {
        this.setState({inputValue: event.target.value})
    }

    saveList = () => {
        const titleArr = [];
        this.props.favs.forEach(element => {
            titleArr.push(element.id)
        });

        const list = {
            "title": this.state.inputValue,
            "movies": titleArr
        }

        fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
              },
            body: JSON.stringify(list)      
        })
        .then(response => response.json())
        .then(data => {
            this.props.setListId(data.id)
        })



    } 

    render() { 

        return (
            <div className="favorites">
                <input value={this.state.inputValue} onChange={(event) => this.changeInput(event)} placeholder="Новый список" className="favorites__name" />
                <ul className="favorites__list">
                    {this.props.favs.map((item, index) => {
                        return (
                        <li className="favorites__list-item" key={item.imdbID}>
                            {item.title} ({item.year}) 
                            <button  onClick={() => this.props.removeFromFav(index)}>X</button>
                            </li>)
                    })}
                </ul>

                {this.props.listId ? 
                <a href={`/list/${this.props.listId}`} >Перейти к списку</a> 
                :
                <button 
                type="button" 
                className="favorites__save" 
                disabled={this.props.favs.length === 0 || this.state.inputValue === ""}
                onClick={this.saveList}
                >
                    Сохранить список
                </button> }
            </div>
        );
    }
}
 
export default Favorites;
