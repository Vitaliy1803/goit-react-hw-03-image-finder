import React, { Component } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonSpan,
} from './Searchbar.styled';

export default class Search extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Enter your search query');
      return;
    }

    this.props.handleSearch(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Searchbar className="searchbar">
        <SearchForm className="searchForm" onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="searchBtn">
            <SearchFormButtonSpan className="buttonSpan">
              Search
            </SearchFormButtonSpan>
          </SearchFormButton>

          <SearchFormInput
            className="searchInput"
            type="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
