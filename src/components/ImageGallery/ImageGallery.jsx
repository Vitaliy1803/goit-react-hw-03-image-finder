import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { ImageGalleryUl } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    bigPic: null,
  };

  componentDidMount() {
    document.addEventListener('click', e => {
      if (e.target.nodeName !== 'IMG') {
        this.setState({ showModal: false });
        return;
      } else {
        let picture = this.props.images.filter(obj => {
          return obj.id === parseInt(e.target.alt);
        });
        if (picture[0]) {
          this.setState({ bigPic: picture[0].largeImageURL });
        }
      }
    });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal, bigPic } = this.state;
    return (
      <>
        <ImageGalleryUl onClick={this.toggleModal}>
          {this.props.images.map(img => {
            return (
              <ImageGalleryItem
                key={nanoid()}
                smallImgURL={img.webformatURL}
                id={img.id}
              />
            );
          })}
        </ImageGalleryUl>
        {showModal && bigPic && (
          <Modal onClose={this.toggleModal} pic={bigPic} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
