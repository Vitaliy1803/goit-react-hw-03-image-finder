

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38612663-104365064c4585898fba93344';
const PER_PAGE = 12;
const page = 1;

export const getPhotos = searchText => {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  )
    
};
