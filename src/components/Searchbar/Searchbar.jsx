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
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSearch(this.state.value);
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
            value={this.state.value}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
