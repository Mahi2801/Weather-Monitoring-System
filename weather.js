const data = {
  apiKey: "3787d8894b5d1b053a0afde08bc0a797",
  cityImg: [
    'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVtYmFpJTIwcmFpbnxlbnwwfHwwfHw%3D&w=1000&q=80',
'https://media.istockphoto.com/id/1226340114/photo/puratchi-thalaivar-dr-mgr-central-railway-station-chennai-central-railway-station-india.jpg?b=1&s=170667a&w=0&k=20&c=83oxVJ5rcSZuxjhdRM957Oim3fg_aQE10qQb6Mswm6Q=',
'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202302/delhi_mausam_0-sixteen_nine-sixteen_nine.jpg?VersionId=cSfanaIC0gYoYO5buH7Hugf8zv4nUihm&size=690:388',
'https://c4.wallpaperflare.com/wallpaper/550/42/541/grass-flowers-mountains-clouds-wallpaper-preview.jpg',
'https://w0.peakpx.com/wallpaper/749/430/HD-wallpaper-jaipur-museum-albert-museum-best-clouds-nature-pink-city-rajasthan-trending.jpg'
  ],
  cities: ["Mumbai", "Chennai", "Delhi", "Manipur", "Jaipur"],
  latAndLng: [[19.076, 72.877], [13.082, 75.787], [28.704, 77.102], [24.663, 93.906], [26.912, 75.787]],
};

window.onload = function loadCities() {
  let citiesDOM = document.getElementById('citiesList');
    if (citiesDOM) {
      citiesDOM.innerHTML = '';
      for (let ind = 0; ind < data.cities.length; ind++) {
        citiesDOM.innerHTML = citiesDOM.innerHTML + `<li class="city" id="city" onClick="dataBasedOnCities(${ind})">${data.cities[ind]}</li>`
      }
      dataBasedOnCities(0);
    }
}

function setValueToID(id, value, isSRC) {
  const DOMEle = document.getElementById(id);
  if (DOMEle) {
    if (isSRC) {
      DOMEle.style.backgroundImage = "url("+value+")";
    } else {
      DOMEle.innerHTML = value;
    }
  }
}

function searchVal() {
  const searchDOM = document.getElementById('valueID');
  if (searchDOM) {
    const filter = searchDOM.value.toUpperCase();
    h1Dat = document.getElementById("citiesList");
    details = h1Dat.getElementsByTagName('li');
    for (i = 0; i < details.length; i++) {
        txtValue = details[i].textContent || details[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            details[i].style.display = "";
        } else {
            details[i].style.display = "none";
        }
    }
  }
}

function dataBasedOnCities(ind) {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${data.latAndLng[ind][0]}&lon=${data.latAndLng[ind][0]}&appid=${data.apiKey}`;
  fetch(weatherApi).then(response => response.json())
  .then(weatherRes => {
    setValueToID('cityName', data.cities[ind]);
    setValueToID('condition', weatherRes.weather[0]['main']);
    setValueToID('dateTime', new Date(weatherRes.dt * 1000).toDateString());
    setValueToID('degreesID', Math.round(weatherRes.main.temp * 10) / 100 + '&#176');
    setValueToID('bgImage', data.cityImg[ind], true);
    setValueToID('Pressure', weatherRes.main['pressure'] + ' psi');
    setValueToID('Humidity', weatherRes.main['humidity'] + ' %');
    setValueToID('Wind', weatherRes.wind['speed'] + ' Km/hr');
  })
}
