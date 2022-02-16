import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
// import { notiflixOptions } from "./notiflixOptions.js";
const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

inputField.addEventListener("input", debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e){
    console.log(e.target.value.trim());
    const inputValue = e.target.value.trim();
    cleanPage();
    if (!inputValue) {
        return;
    };
    fetchCountries(inputValue)
    .then(data => {
        if(data.length > 10){
            return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }else if (data.length > 1){
            console.log(data);
            const cardsMarkup = createCardsList(data);
            return countryList.insertAdjacentHTML('beforeend', cardsMarkup);
        }
        console.log(data);
        return countryInfo.insertAdjacentHTML('beforeend', createCardInfo(data));
    })
    .catch(error => {
        console.log('❌ Worning! Rejected promise!', error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
    })
}

function createCardsList(data) {
    
    return data.map(({ flags, name }) => {
       
        return `
                <li class="list_item" list-style-image="url('')">
                    <img class="flag"
                        src="${flags.png}"
                        alt="${name.common}"
                        width="40"
                    />
                    <b class="description">${name.common}</b>
                </li>
                `;
    }).join('');
    
};

function createCardInfo(data){
    const { capital, flags, languages, name, population } = data[0];
    const capitalCities = capital.join(", ");
    const languagesList = Object.values(languages).join(", ");
    return `
    <div class="list_item">
                    <img class="flag"
                        src="${flags.png}"
                        alt="${name.common}"
                        width="50"
                    />
                    <h3 class="name">${name.official}</h3>
                </div>
                <p><span class="description">Capital:</span> ${capitalCities}</p>
                <p><span class="description">Population:</span> ${population}</p>
                <p><span class="description">Languages:</span> ${languagesList}</p>
    `;
};


function cleanPage() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
};