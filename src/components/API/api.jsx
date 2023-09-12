import React, { Component } from 'react';
import { getPhotos } from 'components/Services/getPhotos';

class Api extends Component {
  state = {
    photos: null,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('this.props :>>', this.props);
    if (prevProps.searchText !== this.props.searchText) {
      getPhotos(this.props.searchText)
        .then(photo => photo.json())
        .then(photo => this.setState({photo: photo.pictures}));
    }
  }

  render() {
    return <>
    <ul>
        {this.state.photo && this.state.photo.map((el) => {
            return <li key={el.id}>{el.pictures}</li>
        })}
    </ul>
    </>;
  }
}

export default Api;
