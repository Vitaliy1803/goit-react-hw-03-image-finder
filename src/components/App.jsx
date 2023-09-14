import React, { Component } from 'react';
import Search from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import axios from 'axios';

export default class App extends Component {
  state = {
    URL: 'https://pixabay.com/api/',
    KEY: '38612663-104365064c4585898fba93344',
    pictures: [],
    error: '',
    status: 'idle',
    page: 1,
    query: '',
    totalHits: null,
  };

  fetchImg = () => {
    const { URL, KEY, query, page } = this.state;
    const perPage = 12; 

    if (this.state.query !== query) {
      this.setState({ page: 1 });
    }
  
    
    axios
      .get(URL, {
        params: {
          q: query,
          page,
          key: KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: perPage,
        },
      })
      .then(response => {
        const pictures = response.data.hits;
        const totalHits = response.data.total;
  
        if (!totalHits) {
          alert('Did not find anything, mate');
        }
  
        const selectedProperties = pictures.map(({ id, largeImageURL, webformatURL }) => {
          return { id, largeImageURL, webformatURL };
        });
  
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...selectedProperties],
          status: 'resolved',
          totalHits,
        }));
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      });
  };

  handleSearch = query => {
    console.log(query);
    this.setState({ query, pictures: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ status: 'pending', pictures: [], page: 1 });
      this.fetchImg();
    }
    if (
      this.state.query === prevState.query &&
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      this.fetchImg();
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { pictures, totalHits, status } = this.state;
    return (
      <>
        <Search handleSearch={this.handleSearch} />
        {pictures.length && <ImageGallery images={pictures} />}
        {totalHits > pictures.length && (
          <Button onClick={this.handleLoadMore} />
        )}
        {status === 'pending' && <Loader />}
      </>
    );
  }
}
