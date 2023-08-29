import { initialSetup } from './index.js';

initialSetup();

const titleEl = document.getElementById('title');
const descriptionEl = document.getElementById('description');
const bannerImageEl = document.getElementById('banner-image');
const coverImageEl = document.getElementById('cover-image');
const infoEl = document.getElementById('info');
const averageScore = document.getElementById('averageScore');
const popularity = document.getElementById('popularity');
const showDesc = document.getElementById('show');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

fetch(`https://animeapi-askiahnur1.b4a.run/anime/${id}`)
  .then(response=>response.json())
  .then(d => {
    const data = d
    titleEl.innerHTML = data.title.romaji; 
    descriptionEl.innerHTML = data.description
    bannerImageEl.src = data.bannerImage
    coverImageEl.src = data.coverImage
    averageScore.innerHTML = `${data.averageScore}/100`
    popularity.innerHTML = `${data.popularity} popularity`


    const info = [
      data.year,
      data.format,
      data.status,
      data.episodes ? +`${data.episodes} Episodes` : '',
    ];
    
    let result = '';
    info.forEach((item) => {
      if (item) {
        result += `<span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${item}</span>`;
      }
    });
    
    
    data.genres.forEach(genre => {
      result += `<span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${genre}</span>`;
    });

    infoEl.innerHTML = result;
  })
  .catch(err=>console.log(err))

  descriptionEl.style.display = "-webkit-box";
  descriptionEl.style.webkitBoxOrient = "vertical";
  descriptionEl.style.webkitLineClamp = "4";
  descriptionEl.style.overflow = "hidden";

  showDesc.addEventListener("click",e=>{
    const currentValue = e.target.dataset.show
    if(currentValue == "more"){
      e.target.dataset.show = "less"
      showDesc.innerHTML = "Show Less"
      descriptionEl.style.display = "block"
    }else{
      e.target.dataset.show = "more"
      showDesc.innerHTML = "Show More"
      descriptionEl.style.display = "-webkit-box"
    }
  })