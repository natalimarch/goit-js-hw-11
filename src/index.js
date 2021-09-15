import './sass/main.scss';
import './css/styles.css';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
// all modules
import Notiflix from "notiflix";
import objectJS from './object'


const refs = {
    body: document.body,
    form: document.querySelector("#search-form"),
    gallery: document.querySelector(".gallery"),
    input: document.querySelector("input"),
    loadmoreBtn: document.querySelector(".load-more"),
};

let last = 0;

const getImages = async () => {
  try {

    const { hits: images, totalHits } = await objectJS.fetchImages();
    renderGallery(images);
    if (images.length === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    new SimpleLightbox('.gallery a', { 
      showCounter: false,
      disableScroll: false,
      captionsData: 'alt',
      captionDelay: 250,
      docClose: true,
  });
  
  if (objectJS.page === 2) {
    const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
    });
  }

    last += 40;
    console.log(last);
    console.log(totalHits);

    if (objectJS.page === 1) {
      Notiflix.Notify.info(`"Hooray! We found ${totalHits} images.`)
    }
    // console.log(images.length);
    if (last >= totalHits && last !== 0) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadmoreBtn.setAttribute("hidden", true);
    }
    console.log(images);
    } catch (error) {
    console.log(error);
  }
}


const handleSubmit = e => {
  e.preventDefault();
  objectJS.query = refs.input.value;
  clearGallery();
  getImages();
  refs.loadmoreBtn.removeAttribute("hidden", true);
}

refs.form.addEventListener("submit", handleSubmit);

function renderGallery(images) {
  console.log(images);
    const markup = images.map((image => {
        return `<div class="photo-card">
        <a class="gallery__link" href="${image.largeImageURL}">
        <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" width="350" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: </b>${image.likes}
          </p>
          <p class="info-item">
            <b>Views: </b>${image.views}
          </p>
          <p class="info-item">
            <b>Comments: </b>${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads: </b>${image.downloads}
          </p>
        </div>
      </div>`
        })).join('');
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        return refs.gallery;
}
  
  

  // refs.body.insertAdjacentElement('afterbegin', refs.gallery);
refs.loadmoreBtn.setAttribute("hidden", true);

refs.loadmoreBtn.addEventListener("click", onLoadMore);

function onLoadMore() {
    console.log(objectJS.page);
    objectJS.page += 1;
    getImages();
    console.log(objectJS.page);
   
}

const clearGallery = () => {
    if (refs.gallery.children.length) {
      refs.gallery.innerHTML = '';
    }
    objectJS.page = 1;
};




// const fetchImages = async (query) => {
//     const search = new URLSearchParams({
//       key: '23365989-0313fa8d36a360eb60645d2f6',
//       q: query,
//       image_type: "photo",
//       orientation: "horizontal",
//       safesearch: true,
//       // page,
//       // per_page: 15,
//     });
//     // `https://pixabay.com/api/?key=23365989-0313fa8d36a360eb60645d2f6&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
//     const response = await fetch(`https://pixabay.com/api/?${search}`);
//     // .then(response => {
//     //     if (!response.ok) {
//     //       throw new Error(response.status);
//     //     }  
//     const searchResult = await response.json();
//     return searchResult;
//   };