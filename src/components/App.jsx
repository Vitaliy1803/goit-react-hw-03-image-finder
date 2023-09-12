import React, { Component } from 'react';
import Search from './Searchbar/Searchbar';
import Api from './API/api';

export class App extends Component {
  state = {
    searchText: '',
  };

  handleSearch = searchText => {
    this.setState({ searchText });
  };

  render() {
    return (
      <>
        <Search handleSearch={this.handleSearch}/>
        <Api searchText={this.state.searchText} />
      </>
    );
  }
}
