import React, {Component} from 'react';
import { Searchbar, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled';

export default class Search extends Component {
  render() {
    return (
      <Searchbar>
        <SearchForm className="searchForm" role={Search}>
          <SearchFormInput
            type="search"
            className="searchInput"
            placeholder="Search"
            aria-label="Search"
          />
          <SearchFormButton className="searchBtn" type="submit">
            Search
          </SearchFormButton>
        </SearchForm>
      </Searchbar>
    );
  }
}


