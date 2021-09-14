import axios from "axios";

export default {
key: '23365989-0313fa8d36a360eb60645d2f6',
query: '',
image_type: "photo",
orientation: "horizontal",
safesearch: true,
page: 1,
per_page: 40,

async fetchImages() {
    const response = await axios.get(`https://pixabay.com/api/?key=23365989-0313fa8d36a360eb60645d2f6&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
    const res = await response.data;
    return res;
}
}