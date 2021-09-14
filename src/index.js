import './sass/main.scss';
import axios from "axios";
import objectJS from './object'


const refs = {
    body: document.body,
    form: document.querySelector("#search-form"),
    gallery: document.querySelector(".gallery"),
    input: document.querySelector("input"),
    loadmoreBtn: document.querySelector(".load-more"),
};


const getImages = async () => {
  try {

    const { hits: images, totalHits } = await objectJS.fetchImages();
    renderGallery(images);
    
    // console.log(images);
  } catch (error) {
    console.error("Sorry, there are no images matching your search query. Please try again.", error);
  }
}


const handleSubmit = e => {
  e.preventDefault();
  objectJS.query = refs.input.value;
  clearGallery();
  
  getImages();
}

refs.form.addEventListener("submit", handleSubmit);

function renderGallery(images) {
  console.log(images);
    const markup = images.map((image => {
        return `<div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" width="350" loading="lazy" />
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
  };



  // let inputField = '';

// const inputHandler = (e)=> {
//   inputField= e.target.value;
// }

// refs.input.addEventListener('input', inputHandler);



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