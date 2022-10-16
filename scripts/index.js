import '/scripts/Lib/linkLib.js';
import WeatherApi from './api.js';
var api = new WeatherApi ();

function getInput () {
  return {
    searchInput: document.querySelector ('.weatherSearchInput'),
    searchBtn: document.querySelector ('.weatherSearchBtn'),
  };
}

async function getApiResult (q) {
    api
      .getforecast (q)
      .then (res => {
        if (res.error == null) {
          displayWeatherData(res);
        } else {
          if (res.error.code == 1003) {
            $ ('.searchContainer input').focus ();
          } else {
            alert (res.error.message);
          }
        }
      })
      .catch (e => {
        console.log (e);
      });
  }
  
  (function () {
    getWeatherByLocation()
    getInput().searchBtn.addEventListener('click',function() {
      if (getInput().searchInput.value.trim() != '') {
        getApiResult(getInput().searchInput.value)
      } else {
        getInput().searchInput.focus()
      }
    }) 
    document.addEventListener('keyup',function(e) {
      if (e.code == 'Enter') {
        if (getInput().searchInput.value.trim() != '') {
          getApiResult(getInput().searchInput.value)
        } else {
          getInput().searchInput.focus()
        }
      }
    })
  }) ();

  export function getWeatherByLocation() {
    navigator.geolocation.getCurrentPosition (
      pos => {
        let q = `${pos.coords.longitude},${pos.coords.latitude}`;
        getApiResult (q);
      },
      err => {},
      {enableHighAccuracy: true}
    );
  }

  function displayWeatherData(res) {
    const {location,current,forecast} = res
    let arr = forecast.forecastday

    //current first one
    $('.first .date').html(`${getDayName(current.last_updated_epoch)}`)
    $('.first .dayName').html(`${convertTimeEpoch(current.last_updated_epoch)}`)
    $('.first .cityName').html(`${location.name}`)
    $('.first .icon').html(`<img src="${current.condition.icon}">`)
    $('.first .weatherKind').html(`${current.condition.text}`)
    $('.first .degree').html(`${current.temp_c} °C`)

    //second third
    // console.log(arr)
      $('.second .dayName').html(`${getDayName(arr[1].date_epoch)}`)
      $('.second .minTemp').html(`${arr[1].day.mintemp_c} °C`)
      $('.second .maxTemp').html(`${arr[1].day.maxtemp_c} °C`)
      $('.second .icon').html(`<img src="${arr[1].hour[0].condition.icon}">`)
      $('.second .weatherKind').html(`${arr[1].hour[0].condition.text}`)

      $('.third .dayName').html(`${getDayName(arr[2].date_epoch)}`)
      $('.third .minTemp').html(`${arr[2].day.mintemp_c} °C`)
      $('.third .maxTemp').html(`${arr[2].day.maxtemp_c} °C`)
      $('.third .icon').html(`<img src="${arr[2].hour[0].condition.icon}">`)
      $('.third .weatherKind').html(`${arr[2].hour[0].condition.text}`)
  }

function padTo2Digits (num) {
  return num.toString ().padStart (2, '0');
}

function formatDate (date) {
  return [
    padTo2Digits (date.getDate ()),
    padTo2Digits (date.getMonth () + 1),
    date.getFullYear (),
  ].join (' / ');
}
export function convertTimeEpoch (time) {
  var utcSeconds = time;
  var d = new Date (0);
  d.setUTCSeconds (utcSeconds);
  return formatDate (d);
}

export function getDayName(time) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var utcSeconds = time;
  var d = new Date (0);
  d.setUTCSeconds (utcSeconds);
  var dayName = days[d.getDay()];
  return dayName
}

