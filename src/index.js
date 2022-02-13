import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

inputField.addEventListener("input", debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e){
    console.log(e.target.value.trim());
    const inputValue = e.target.value.trim();
    // cleanPage();
    if (!inputValue) {
        return;
    };
    fetchCountries(inputValue)
    .then( promise => console.log)
}