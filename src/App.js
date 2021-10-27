import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';

import './reset.css';
import './common.css';

class App extends React.Component {

  state = {
    listId : ""
  }

  setListId = (id) => {
    this.setState({listId: id})
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact> <MainPage setListId={this.setListId} listId={this.state.listId}/></Route>
        <Route path={`/list/${this.state.listId}`} ><ListPage listId={this.state.listId}/></Route>
      </div>
    );
  }
}

export default App;
