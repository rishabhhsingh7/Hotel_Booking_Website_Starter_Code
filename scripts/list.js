let name = localStorage.getItem("searchvalue");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
var checkin = yyyy + "-" + mm + "-" + dd;
var dd1 = today.getDate() + 1;
var checkout = yyyy + "-" + mm + "-" + dd1;

function fetchHotel(name) {
  localStorage.removeItem("searchvalue");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1d0c0bb895msh1e5a7342836dd3cp10cfb0jsnbfb45de784ac",
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    },
  };

  fetch(
    `https://hotels4.p.rapidapi.com/locations/v2/search?query=${name}&locale=en_US&currency=USD`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      var ide = 0;
      let res = response.suggestions;
      res.forEach((element) => {
        ide = element.entities[0].destinationId;
      });
      listhotel(ide, checkin, checkout);
      console.log(ide);
    })
    .catch((err) => console.error(err));
}

var imageurl;
var imageUrl;

function listhotel(ide, checkIn, checkOut) {
  console.log(checkIn, checkOut);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1d0c0bb895msh1e5a7342836dd3cp10cfb0jsnbfb45de784ac",
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    },
  };
  fetch(
    `https://hotels4.p.rapidapi.com/properties/list?destinationId=${ide}&pageNumber=1&pageSize=25&checkIn=${checkIn}&checkOut=${checkOut}&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let contentimages = document.querySelector("#content-images");
      let res = response.data.body.searchResults.results;
      res.forEach((element) => {
        imageurl = `${element.optimizedThumbUrls.srpDesktop}`;
        imageUrl = JSON.stringify(imageurl);

        let str = ` <div class="hotel-images onmouseover="sendurl(imageUrl)" onclick="findid('${element.id}')"><a onclick="findid('${element.id}')"  onmouseover="sendurl(imageUrl)" href="./detail.html"><img
            src="${element.optimizedThumbUrls.srpDesktop}"></a>
    <a href="./detail.html">
        <h3 id='hname'>${element.name}</h3>
    </a>
    <a onclick="findid('${element.id}')"onmouseover="sendurl(imageUrl)" href="./detail.html">
    <span>${element.starRating}.</span><i class="fa fa-star checked"></i>
       
    </a>
    <a onclick="findid('${element.id}')" onmouseover="sendurl(imageUrl)" href="./detail.html">
        <p>${element.address.streetAddress}
        ${element.address.extendedAddress},
        ${element.address.locality},
        ${element.address.postalCode},
        ${element.address.countryName}</>
    </a>
   
</div>`;
        contentimages.innerHTML += str;
      });
    })
    .catch((err) => console.error(err));
}

fetchHotel(name);

function findid(id) {
  localStorage.setItem("id", id);

  // localStorage.setItem('hname',hname)
}
function sendurl(imageUrl) {
  localStorage.setItem("imgurl", imageUrl);
}
