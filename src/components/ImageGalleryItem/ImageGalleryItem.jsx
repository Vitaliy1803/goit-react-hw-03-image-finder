import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemImg, ImageGalleryItemLi } from './ImageGallaryItem.styled';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <ImageGalleryItemLi >
        <ImageGalleryItemImg src={this.props.smallImgURL} alt={this.props.id} />
      </ImageGalleryItemLi>
    );
  }
}


ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
};