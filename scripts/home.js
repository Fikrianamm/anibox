import { bannerCarouselItem, section } from './components/components.js';
import { initialSetup } from './index.js';

initialSetup();

const setBannerCarouselItem = (banner) => {
  const bannerContainer = document.getElementById('banner-container');

  const carouselItems = banner.map((item) =>
    bannerCarouselItem({
      id: item.id,
      title: item.title.romaji,
      description: item.description,
      banner: item.bannerImage,
      year: item.year,
      genre: item.genres[0],
      format: item.format,
    })
  );

  bannerContainer.innerHTML = carouselItems.join('');

  const items = [];
  let index = 0;
  for (const item of bannerContainer.children) {
    items.push({
      position: index++,
      el: item,
    });
  }

  const carousel = new Carousel(items);
  carousel.cycle();

  const prevButton = document.querySelector('[data-carousel-prev]');
  const nextButton = document.querySelector('[data-carousel-next]');

  prevButton.onclick = () => {
    carousel.prev();
  };

  nextButton.onclick = () => {
    carousel.next();
  };
};

//? ambil data dari API
const baseUrl = "https://animeapi-askiahnur1.b4a.run"
const sortEndpoint = ["trending","popularity","newest","top"] 

const fetchAll = sortEndpoint.map(sort=>{
  const endpoint = `/anime?sort=${sort}`
  return fetch(baseUrl + endpoint).then(response=>response.json())
})

Promise.all(fetchAll)
  .then(data=>{
    const [trending,popularity,newest,top] = data
  

const banner = trending.slice(0, 5);

setBannerCarouselItem(banner);

const listSection = [
    {
      name: 'Trending',
      data: trending,
    },
    {
      name: 'Popular',
      data: popularity,
    },
    {
      name: 'New Release',
      data: newest,
    },
    {
      name: 'Top N',
      data: top,
    },
  ];


// menampilkan data ke halaman HTML
document.querySelector('main').innerHTML = listSection
  .map((item) => section(item))
  .join('');

// memberi action pada button scroll kiri dan kanan
listSection.forEach((item) => {
  const sectionName = item.name.toLowerCase();

  const prev = document.querySelector(
    '#' + sectionName + ' button[data-carousel-prev]'
  );
  prev.onclick = () => {
    document.getElementById(sectionName + '-container').scrollLeft -= 1000;
  };

  const next = document.querySelector(
    '#' + sectionName + ' button[data-carousel-next]'
  );
  next.onclick = () => {
    document.getElementById(sectionName + '-container').scrollLeft += 1000;
  };
});

})