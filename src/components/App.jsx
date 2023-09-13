import React, { Component } from 'react';
import Search from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

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
    return fetch(
      `${this.state.URL}?q=${this.state.query}&page=${this.state.page}&key=${this.state.KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('Failed to find any images'));
      })
      .then(pictures => {
        if (!pictures.total) {
          alert('Did find anything, mate');
        }
        const selectedProperties = pictures.hits.map(
          ({ id, largeImageURL, webformatURL }) => {
            return { id, largeImageURL, webformatURL };
          }
        );
        this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...selectedProperties],
            status: 'resolved',
            totalHits: pictures.total,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  handleSearch = query => {
    console.log(query);
    this.setState({ query });
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
