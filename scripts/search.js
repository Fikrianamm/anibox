import { imageCard } from './components/components.js';
import { initialSetup } from './index.js';

initialSetup();

const resultContainer = document.getElementById('result-container');
const searchKeyword = document.getElementById('search-keyword');

// mengambil query string parameter pada url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get('q');

searchKeyword.innerHTML = q;

//? ambil data hasil searching dari API
fetch(`https://animeapi-askiahnur1.b4a.run/anime?title=${q}`)
  .then(response=>response.json())
  .then(data=>{
    const searchResult = data 
    if (!searchResult.length) {
      resultContainer.innerHTML = '<p>Data not found.</p>';
    } else {
      resultContainer.innerHTML = searchResult
        .map((item) =>
          imageCard({
            title: item.title.romaji,
            genre: item.genres[0],
            id: item.id,
            imageUrl: item.coverImage,
            year: item.year,
          })
        )
        .join('');
    }
  })
  .catch(err=>console.log(err))