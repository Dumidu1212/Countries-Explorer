// src/api/countriesApi.js
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

/** GET /all */
export async function fetchAllCountries() {
    const { data } = await axios.get(`${BASE_URL}/all`);
    return data;
}

/** GET /name/{name} */
export async function fetchCountriesByName(name) {
    const { data } = await axios.get(`${BASE_URL}/name/${name}`);
    return data;
}

/** GET /region/{region} */
export async function fetchCountriesByRegion(region) {
    const { data } = await axios.get(`${BASE_URL}/region/${region}`);
    return data;
}

/** GET /lang/{language} */
export async function fetchCountriesByLanguage(lang) {
    const { data } = await axios.get(`${BASE_URL}/lang/${lang}`);
    return data;
}
