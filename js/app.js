//-------DOM ELEMENTS----------;
const button = document.querySelector(".btn");
const searchInput = document.getElementById("searchInput");
const condition = document.getElementById("condition");
const time = document.getElementById("time");
const cityName = document.getElementById("city");
const temp = document.getElementById("temp");
const country = document.getElementById("country");
const wind = document.getElementById("wind");
const humid = document.getElementById("humid");
const feelsLike = document.getElementById("feelsLike");
const precip = document.getElementById("precip");
const todayCond = document.getElementById("todayCond");
const todayTemp = document.getElementById("todayTemp");
const tmrwCond = document.getElementById("tmrwCond");
const tmrwTemp = document.getElementById("tmrwTemp");
const afterTmrwCond = document.getElementById("afterTmrwCond");
const afterTmrwTemp = document.getElementById("afterTmrwTemp");
const todayName = document.getElementById("todayName");
const tmrwName = document.getElementById("tmrwName");
const afterTmrw = document.getElementById("afterTmrw");
const afterTmrwIcon = document.getElementById("afterTmrwIcon");
const tmrwIcon = document.getElementById("tmrwIcon");
const todayIcon = document.getElementById("todayIcon");

//--------Default Data---------;
function defaultData() {
  responseData = getData("london");
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition);
    function setPosition(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let myLocation = `${lat},${lon}`;
      responseData = getData(myLocation);
    }
  }
}
defaultData();

//----------Function fetching API then displaying data---------;
function getData(myLocation) {
  let api = `http://api.weatherapi.com/v1/forecast.json?key=49a2e77131794573a6b04448210205&q=${myLocation}&days=3&aqi=no&alerts=no`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      let todayDate = new Date(
        responseData.forecast.forecastday[0].date
      ).toLocaleString("en-US", {
        weekday: "long",
      });
      let tmrwDate = new Date(
        responseData.forecast.forecastday[1].date
      ).toLocaleString("en-US", {
        weekday: "long",
      });
      let afterTmrwDate = new Date(
        responseData.forecast.forecastday[2].date
      ).toLocaleString("en-US", {
        weekday: "long",
      });
      //-------Displaying the current time Data--------;
      time.innerText = responseData.location.localtime;
      cityName.innerText = responseData.location.name + ",";
      temp.innerText = responseData.current.temp_c + "C";
      country.innerText = responseData.location.country;
      humid.innerText = "Humidity : " + responseData.current.humidity + "%";
      wind.innerText = "Wind : " + responseData.current.wind_kph + "km/h";
      feelsLike.innerText =
        "Feels like : " + responseData.current.feelslike_c + "C";
      precip.innerText =
        "Precipitation : " + responseData.current.precip_in + "%";
      condition.innerHTML =
        responseData.current.condition.text +
        `<img src="https:${responseData.current.condition.icon}">`;
      //---------Displaying the forecast Data-------;
      todayName.innerText = todayDate;
      todayCond.innerText =
        responseData.forecast.forecastday[0].day.condition.text;
      todayTemp.innerText =
        responseData.forecast.forecastday[0].day.avgtemp_c + "C";
      todayIcon.innerHTML = `<img src="https:${responseData.forecast.forecastday[0].day.condition.icon}">`;
      tmrwName.innerText = tmrwDate;
      tmrwCond.innerText =
        responseData.forecast.forecastday[1].day.condition.text;
      tmrwTemp.innerText =
        responseData.forecast.forecastday[1].day.avgtemp_c + "C";
      tmrwIcon.innerHTML = `<img src="https:${responseData.forecast.forecastday[1].day.condition.icon}">`;
      afterTmrw.innerText = afterTmrwDate;
      afterTmrwCond.innerText =
        responseData.forecast.forecastday[2].day.condition.text;
      afterTmrwTemp.innerText =
        responseData.forecast.forecastday[2].day.avgtemp_c + "C";
      afterTmrwIcon.innerHTML = `<img src="https:${responseData.forecast.forecastday[2].day.condition.icon}">`;
      // console.log(responseData);
    });
}

//--------Event Listener---------;
button.addEventListener("click", function search() {
  if (searchInput.value) {
    responseData = getData(searchInput.value);
    searchInput.value = "";
  }
});
