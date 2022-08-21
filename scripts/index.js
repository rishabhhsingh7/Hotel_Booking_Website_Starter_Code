var cityList = document.querySelector(".city-list1");

var cityRow = [
  {
    name: "Chennai",
    link: "https://media-cdn.tripadvisor.com/media/photo-s/15/4d/46/b8/chennai-madras.jpg",
  },
  {
    name: "Agra",
    link: "https://media-cdn.tripadvisor.com/media/photo-s/15/33/fc/fc/agra.jpg",
  },
  {
    name: "Jaipur",
    link: "https://media-cdn.tripadvisor.com/media/photo-s/10/a3/3b/8a/screenshot-2017-09-12.jpg",
  },
  {
    name: "Banguluru",
    link: "https://media-cdn.tripadvisor.com/media/photo-s/0c/d2/2f/7a/palace-from-the-outside.jpg",
  },
];

var addCities = () => {
  cityRow.forEach((element) => {
    var template = `<div class="img-container">
        <img class="city-img" src="${element.link}"
          alt="${element.name}" />
        <div class="overlay">
          <div class="text">${element.name}</div>
        </div>
      </div>`;
    cityList.innerHTML += template;
  });
};

addCities();
