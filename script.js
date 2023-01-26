'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

//GET LOCATION AND DISPLAY MAP = getCurrentPosition gets 2 callbacks, one for success and one for error
navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    //Draws map and focus geolocation
    map = L.map('map').setView(coords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //Handling clicks on map
    function onMapClick(e) {
      mapEvent = e;
      form.classList.remove('hidden');
      inputDistance.focus();
    }
    map.on('click', onMapClick);
  },
  function () {
    console.log('Could not get your position');
  }
);

//FORM SUBMIT
form.addEventListener('submit', function (e) {
  e.preventDefault();
  //Clear input fields
  inputDistance.value = '';
  inputDuration.value = '';
  inputCadence.value = '';
  inputElevation.value = '';
  form.classList.add('hidden');

  //Display marker
  const currentCoord = mapEvent.latlng;
  L.marker(currentCoord)
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWitdh: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
        // content: 'You clicked here!',
      })
    )
    .setPopupContent('You clicked here!')
    .openPopup();
});

inputType.addEventListener('change', () => {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
